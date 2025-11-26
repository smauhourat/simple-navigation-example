import { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet, FlatList, Button, RefreshControl  } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import OrderCard from '../components/OrderCard';
import { getOrders } from '../lib/api';

const OrdersScreen = ({ navigation  }) => {
 const [orders, setOrders] = useState([]);
 const [refreshing, setRefreshing] = useState(false);

    const fetchOrders = async () => {
      const response = await getOrders();
      setOrders(response.data);
    }

  useFocusEffect(
    useCallback(() => {
      fetchOrders();
    }, [])
  );

  const onRefresh = useCallback(async () => {
    console.log('Refreshing orders...');
    setRefreshing(true);
    await fetchOrders();
    setRefreshing(false);
  }, []);  

  // useEffect(() => {
  //   async function fetchOrders() {
  //     const response = await getOrders();
  //     setOrders(response.data);
  //   }
  //   fetchOrders();
  // }, []);

  return (
    <View style={styles.container}>
      <FlatList
        style={{ width: '100%' }}
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <OrderCard key={item.id} order={item} 
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }        
        />}
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