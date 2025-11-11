import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView } from 'react-native';
import ProviderPicker from '../components/ProviderPicker';
import ProductList from '../components/ProductList';
import OrderSummary from '../components/OrderSummary';
import CustomButton from '../components/ui/CustomButton';
import { getProviders, getProductsForProvider } from '../lib/api';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function NewOrderScreen({ navigation }) {
  const [providers, setProviders] = useState([]);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState({}); // {productId: quantity}
  const [deliveryDate, setDeliveryDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    setProviders(getProviders());
  }, []);

  useEffect(() => {
    if (selectedProvider) {
      setProducts(getProductsForProvider(selectedProvider.id));
      setSelectedProducts({});
    } else {
      setProducts([]);
      setSelectedProducts({});
    }
  }, [selectedProvider]);

  const onChangeQuantity = (productId, qty) => {
    setSelectedProducts(prev => {
      const next = { ...prev };
      if (qty <= 0) delete next[productId];
      else next[productId] = qty;
      return next;
    });
  };

  const handleCreateOrder = () => {
    if (!selectedProvider) return Alert.alert('Selecciona un proveedor');
    if (Object.keys(selectedProducts).length === 0) return Alert.alert('Selecciona al menos un producto');
    // Build order payload
    const orderPayload = {
      proveedorId: selectedProvider.id,
      proveedorNombre: selectedProvider.name,
      fechaEntrega: deliveryDate.toISOString(),
      items: Object.entries(selectedProducts).map(([id, qty]) => {
        const prod = products.find(p => p.id === id);
        return { id, nombre: prod?.name || 'N/A', precio: prod?.price || 0, cantidad: qty };
      }),
    };
    // Aquí podrías llamar a tu API; por ahora simulamos éxito y navegamos a Orders
    Alert.alert('Orden creada', `Items: ${orderPayload.items.length}`, [
      { text: 'OK', onPress: () => navigation.navigate('Orders') },
    ]);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ProviderPicker
        providers={providers}
        selected={selectedProvider}
        onSelect={setSelectedProvider}
      />

      <View style={styles.section}>
        <Text style={styles.label}>Fecha de entrega</Text>
        <CustomButton
          title={deliveryDate.toLocaleDateString()}
          onPress={() => setShowDatePicker(true)}
          variant="secondary"
        />
        {showDatePicker && (
          <DateTimePicker
            value={deliveryDate}
            mode="date"
            display="default"
            onChange={(e, date) => {
              setShowDatePicker(false);
              if (date) setDeliveryDate(date);
            }}
          />
        )}
      </View>

      {selectedProvider ? (
        <ProductList
          products={products}
          selectedProducts={selectedProducts}
          onChangeQuantity={onChangeQuantity}
        />
      ) : (
        <Text style={styles.hint}>Selecciona un proveedor para ver sus productos</Text>
      )}

      <OrderSummary
        products={products}
        selectedProducts={selectedProducts}
      />

      <View style={styles.actions}>
        <CustomButton title="Crear Pedido" onPress={handleCreateOrder} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, paddingBottom: 40 },
  h1: { fontSize: 20, fontWeight: '700', marginBottom: 12 },
  section: { marginVertical: 12 },
  label: { fontWeight: '600', marginBottom: 8 },
  hint: { color: '#666', marginVertical: 12 },
  actions: { marginTop: 20 },
});