import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import ProductItem from './ProductItem';

export default function ProductList({ products = [], selectedProducts = {}, onChangeQuantity }) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Productos</Text>
      <FlatList
        data={products}
        keyExtractor={p => p.id}
        renderItem={({ item }) => (
          <ProductItem
            product={item}
            quantity={selectedProducts[item.id] || 0}
            onChange={(qty) => onChangeQuantity(item.id, qty)}
          />
        )}
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginVertical: 8 },
  label: { fontWeight: '600', marginBottom: 8 },
});