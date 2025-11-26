import React from 'react';
import { View, TextInput, Pressable, Text, StyleSheet } from 'react-native';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';

export default function ProductSearch({ value, onChange, placeholder = 'Buscar productos...' }) {
  return (
    <View style={styles.container}>
      <Icon name="magnify" size={20} color="#666" style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChange}
        returnKeyType="search"
        clearButtonMode="while-editing"
      />
      {value ? (
        <Pressable onPress={() => onChange('')} style={styles.clear}>
          <Icon name="close-circle" size={18} color="#666" />
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginVertical: 12,
    elevation: 1,
  },
  icon: { marginRight: 8 },
  input: { 
    flex: 1, 
    padding: 0, 
    color: '#111', 
    fontFamily: 'Nunito-Medium' 
  },
  clear: { marginLeft: 8 },
});