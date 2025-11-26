import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Alert } from 'react-native';
import CustomAlert from '../components/ui/CustomAlert';
import CustomButton from '../components/ui/CustomButton';
import { createOrder } from '../lib/api';

export default function OrderReviewScreen({ route, navigation }) {
  const { orderPayload } = route.params;
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState({show: false, message: ''});

  const totalAmount = orderPayload.items.reduce((s, it) => s + (it.precio || 0) * it.cantidad, 0);
  const totalItems = orderPayload.items.reduce((s, it) => s + it.cantidad, 0);

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await createOrder(orderPayload);
      gotToOrders();
    //   setShowAlert({show: true, title: 'Atencion!', showCancel: false, message: 'Orden creada correctamente'});

      setLoading(false);
    } catch (err) {
    //   setLoading(false);
    //   setShowAlert({show: true, title: 'Atencion!', showCancel: false, message: 'No se pudo crear la orden'});
    }
  };

  const gotToOrders = () => {
    console.log('Navigating to Orders screen');
    // setShowAlert({show: false, message: ''});
    navigation.navigate('Orders');
  }

  return (
    <View style={styles.container}>
        <CustomAlert
          visible={showAlert.show}
          title={showAlert?.title || 'Aviso'}
          message={showAlert.message}
          onConfirm={gotToOrders}
          onCancel={null}
          showCancel={false}
        />        
      <View style={styles.headerSummary}>
        <Text style={[styles.text, { marginBottom: 8}]}>Proveedor: {orderPayload.proveedorNombre}</Text>
        <Text style={styles.text}>Fecha de entrega: {new Date(orderPayload.fechaEntrega).toLocaleDateString()}</Text>
      </View>
      <View style={styles.section}>
      </View>

      <View style={styles.section}>
        <FlatList
          data={orderPayload.items}
          keyExtractor={i => i.id}
          renderItem={({ item }) => (
            <View style={styles.itemRow}>
                <View>
                    <Text style={styles.itemName}>{item.nombre}</Text>
                    <Text style={styles.itemQty}>{item.cantidad} × ${item.precio.toFixed(2)}</Text>                    
                </View>
              <Text style={styles.text}>${item.cantidad * item.precio.toFixed(2)}</Text>
            </View>
          )}
        />
      </View>
    <View style={styles.footerSummary}>
        <Text style={styles.text}>Items: {totalItems}</Text>
        <Text style={styles.text}>Total: ${totalAmount.toFixed(2)}</Text>
    </View>      


      <View style={styles.actions}>
        <CustomButton title="CONFIRMAR PEDIDO" onPress={handleConfirm} style={{ marginBottom: 8 }} />
        <CustomButton title="VOLVER Y MODIFICAR" variant="secondary" onPress={() => navigation.goBack()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  footerSummary: { marginTop: 12, padding: 12, backgroundColor: '#f8f8f8', borderRadius: 6, flexDirection: 'row', justifyContent: 'space-between' },
  headerSummary: { marginTop: 12, marginBottom: 12, padding: 12, backgroundColor: '#f8f8f8', borderRadius: 6 },
  text: { fontWeight: '600', fontFamily: 'Nunito-Bold' },
  section: { marginBottom: 12 },
  itemRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, paddingHorizontal: 4, borderBottomWidth: 1, borderBottomColor: '#eee' },
  itemName: { fontWeight: '600', fontFamily: 'Nunito-Bold' },
  itemQty: { color: '#444', fontSize: 12, fontFamily: 'Nunito-Medium' },
  summary: { marginTop: 12, padding: 12, backgroundColor: '#f8f8f8', borderRadius: 6 },
  summaryText: { fontWeight: '700', fontSize: 16, fontFamily: 'Nunito-Bold' },
  actions: { marginTop: 20 },
});