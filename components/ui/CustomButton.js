import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

export default function CustomButton({ title, onPress, variant = 'primary', style }) {
  const background = variant === 'secondary' ? '#6c757d' : '#1976d2';
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.btn, { backgroundColor: background, opacity: pressed ? 0.85 : 1 }, style]}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: { paddingVertical: 10, paddingHorizontal: 12, borderRadius: 6, alignItems: 'center' },
  text: { color: '#fff', fontWeight: '600' },
});