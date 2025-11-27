import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

export default function CustomButton({ title, onPress, variant = 'primary', style }) {
  const background = variant === 'secondary' ? '#b4b6b8ff' : '#1976d2';
  const textColor = variant === 'secondary' ? '#000000ff' : '#ffffff';
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.btn, { backgroundColor: background, opacity: pressed ? 0.85 : 1 }, style]}>
      <Text style={[styles.text, { color: textColor}]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: { paddingVertical: 10, paddingHorizontal: 12, borderRadius: 6, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5 },
  text: { fontWeight: '600', fontFamily: 'Nunito-Medium' },
});