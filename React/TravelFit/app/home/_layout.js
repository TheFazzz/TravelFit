import { Slot } from 'expo-router';
import Footer from './layout/Footer';
import Header from './layout/Header';
import { StyleSheet, Text, View } from 'react-native';
import { styles } from '../styles';

export default function HomeLayout() {
  return (
    <View style={styles.container}>
      <Header />
      <Slot/>
      <Footer />
    </View>
  );
}