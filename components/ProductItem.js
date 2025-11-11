import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

export default function ProductItem({ product, quantity = 0, onChange }) {
  return (
    <View style={styles.row}>
      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.price}>${product.price.toFixed(2)}</Text>
      </View>

      <View style={styles.controls}>
        <Pressable style={styles.btn} onPress={() => onChange(Math.max(0, quantity - 1))}>
          <Text style={styles.btnText}>-</Text>
        </Pressable>
        <Text style={styles.qty}>{quantity}</Text>
        <Pressable style={styles.btn} onPress={() => onChange(quantity + 1)}>
          <Text style={styles.btnText}>+</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', padding: 10, backgroundColor: '#fff', borderRadius: 6 },
  name: { fontWeight: '600' },
  price: { color: '#666' },
  controls: { flexDirection: 'row', alignItems: 'center' },
  btn: { width: 36, height: 36, borderRadius: 6, backgroundColor: '#1976d2', justifyContent: 'center', alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: '700' },
  qty: { marginHorizontal: 10, minWidth: 20, textAlign: 'center' },
});