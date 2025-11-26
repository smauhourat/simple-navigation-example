import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FlashMessage, { showMessage } from 'react-native-flash-message';
import { Button } from 'react-native-web';

const SettingsScreen = () => {
    return (
        <View style={styles.container}>
            <FlashMessage position="top" />
            <Text style={styles.text}>Welcome to Settings Screen</Text>
            <Button onPress={() => {
                showMessage({
                    message: "Settings saved successfully",
                    description: "Your preferences have been updated.",
                    animationDuration:450,
                    duration:500,
                    type: "success",
                });
            }} title="Save Settings" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#eee',
    },
    text: {
        fontSize: 14,
        fontWeight: 'bold',
    },
});

export default SettingsScreen;