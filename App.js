import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from "react-native-safe-area-context";
import Navigation from './Navigation';


export default function App() {
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
