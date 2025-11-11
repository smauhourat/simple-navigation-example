import { useEffect, useState, useLayoutEffect  } from 'react';
import { View, StyleSheet } from 'react-native';
import OrderDetails from '../components/OrderDetails';
import { getOrderById } from '../lib/api';

const OrderDetailsScreen = ({ route, navigation }) => {
    const { orderId } = route.params;
    const [ order, setOrder ] = useState([]);

    useEffect(() => {
      async function fetchOrderById(id) {
        const response = await getOrderById(orderId);
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
        justifyContent: 'start',
        paddingTop: 10,
        alignItems: 'center',
        backgroundColor: '#eee',
    },
    text: {
        fontSize: 14,
        fontWeight: 'bold',
    },
});

export default OrderDetailsScreen;