import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView } from 'react-native';
import CustomAlert from '../components/ui/CustomAlert';
import ProviderPicker from '../components/ProviderPicker';
import ProductList from '../components/ProductList';
import AssignedProductList from '../components/AssignedProductList';
import OrderSummary from '../components/OrderSummary';
import CustomButton from '../components/ui/CustomButton';
import { getProviders, getProductsForProvider } from '../lib/api';
import DateTimePicker from '@react-native-community/datetimepicker';
import ProductSearch from '../components/ProductSearch';

export default function NewOrderScreen({ navigation }) {
  const [providers, setProviders] = useState([]);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState({}); // Productos asignados: {productId: quantity}
  const [tempQuantities, setTempQuantities] = useState({}); // Cantidades temporales en Disponibles: {productId: quantity}
  const [deliveryDate, setDeliveryDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAlert, setShowAlert] = useState({show: false, message: ''});

  const handleConfirm = () => {
    console.log('Confirmed!');
    setShowAlert({show: false, message: ''});
  };

  const handleCancel = () => {
    console.log('Cancelled!');
    setShowAlert({show: false, message: ''});
  };  

  useEffect(() => {
    async function fetchProviders() {
      const response = await getProviders();
      setProviders(response.data);
    }
    fetchProviders();
  }, []);

  useEffect(() => {
    
    // if (selectedProvider) {
    //   setProducts(getProductsForProvider(selectedProvider.id));
    //   setSelectedProducts({});
    //   setTempQuantities({}); // Limpiar cantidades temporales al cambiar proveedor
    // } else {
    //   setProducts([]);
    //   setSelectedProducts({});
    //   setTempQuantities({});
    // }

    async function fetchProducts(providerId) {
      setSelectedProducts({});
      setTempQuantities({});
      if (!providerId) {
        setProducts([]);
        return;
      }
      const response = await getProductsForProvider(providerId);
      //console.log('Products fetched for provider', providerId, ':', response);      
      setProducts(response);
    }

    fetchProducts(selectedProvider?.id);
    //console.log('Selected provider changed:', selectedProvider);
    //console.log('Products set:', products);

  }, [selectedProvider]);

  const filteredProducts = React.useMemo(() => {
    const term = (searchTerm || '').trim().toLowerCase();
    if (!term) return products;
    return products.filter(p => (p.nombre || '').toLowerCase().includes(term));
  }, [products, searchTerm]);

  // Cambiar cantidad TEMPORAL en Disponibles
  const onChangeQuantity = (productId, qty) => {
    setTempQuantities(prev => {
      const next = { ...prev };
      if (qty <= 0) delete next[productId];
      else next[productId] = qty;
      return next;
    });
  };

  // Asignar producto: mover de tempQuantities a selectedProducts
  const onAssignProduct = (productId) => {
    const tempQty = tempQuantities[productId];
    if (tempQty && tempQty > 0) {
      setSelectedProducts(prev => ({
        ...prev,
        [productId]: tempQty,
      }));
      // Limpiar cantidad temporal
      setTempQuantities(prev => {
        const next = { ...prev };
        delete next[productId];
        return next;
      });
    }
  };

  // Cambiar cantidad en Asignados
  const onChangeAssignedQuantity = (productId, qty) => {
    setSelectedProducts(prev => {
      const next = { ...prev };
      if (qty <= 0) delete next[productId];
      else next[productId] = qty;
      return next;
    });
    //console.log('Changed assigned quantity:', selectedProducts);
  };

  // Eliminar de Asignados
  const onRemoveProduct = (productId) => {
    setSelectedProducts(prev => {
      const next = { ...prev };
      delete next[productId];
      return next;
    });
  };

  const handleCreateOrder = () => {

    if (!selectedProvider) 
      return setShowAlert({show: true, title: 'Atencion!', showCancel: false, message: 'Debe seleccionar un proveedor'});

    if (Object.keys(selectedProducts).length === 0) 
      return setShowAlert({show: true, title: 'Atencion!', showCancel: false, message: 'No existen productos en la Orden'});

    const orderPayload = {
      proveedorId: selectedProvider.id,
      proveedorNombre: selectedProvider.name,
      fechaEntrega: deliveryDate.toISOString(),
      items: Object.entries(selectedProducts).map(([id, qty]) => {
        const prod = products.find(p => p.id === id);
        return { id, nombre: prod?.nombre || 'N/A', precio: prod?.precio_unitario || 0, cantidad: qty };
      }),
    };
    
    console.log('Order Payload:', orderPayload);
    
    Alert.alert('Orden creada', `Items: ${orderPayload.items.length}`, [
      { text: 'OK', onPress: () => navigation.navigate('Orders') },
    ]);

  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* <Text style={styles.h1}>Nuevo Pedido</Text> */}
        <CustomAlert
          visible={showAlert.show}
          title={showAlert?.title || 'Confirmar Acción'}
          message={showAlert.message}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
          showCancel={showAlert?.showCancel}
        />
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

      {/* buscador: aparece entre la fecha y el listado de productos */}
      {selectedProvider && <ProductSearch value={searchTerm} onChange={setSearchTerm} />}

      {selectedProvider ? (
        <>
          <ProductList
            products={filteredProducts}
            tempQuantities={tempQuantities}
            selectedProducts={selectedProducts}
            onChangeQuantity={onChangeQuantity}
            onAssignProduct={onAssignProduct}
          />

          <AssignedProductList
            products={products}
            selectedProducts={selectedProducts}
            onChangeQuantity={onChangeAssignedQuantity}
            onRemoveProduct={onRemoveProduct}
          />
        </>
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