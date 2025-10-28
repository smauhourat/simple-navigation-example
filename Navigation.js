import React from 'react';
import HomeScreen from './screens/HomeScreen';
import SettingsScreen from './screens/SettingsScreen';
import OrdersScreen from './screens/OrdersScreen';
import NewOrderScreen from './screens/NewOrderScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

function Navigation() {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="Home" component={HomeScreen} options={{ 
                    title: 'RestoApp',
                    tabBarIcon: (props) => <Icon name="home-outline" {...props} /> }} />
                <Tab.Screen name="Orders" component={OrdersScreen} options={{ 
                    title: 'Pedidos',
                    tabBarIcon: (props) => <Icon name="book-outline" {...props} /> }} />                 
                <Tab.Screen name="NuevoPedido" component={NewOrderScreen} options={{ 
                    title: 'Nuevo Pedido',
                    tabBarIcon: (props) => <Icon name="book-plus-outline" {...props} /> }} />                         
                <Tab.Screen name="Settings" component={SettingsScreen} options={{ 
                    title: 'Settings',
                    tabBarBadge: 3,
                    headerShown: false,
                    tabBarIcon: (props) => <Icon name="brightness-5" {...props} /> }} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

const styles = {
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
};

export default Navigation;