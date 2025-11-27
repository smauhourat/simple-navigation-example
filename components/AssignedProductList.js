import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import ProductItem from './ProductItem';

export default function AssignedProductList({ products = [], selectedProducts = {}, onChangeQuantity, onRemoveProduct }) {
  const assignedItems = products.filter(p => selectedProducts[p.id]);

  if (assignedItems.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No hay productos asignados</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Productos Asignados</Text>
      <FlatList
        scrollEnabled={false}
        data={assignedItems}
        keyExtractor={p => p.id}
        renderItem={({ item }) => (
          <ProductItem
            product={item}
            quantity={selectedProducts[item.id] || 0}
            onChange={(qty) => onChangeQuantity(item.id, qty)}
            onRemove={onRemoveProduct}
            variant="assigned"
          />
        )}
      />
    </View>
  );
}
// color: '#1976d2' },
const styles = StyleSheet.create({
  container: { marginVertical: 12 },
  label: { 
    fontWeight: '600', 
    marginBottom: 10, 
    fontSize: 16,
    fontFamily: 'Nunito-Bold',
  }, 
  emptyContainer: { 
    marginVertical: 12, 
    padding: 12, 
    backgroundColor: '#f5f5f5', 
    borderRadius: 8, 
    alignItems: 'center',
    borderLeftWidth: 4,
    borderLeftColor: '#999',
  },
  emptyText: { color: '#666', fontStyle: 'italic' },
});