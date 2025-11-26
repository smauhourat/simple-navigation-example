import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from "react-native-safe-area-context";
import Navigation from './Navigation';
import { useFonts } from 'expo-font';
import { ActivityIndicator } from 'react-native-web';

export default function App() {

  const [fontsLoaded] =
  useFonts({
    'Nunito-Bold': require('./assets/fonts/Nunito-Bold.ttf'),
    'Nunito-Medium': require('./assets/fonts/Nunito-Medium.ttf'),
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  } 
  
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <Navigation />
        {/* <StatusBar style="auto" /> */}
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    width: '100%',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
