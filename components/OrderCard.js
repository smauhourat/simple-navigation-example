import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function OrderCard({ order }) {
    return (
        <View style={styles.card}>
            <Text style={styles.title}>Order #{order.numero_pedido}</Text>
            <Text style={styles.detail}>Customer: {order.proveedor}</Text>
            <Text style={styles.detail}>Total: ${order.total}</Text>
        </View>
    );
}     

// const styles = StyleSheet.create({
//     card: {
//         backgroundColor: "#fff",    
//         padding: 15,
//         marginVertical: 8,
//         marginHorizontal: 16,}}
//     )

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#f8f8f8",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
  },
});    