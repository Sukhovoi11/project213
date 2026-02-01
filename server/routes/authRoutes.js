const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db');
require('dotenv').config();

const router = express.Router();
const jwtSecret = process.env.JWT_SECRET || 'dev-secret-change-me';


router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: 'Email i hasło są wymagane' });

  const hash = await bcrypt.hash(password, 10);

  const sql = 'INSERT INTO USERS (email, password_hash) VALUES (?, ?)';
  db.run(sql, [email, hash], function (err) {
    if (err) {
      return res.status(400).json({ message: 'Użytkownik o podanym adresie email już istnieje' });
    }
    return res.status(201).json({ userId: this.lastID });
  });
});


router.post('/login', (req, res) => {
  const { email, password } = req.body;

  db.get('SELECT * FROM USERS WHERE email = ?', [email], async (err, user) => {
    if (err || !user) return res.status(400).json({ message: 'Nieprawidłowy email lub hasło' });

    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) return res.status(400).json({ message: 'Nieprawidłowy email lub hasło' });

    if (!process.env.JWT_SECRET) {
      console.warn('JWT_SECRET is not set. Using development fallback secret.');
    }

    const token = jwt.sign(
        { userId: user.user_id, email: user.email },
        jwtSecret,
        { expiresIn: '1d' }
    );

    res.json({ token });
  });
});


router.post('/logout', (req, res) => {
  res.json({ message: 'Wylogowano pomyślnie' });
});

module.exports = router;
