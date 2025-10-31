import React from "react";
import { View, Text, StyleSheet, FlatList, Button, TouchableOpacity } from "react-native";
import OrderItem from "./OrderItem";
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import IconButton from './ui/IconButton';

export default function OrderDetails({ order }) {
    return (
        <View style={styles.container}>
            <View style={styles.cardHeader}>
                <View style={styles.row}>
                    <Text style={styles.textHeader}>Pedido #{order.numero_pedido}</Text>
                </View>
            </View>
            <View style={styles.cardActions}>
                <View style={styles.rowActions}>
                    <IconButton title="Email" iconName="email" backgroundColor='#9c27b0' onPress={() => alert('send by email')} />
                    <IconButton title="WhatsApp" iconName="whatsapp" backgroundColor='#128c7e' onPress={() => alert('send by whatsapp')} />
                    <IconButton title="QrCode" iconName="qrcode" backgroundColor='#0288d1' onPress={() => alert('generate qr')} />
                </View>
            </View>
            <View style={styles.cardContent}>
                <View style={[styles.row, { justifyContent: 'space-between' }]}>
                    <Text>Fecha: {order.fecha}</Text>
                    <Text style={styles.textH1}>Total: ${order.total?.toFixed(2)}</Text>
                </View>
                <View style={[styles.row, { justifyContent: 'space-between' }]}>    
                    <Text>Proveedor: {order.proveedor_nombre}</Text>
                    <Text style={styles.textH1}>Items: {order.renglones?.length}</Text>
                </View>
                <Text style={{ paddingTop: 15, fontWeight: '600', fontSize: 16 }}>Detalle del Pedido</Text>
                <FlatList
                    style={{ width: '100%', marginTop: 10 }}
                    data={order.renglones}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => 
                    <OrderItem key={item.id} style={{ padding:10 }} item={item} />
                }
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
        padding: 10,
        borderRadius: 4,
        marginBottom: 10,
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,    
    },    
    cardActions: {
        paddingBottom: 10,
    },
    cardContent: {
        flex: 1,
        width: "95%",    
        padding: 12,
        borderRadius: 4,     
        backgroundColor: "#fff",   //9aa6b3ff
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    rowActions: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
        marginRight: 10,
    },
    textHeader: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#f8f8f8',
    },
    textH1: {
        fontSize: 16,
        fontWeight: "600",
    },
});