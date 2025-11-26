import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const NewOrder = () => (
    <View style={styles.container}>
        <Text style={styles.text}>New Order Component</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#eee',
    },
    text: {
        fontSize: 14,
        fontFamily: 'Nunito-Medium',
    },
});

export default NewOrder;