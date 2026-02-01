import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import api from '../api/apiClient';
import { styles } from '../styles/globalStyles';

export default function HistoryScreen() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    try {
      setLoading(true);
      const res = await api.get('/expenses/history');
      setItems(res.data || []);
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Historia transakcji</Text>

      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={items}
          keyExtractor={(i) => i.expense_id.toString()}
          renderItem={({ item }) => (
            <View style={styles.cardRow}>
              <Text style={{ fontWeight: '700' }}>{item.category}</Text>
              <Text style={{ fontWeight: '800' }}>
                -{item.amount.toFixed(2)} PLN
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
}
