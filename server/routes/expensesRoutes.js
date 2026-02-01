const express = require('express');
const db = require('../db');
const auth = require('../middleware/authMiddleware');

const router = express.Router();


router.post('/add', auth, (req, res) => {
  const userId = req.user.userId;
  const { category, amount } = req.body;

  const value = parseFloat(amount);
  if (!category || !value || value <= 0) {
    return res.status(400).json({ message: 'Błędne dane wydatku' });
  }

  db.serialize(() => {
    db.get(
      `SELECT * FROM WALLET_BALANCE
       WHERE user_id = ? AND currency_code = 'PLN'`,
      [userId],
      (err, row) => {
        if (!row || row.amount < value) {
          return res.status(400).json({ message: 'Brak środków w budżecie' });
        }

        db.run(
          `INSERT INTO EXPENSES (user_id, category, amount)
           VALUES (?, ?, ?)`,
          [userId, category, value]
        );

        db.run(
          `UPDATE WALLET_BALANCE
           SET amount = amount - ?
           WHERE balance_id = ?`,
          [value, row.balance_id]
        );

        res.json({ message: 'Wydatek zapisany poprawnie' });
      }
    );
  });
});

// 📜 Historia wydatków
router.get('/history', auth, (req, res) => {
  const userId = req.user.userId;

  db.all(
    `SELECT * FROM EXPENSES
     WHERE user_id = ?
     ORDER BY created_at DESC`,
    [userId],
    (err, rows) => {
      if (err) return res.status(500).json({ message: 'Błąd bazy danych' });
      res.json(rows);
    }
  );
});

router.get('/analysis', auth, (req, res) => {
  const userId = req.user.userId;

  db.serialize(() => {
    db.all(
      `SELECT category, SUM(amount) as total
       FROM EXPENSES
       WHERE user_id = ?
       GROUP BY category`,
      [userId],
      (err, byCategory) => {
        if (err) return res.status(500).json({ message: 'DB error' });

        db.get(
          `SELECT SUM(amount) as sum, MAX(amount) as max
           FROM EXPENSES
           WHERE user_id = ?`,
          [userId],
          (err, summary) => {
            if (err) return res.status(500).json({ message: 'DB error' });

            db.get(
              `SELECT amount FROM WALLET_BALANCE
               WHERE user_id = ? AND currency_code = 'PLN'`,
              [userId],
              (err, wallet) => {
                const spent = summary.sum || 0;
                const budget = wallet?.amount || 0;

                res.json({
                  totalSpent: spent,
                  maxExpense: summary.max || 0,
                  byCategory,
                  percentUsed: budget > 0 ? (spent / (spent + budget)) * 100 : 100
                });
              }
            );
          }
        );
      }
    );
  });
});

module.exports = router;
