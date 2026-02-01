import React, { useState } from 'react';
import {
  View, Text, TextInput, Alert, TouchableOpacity, StyleSheet
} from 'react-native';
import api from '../api/apiClient';
import { styles } from '../styles/globalStyles';
import AppButton from '../components/AppButton';

const CATEGORIES = ['Jedzenie', 'Transport', 'Mieszkanie', 'Rozrywka', 'Inne'];

export default function AddExpenseScreen() {
  const [category, setCategory] = useState('Jedzenie');
  const [amount, setAmount] = useState('');

  const handleAdd = async () => {
    const value = parseFloat(amount);

    if (!value || value <= 0) {
      return Alert.alert('Błąd', 'Podaj poprawną kwotę');
    }

    try {
      await api.post('/expenses/add', {
        category,
        amount: value,
      });

      Alert.alert('Sukces', 'Wydatek dodany');
      setAmount('');
    } catch (err) {
      console.log(err?.response?.data || err.message);
      Alert.alert('Błąd', 'Nie udało się dodać wydatku');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dodaj wydatek</Text>

      <Text style={styles.label}>Kategoria</Text>
      <View style={local.categoryRow}>
        {CATEGORIES.map((cat) => (
          <TouchableOpacity
            key={cat}
            onPress={() => setCategory(cat)}
            style={[
              local.chip,
              category === cat && local.chipActive
            ]}
          >
            <Text style={[
              local.chipText,
              category === cat && { color: '#FFF' }
            ]}>
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Kwota (PLN)</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
        placeholder="0.00"
      />

      <AppButton title="Dodaj wydatek" onPress={handleAdd} />
    </View>
  );
}

const local = StyleSheet.create({
  categoryRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  chip: {
    padding: 10,
    borderRadius: 12,
    backgroundColor: '#E5E7EB',
    marginRight: 8,
    marginBottom: 8,
  },
  chipActive: {
    backgroundColor: '#004D40',
  },
  chipText: {
    fontWeight: '700',
    color: '#1F2937',
  },
});
