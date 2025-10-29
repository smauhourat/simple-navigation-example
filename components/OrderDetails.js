import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

export default function OrderDetails({ order }) {
    return (
        <View style={styles.container}>
            <View style={styles.cardHeader}>
                <View style={styles.row}>
                    <Text style={styles.textHeader}>Pedido #{order.numero_pedido}</Text>
                </View>
            </View>
            <View style={styles.cardContent}>
                <View style={[styles.row, { justifyContent: 'space-between' }]}>
                    <Text>Fecha: {order.fecha}</Text>
                    <Text style={styles.textH1}>Total: ${order.total}</Text>
                </View>
                <Text>Proveedor: {order.proveedor_nombre}</Text>
                <Text style={{ paddingTop: 10, fontWeight: '500' }}>Detalle del Pedido</Text>
                <FlatList
                    style={{ width: '100%' }}
                    data={order.renglones}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <Text style={{ paddingTop: 0 }}>{item.producto_nombre}</Text>}
                />                
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'start',
        alignItems: 'center',
        width: '100%',
    },
    cardHeader: {
        width: "95%",                     // ✅ ocupa el 95% del ancho del contenedor
        alignSelf: "center",              // ✅ centra horizontalmente
        backgroundColor: "#1976d2",
        padding: 12,
        borderRadius: 4,
        marginBottom: 10,
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,    
    },    
    cardContent: {
        flex: 1,
        width: "95%",    
        padding: 12,
        borderRadius: 4,     
        backgroundColor: "#fff",   //9aa6b3ff
    },
    row: {
        // flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',

        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    textHeader: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#f8f8f8',
    },
    textH1: {
        fontSize: 18,
        fontWeight: "450",
    },
});