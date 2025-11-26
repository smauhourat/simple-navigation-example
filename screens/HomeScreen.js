import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { s, vs } from 'react-native-size-matters'
import { IMAGES } from '../constants/images-paths';
import { Image } from 'react-native-web';

const HomeScreen = () => {
    return (
        <View style={styles.container}>
            <Image source={IMAGES.appLogo} style={styles.logo}/>
            <Text style={styles.text}>Bienvenidos</Text>
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
        fontSize: 28,
        marginTop: 10,
        fontFamily: 'Nunito-Bold',
    },
    logo:{
        height: vs(170),
        width: s(175),
        tintColor: '#333',
    },    
});

export default HomeScreen;