import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import api from '../api/apiClient';
import { styles } from '../styles/globalStyles';

export default function PortfolioScreen() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadData = async () => {
    try {
      setLoading(true);
      const res = await api.get('/wallet/portfolio');
      setItems(res.data || []);
    } catch {}
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Podsumowanie finansowe</Text>
      <Text style={{ color: '#64748B', marginBottom: 14 }}>
        Aktualny stan budżetu
      </Text>

      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={items}
          keyExtractor={(item, i) => i.toString()}
          renderItem={({ item }) => (
            <View style={styles.cardRow}>
              <Text style={{ fontWeight: '800' }}>
                {item.currency_code === 'PLN'
                  ? 'Budżet główny'
                  : `Kategoria: ${item.currency_code}`}
              </Text>

              <Text style={{ fontWeight: '700' }}>
                {item.amount.toFixed(2)} PLN
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
}
