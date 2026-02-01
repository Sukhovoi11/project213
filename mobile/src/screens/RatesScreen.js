import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import api from '../api/apiClient';
import { styles } from '../styles/globalStyles';

export default function RatesScreen() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await api.get('/expenses/analysis');
        setCategories(res.data.byCategory || []);
      } catch (err) {
        console.log(err?.message || err);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kategorie wydatków</Text>
      <Text style={{ color: '#64748B', marginBottom: 14 }}>
        Podsumowanie według kategorii
      </Text>

      {loading ? (
        <ActivityIndicator size="large" />
      ) : categories.length ? (
        <FlatList
          data={categories}
          keyExtractor={(item) => item.category}
          renderItem={({ item }) => (
            <View style={styles.cardRow}>
              <Text style={{ fontWeight: '800' }}>{item.category}</Text>
              <Text style={{ fontWeight: '700' }}>
                {item.total.toFixed(2)} PLN
              </Text>
            </View>
          )}
        />
      ) : (
        <Text style={{ color: '#64748B' }}>
          Brak danych. Dodaj pierwsze wydatki, aby zobaczyć kategorie.
        </Text>
      )}
    </View>
  );
}
