import { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Button } from 'react-native';
import OrderCard from '../components/OrderCard';
import { getOrders } from '../lib/api';

const OrdersScreen = ({ navigation  }) => {
 const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function fetchOrders() {
      const response = await getOrders();
      setOrders(response.data);
    }
    fetchOrders();
  });

  return (
    <View style={styles.container}>
      <FlatList
        style={{ width: '100%' }}
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <OrderCard key={item.id} order={item} />}
      />
      {/* <Button title="Stack" onPress={() => navigation.navigate("StackScreen")} /> */}
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
        fontFamily: 'Nunito-Medium',
    },
});

export default OrdersScreen;