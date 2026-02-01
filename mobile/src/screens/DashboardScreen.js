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

      <Btn title="Dodaj przychód" screen="WalletTopUp" />
      <Btn title="Transakcje" screen="Trade" />
      <Btn title="Budżet i saldo" screen="Portfolio" />
      <Btn title="Historia transakcji" screen="History" />
      <Btn title="Kategorie" screen="Rates" />
      <Btn title="Statystyki" screen="BudgetAnalysis" />

      <TouchableOpacity onPress={onLogout}>
        <Text style={{ color: 'red', marginTop: 20 }}>Wyloguj</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
