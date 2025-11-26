import React from 'react';
import HomeScreen from './screens/HomeScreen';
import SettingsScreen from './screens/SettingsScreen';
import OrdersScreen from './screens/OrdersScreen';
import NewOrderScreen from './screens/NewOrderScreen';
import OrderDetailsScreen from './screens/OrderDetailsScreen';
import OrderReviewScreen from './screens/OrderReviewScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();
const OrderStackNavigation = createStackNavigator();
const NewOrderStackNavigation = createStackNavigator();

function StackOrders() {
    return (
        <OrderStackNavigation.Navigator
            initialRouteName="OrdersScreenX"
        >
            <OrderStackNavigation.Screen
                name="OrdersScreenX"
                component={OrdersScreen}
                options={{ 
                    title: 'Lista de Pedidos',
                    headerTitleStyle: { fontFamily: 'Nunito-Bold' },
                 }}
            />
            <OrderStackNavigation.Screen
                name="OrderDetailsScreen"
                component={OrderDetailsScreen}
                options={{ 
                    title: 'Detalle Pedido',
                    headerTitleStyle: { fontFamily: 'Nunito-Bold' }, 
            }}
            />
        </OrderStackNavigation.Navigator>
    );
}

function StackNewOrder() {
    return (
        <NewOrderStackNavigation.Navigator
            initialRouteName="NewOrderScreenX"
        >
            <NewOrderStackNavigation.Screen
                name="NewOrderScreenX"
                component={NewOrderScreen}
                options={{ 
                    title: 'Nuevo Pedido',
                headerTitleStyle: { fontFamily: 'Nunito-Bold' },
             }}
            />
            <NewOrderStackNavigation.Screen
                name="OrderReview"
                component={OrderReviewScreen}
                options={{ 
                    title: 'Resumen de Orden',
                headerTitleStyle: { fontFamily: 'Nunito-Bold' }, }}
            />
        </NewOrderStackNavigation.Navigator>
    );
}

function Navigation() {
    return (
        <NavigationContainer>
            <Tab.Navigator>                
                <Tab.Screen 
                    name="Home" 
                    component={HomeScreen} 
                    options={{ 
                        title: 'RestoApp',
                        headerShown: false,
                        tabBarIcon: (props) => <Icon name="home-outline" {...props} /> 
                    }} 
                />

                <Tab.Screen 
                    name="Orders" 
                    component={StackOrders} 
                    options={{ 
                        title: 'Pedidos',
                        headerShown: false,
                        headerTitleStyle: { fontFamily: 'Nunito-Bold' },
                        tabBarIcon: (props) => <Icon name="book-outline" {...props} /> 
                    }} 
                    listeners={({ navigation }) => ({
                        tabPress: e => {
                            navigation.navigate('Orders', { screen: 'OrdersScreenX' });
                        },    
                    })}                    
                />

                <Tab.Screen 
                    name="NuevoPedido" 
                    component={StackNewOrder}
                    options={{ 
                        title: 'Nuevo Pedido',
                        headerShown: false,
                        headerTitleStyle: { fontFamily: 'Nunito-Bold' },
                        tabBarIcon: (props) => <Icon name="book-plus-outline" {...props} /> 
                    }} 
                />

                <Tab.Screen 
                    name="Settings" 
                    component={SettingsScreen} 
                    options={{ 
                        title: 'Settings',
                        tabBarBadge: 3,
                        headerShown: false,
                        tabBarIcon: (props) => <Icon name="brightness-5" {...props} /> 
                    }} 
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

export default Navigation;