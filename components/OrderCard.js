import React from "react";
import { View, Text, StyleSheet, Pressable, Button } from "react-native";
import { useNavigation } from '@react-navigation/native';

export default function OrderCard({ order }) {
  const navigation = useNavigation();

  const colorByStatus = (status) => {
    switch (status) {
      case 'pendiente':
        return '#f5db8eff'; // Yellow
      case 'enviado':
        return '#75abfcff'; // Blue
      case 'recibido':
        return '#8ab9a3ff'; // Green
      case 'cancelado':
        return '#e98993ff'; // Red
      default:
        return '#a8aaacff'; // Gray
    }}; 

    return (
        <Pressable 
            style={styles.card}
            onPress={() => navigation.navigate("OrderDetailsScreen", {orderId: order.id})}
            >
            <Text style={styles.title}>Order #{order.numero_pedido}</Text>
            <View style={styles.row}>
              <Text style={styles.detail}>Customer: {order.proveedor}</Text>
              <Text style={styles.detail}>Total: ${order.total.toFixed(2)}</Text>
            </View>            
            <Text style={[styles.status, { backgroundColor: colorByStatus(order.estado) }]}>{order.estado}</Text>
        </Pressable>
    );
}     

const styles = StyleSheet.create({
  card: {
    width: "95%",                     // ✅ ocupa el 95% del ancho del contenedor
    alignSelf: "center",              // ✅ centra horizontalmente
    backgroundColor: "#f8f8f8",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,    
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1, // Line below each row
    borderBottomColor: '#eee',
  },  
  status: {
    backgroundColor: "#d1e7dd",
    padding: 4,
  }
});    