import { Slot } from 'expo-router';
import Footer from './layout/Footer';
import Header from './layout/Header';
import { StyleSheet, Text, View } from 'react-native';
import { styles } from '../styles';
import { NativeBaseProvider } from 'native-base';
import nativebasetheme from '../nativebasetheme';

export default function HomeLayout() {
  return (
    <NativeBaseProvider >
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
