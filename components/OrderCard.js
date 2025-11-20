import React from "react";
import { View, Text, StyleSheet, Pressable, Button } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { colorByStatus } from './utils/statusColors';

export default function OrderCard({ order }) {
  const navigation = useNavigation();

    return (
        <Pressable 
            style={styles.card}
            onPress={() => navigation.navigate("OrderDetailsScreen", {orderId: order.id})}
            >
            <Text style={styles.title}>#{order.numero_pedido}</Text>
            <View style={styles.row}>
              <Text style={styles.detail}>Fecha: {order.fecha}</Text>
              <Text style={styles.detail}>Total: ${order.total.toFixed(2)}</Text>
            </View>             
            <View style={styles.row}>
              <Text style={styles.detail}>Proveedor: {order.proveedor}</Text>
              <Text style={styles.detail}>Items: {order.cantidad_renglones}</Text>
            </View>            
            <Text style={[styles.status, { backgroundColor: colorByStatus(order.estado) }]}>{order.estado}</Text>
        </Pressable>
    );
}     

const styles = StyleSheet.create({
  card: {
    width: "95%",                     // ✅ ocupa el 95% del ancho del contenedor
    alignSelf: "center",              // ✅ centra horizontalmente
    backgroundColor: "#ffffff",
    // backgroundColor: "#f8f8f8",
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
    paddingVertical: 6,
    //borderBottomWidth: 1, // Line below each row
    borderBottomColor: '#eee',
  },  
  status: {
    backgroundColor: "#d1e7dd",
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
  }
});    