import React from 'react';
import HomeScreen from './screens/HomeScreen';
import SettingsScreen from './screens/SettingsScreen';
import OrdersScreen from './screens/OrdersScreen';
import NewOrderScreen from './screens/NewOrderScreen';
import OrderDetailsScreen from './screens/OrderDetailsScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { StackScreen } from 'react-native-screens';

const Tab = createBottomTabNavigator();

const OrderStackNavigation = createStackNavigator();


function StackOrders() {
    return (
        <OrderStackNavigation.Navigator
            initialRouteName="OrdersScreen"
        >
            <OrderStackNavigation.Screen
                name="OrdersScreen"
                component={OrdersScreen}
                options={{ title: 'Lista de Pedidos' }}
            />
            <OrderStackNavigation.Screen
                name="StackScreen"
                component={StackScreen}
                options={{ title: 'Stack' }}
            />
            <OrderStackNavigation.Screen
                name="OrderDetailsScreen"
                component={OrderDetailsScreen}
                options={{ title: 'Detalle Orden', tabBarStyle: { display: 'none' } }}
            />            
        </OrderStackNavigation.Navigator>
        
    );
};

function Navigation() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarStyle: ({ focused, state, navigation }) => {
                        // Verificar si estamos en OrderDetailsScreen
                        const routeName = state?.routes[state.index]?.state?.routes[state.index]?.name;
                        return {
                            display: routeName === 'OrderDetailsScreen' ? 'none' : 'flex',
                            // Estilos base del tabBar
                            backgroundColor: '#ffffff',
                            borderTopWidth: 1,
                            borderTopColor: '#e0e0e0',
                            paddingBottom: 5,
                            paddingTop: 5,
                        };
                    }
                })}
            >                
                <Tab.Screen name="Home" component={HomeScreen} options={{ 
                    title: 'RestoApp',
                    tabBarIcon: (props) => <Icon name="home-outline" {...props} /> }} />

                <Tab.Screen name="Orders" component={StackOrders} options={{ 
                    title: 'Pedidos',
                    headerShown: false,
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