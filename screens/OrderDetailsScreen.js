import { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import OrderDetails from '../components/OrderDetails';
import { getOrderById } from '../lib/api';

const OrderDetailsScreen = ({ route }) => {
    const { orderId } = route.params;
    const [ order, setOrder ] = useState([]);
    console.log("OrderDetailsScreen orderId:", orderId);

    useEffect(() => {
      async function fetchOrderById(id) {
        const response = await getOrderById(9);
        console.log("OrderDetailsScreen response:", response);
        setOrder(response);
      }
      fetchOrderById(orderId);
    }, []);

    return (
        <View style={styles.container}>
            <OrderDetails order={order} />
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