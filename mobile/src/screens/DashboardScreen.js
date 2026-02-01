import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { styles } from '../styles/globalStyles';

export default function DashboardScreen({ navigation, onLogout }) {
  const Btn = ({ title, screen }) => (
    <TouchableOpacity
      style={{ padding: 20, backgroundColor: '#FFF', borderRadius: 16, marginBottom: 12 }}
      onPress={() => navigation.navigate(screen)}
    >
      <Text style={{ fontWeight: '700' }}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Panel użytkownika</Text>

      <Btn title="Zasil budżet" screen="WalletTopUp" />
      <Btn title="Dodaj wydatek" screen="Trade" />
      <Btn title="Budżet" screen="Portfolio" />
      <Btn title="Historia operacji" screen="History" />
      <Btn title="Dane NBP" screen="Rates" />
      <Btn title="Analiza trendów" screen="RatesHistory" />

      <TouchableOpacity onPress={onLogout}>
        <Text style={{ color: 'red', marginTop: 20 }}>Wyloguj</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
