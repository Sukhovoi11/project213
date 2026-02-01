import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, Alert,
  TouchableWithoutFeedback, Keyboard,
  ScrollView, Platform
} from 'react-native';
import api from '../api/apiClient';
import { styles } from '../styles/globalStyles';
import AppButton from '../components/AppButton';

export default function WalletTopUpScreen() {
  const [amount, setAmount] = useState('');
  const [balance, setBalance] = useState(0);

  const loadBalance = async () => {
    try {
      const res = await api.get('/wallet/portfolio');
      const pln = res.data.find(i => i.currency_code === 'PLN');
      setBalance(pln?.amount ?? 0);
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    loadBalance();
  }, []);

  const notify = (msg) =>
    Platform.OS === 'web'
      ? window.alert(msg)
      : Alert.alert('Informacja', msg);

  const handleAddIncome = async () => {
    const value = parseFloat(amount);
    if (!value || value <= 0) {
      return notify('Podaj poprawną kwotę');
    }

    try {
      await api.post('/wallet/topup', { amount: value });
      notify('Przychód został dodany');
      setAmount('');
      loadBalance();
    } catch {
      notify('Błąd zapisu przychodu');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Dodaj przychód</Text>

        <View style={{ marginBottom: 20 }}>
          <Text style={{ color: '#64748B' }}>Aktualny budżet:</Text>
          <Text style={{ fontSize: 28, fontWeight: '900' }}>
            {balance.toFixed(2)} PLN
          </Text>
        </View>

        <Text style={styles.label}>Kwota przychodu (PLN)</Text>
        <TextInput
          style={styles.input}
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
          placeholder="0.00"
        />

        <AppButton
          title="Dodaj przychód"
          onPress={handleAddIncome}
        />
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}
