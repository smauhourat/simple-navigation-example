import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function OrderSummary({ products = [], selectedProducts = {} }) {
  const { totalItems, totalAmount } = useMemo(() => {
    let items = 0;
    let amount = 0;
    for (const [id, qty] of Object.entries(selectedProducts)) {
      const p = products.find(x => x.id == id);
      if (p) {
        items += qty;
        amount += p.precio_unitario * qty;
      }
    }
    return { totalItems: items, totalAmount: amount };
  }, [products, selectedProducts]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Items: {totalItems}</Text>
      <Text style={styles.text}>Total: ${totalAmount.toFixed(2)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginTop: 12, padding: 12, backgroundColor: '#fff', borderRadius: 6, flexDirection: 'row', justifyContent: 'space-between' },
  text: { fontWeight: '600', fontFamily: 'Nunito-Bold' },
});