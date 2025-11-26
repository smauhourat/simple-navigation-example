import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';

export default function ProductItem({ product, quantity = 0, onChange, onAssign, onRemove, variant = 'available' }) {
  const isAssigned = variant === 'assigned';

  return (
    <View style={[styles.row, isAssigned && styles.rowAssigned]}>
      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{product.nombre}</Text>
        <Text style={styles.price}>${product.precio_unitario.toFixed(2)}</Text>
      </View>

      <View style={styles.controls}>
        <Pressable 
          style={styles.btn} 
          onPress={() => onChange(Math.max(0, quantity - 1))}
        >
          <Icon name="chevron-down" size={18} color="#fff" />
        </Pressable>
        <Text style={styles.qty}>{quantity}</Text>
        <Pressable 
          style={styles.btn} 
          onPress={() => onChange(quantity + 1)}
        >
          <Icon name="chevron-up" size={18} color="#fff" />
        </Pressable>
      </View>

      {!isAssigned && (
        <Pressable
          style={[styles.assignBtn, quantity === 0 && styles.assignBtnDisabled]}
          onPress={() => onAssign?.(product.id)}
          disabled={quantity === 0}
        >
          <Icon name="plus-box" size={30} color="#28a745" />
        </Pressable>
      )}

      {isAssigned && (
        <Pressable
          style={styles.deleteBtn}
          onPress={() => onRemove?.(product.id)}
        >
          <Icon name="minus-box" size={30} color="#dc3545" />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    padding: 12, 
    backgroundColor: '#fff', 
    borderRadius: 8, 
    marginBottom: 8,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  rowAssigned: {
    backgroundColor: '#EAF6ED'
  },
  name: { 
    fontWeight: '600', 
    fontSize: 14,
    fontFamily: 'Nunito-Bold',
  },
  price: { 
    color: '#666', 
    fontSize: 12, 
    marginTop: 4,
    fontFamily: 'Nunito-Medium',
  },
  controls: { 
    flexDirection: 'row', 
    alignItems: 'center',
    marginLeft: 12,
  },
  btn: { 
    width: 25, 
    height: 25, 
    borderRadius: 25,
    backgroundColor: '#1976d2', 
    justifyContent: 'center', 
    alignItems: 'center',
  },
  btnPlus: {
    backgroundColor: '#28a745',
  },
  qty: { 
    marginHorizontal: 10, 
    minWidth: 24, 
    textAlign: 'center', 
    fontWeight: '700',
    fontSize: 14,
  },

  assignBtnDisabled: {
    color: '#ccc',
    opacity: 0.4,
  },
  deleteBtn: { 
    marginLeft: 12,
    padding: 8,
  },
  assignBtn: {
    marginLeft: 12,
    padding: 8,
  }
});