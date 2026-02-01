import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Platform } from 'react-native';

export default function AppButton({ title, onPress, variant = 'primary', style }) {
  const isSecondary = variant === 'secondary';

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[
        styles.button,
        isSecondary ? styles.secondaryButton : styles.primaryButton,
        style,
        Platform.OS === 'web' && { cursor: 'pointer' }
      ]}
    >
      <Text style={[
        styles.text,
        isSecondary ? styles.secondaryText : styles.primaryText
      ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginVertical: 10,
  },
  primaryButton: {
    backgroundColor: '#004D40',
  },
  secondaryButton: {
    borderWidth: 2,
    borderColor: '#004D40',
  },
  text: {
    fontSize: 16,
    fontWeight: '700',
  },
  primaryText: {
    color: '#FFF',
  },
  secondaryText: {
    color: '#004D40',
  },
});
