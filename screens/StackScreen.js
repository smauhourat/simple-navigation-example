import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const StackScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Welcome to Stack Screen</Text>
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

export default StackScreen;