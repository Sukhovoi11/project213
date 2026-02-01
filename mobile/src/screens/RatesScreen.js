import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import api from '../api/apiClient';
import { styles } from '../styles/globalStyles';
import RateItem from '../components/RateItem';

export default function RatesScreen() {
  const [rates, setRates] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await api.get('/rates/current');
      setRates(res.data.rates || []);
      setLoading(false);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dane referencyjne (NBP)</Text>

      {loading ? <ActivityIndicator /> : (
        <FlatList
          data={rates}
          keyExtractor={(i) => i.code}
          renderItem={({ item }) => (
            <RateItem
              code={item.code}
              mid={item.mid}
              currencyName={item.currency}
            />
          )}
        />
      )}
    </View>
  );
}
