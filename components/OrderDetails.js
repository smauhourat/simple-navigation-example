import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

export default function OrderDetails({ order }) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Order Details orderId: {order.id}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#eee',
        width: '100%',
    },
    text: {
        fontSize: 14,
        fontWeight: 'bold',
    },
});