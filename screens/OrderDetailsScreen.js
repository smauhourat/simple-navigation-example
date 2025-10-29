import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import OrderDetails from '../components/OrderDetails';

const OrderDetailsScreen = ({ route }) => {
    const { orderId } = route.params;

    return (
        <View style={styles.container}>
            <OrderDetails orderId={orderId} />
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