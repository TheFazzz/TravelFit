import { Slot } from 'expo-router';
import Footer from './layout/Footer';
import Header from './layout/Header';
import { StyleSheet, Text, View } from 'react-native';
import { Box, NativeBaseProvider } from 'native-base';
import { styles } from '../styles';

export default function HomeLayout() {
  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <Header />
        <View style={styles.body}>
          <Slot />
        </View>
        <Footer />
      </View>
    </NativeBaseProvider>
  );
}
