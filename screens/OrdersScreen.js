import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Button } from 'react-native';
import OrderCard from '../components/OrderCard';
import { geOrders } from '../lib/api';
import { useNavigation } from '@react-navigation/native';

const OrdersScreen = ({ navigation  }) => {
 const [orders, setOrders] = useState([]);
 const navigate = useNavigation();

  useEffect(() => {
    async function fetchOrders() {
      const response = await geOrders();
      setOrders(response.data);
    }
    fetchOrders();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        style={{ width: '100%' }}
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <OrderCard key={item.id} order={item} />}
      />
      <Button title="Stack" onPress={() => navigation.navigate("Stack")} />
    </View>
  );    
};

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

export default OrdersScreen;