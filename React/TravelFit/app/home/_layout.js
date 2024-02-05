import { Slot } from 'expo-router';
import Footer from './layout/Footer';
import Header from './layout/Header';
import { StyleSheet, Text, View } from 'react-native';

export default function HomeLayout() {
  return (
    <View style={styles.container}>
      <Header />
      <Slot/>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'silver',
    alignItems: 'center',
    justifyContent: 'center',
},
})