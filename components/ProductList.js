import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import ProductItem from './ProductItem';

export default function ProductList({ products = [], tempQuantities = {}, selectedProducts = {}, onChangeQuantity, onAssignProduct }) {
  // Filtrar solo productos que NO están asignados
  const availableProducts = products.filter(p => !selectedProducts[p.id]);

  if (availableProducts.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Todos los productos han sido asignados</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Productos Disponibles</Text>
      <FlatList
        scrollEnabled={false}
        data={availableProducts}
        keyExtractor={p => p.id}
        renderItem={({ item }) => (
          <ProductItem
            product={item}
            quantity={tempQuantities[item.id] || 0}
            onChange={(qty) => onChangeQuantity(item.id, qty)}
            onAssign={onAssignProduct}
            variant="available"
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginVertical: 12 },
  label: { fontWeight: '600', marginBottom: 10, fontSize: 14, color: '#111' },
  emptyContainer: { 
    marginVertical: 12, 
    padding: 12, 
    backgroundColor: '#e8f5e9', 
    borderRadius: 8, 
    alignItems: 'center',
    borderLeftWidth: 4,
    borderLeftColor: '#28a745',
  },
  emptyText: { color: '#2e7d32', fontStyle: 'italic' },
});