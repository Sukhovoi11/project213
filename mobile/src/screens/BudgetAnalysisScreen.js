import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import api from '../api/apiClient';
import { styles } from '../styles/globalStyles';

export default function BudgetAnalysisScreen() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/expenses/analysis')
      .then((res) => setData(res.data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <ActivityIndicator style={{ marginTop: 40 }} />;
  }

  if (!data) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Statystyki budżetu</Text>
        <Text style={{ color: '#64748B' }}>
          Brak danych do analizy. Dodaj pierwsze wydatki, aby zobaczyć statystyki.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Statystyki budżetu</Text>

      <Text>💸 Suma wydatków: {data.totalSpent.toFixed(2)} PLN</Text>
      <Text>🔥 Największy wydatek: {data.maxExpense.toFixed(2)} PLN</Text>
      <Text>📊 Wykorzystany budżet: {data.percentUsed.toFixed(1)}%</Text>

      <Text style={[styles.label, { marginTop: 20 }]}>
        Wydatki wg kategorii
      </Text>

      {data.byCategory.length ? (
        data.byCategory.map((c) => (
          <Text key={c.category}>
            {c.category}: {c.total.toFixed(2)} PLN
          </Text>
        ))
      ) : (
        <Text style={{ color: '#64748B' }}>
          Brak danych o kategoriach.
        </Text>
      )}
    </View>
  );
}
