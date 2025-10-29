import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import OrderDetails from '../components/OrderDetails';

const OrderDetailsScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Welcome to Order Details Screen</Text>
            <OrderDetails />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    text: {
        fontSize: 14,
        fontWeight: 'bold',
    },
});

export default OrderDetailsScreen;