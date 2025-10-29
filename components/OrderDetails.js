import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

export default function OrderDetails({ orderId }) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Order Details orderId: {orderId}</Text>
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