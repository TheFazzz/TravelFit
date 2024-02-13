import { Slot } from 'expo-router';
import Footer from './layout/Footer';
import Header from './layout/Header';
import { StyleSheet, Text, View } from 'react-native';
import { Box, NativeBaseProvider } from 'native-base';
import { styles } from '../styles';
import nativebasetheme from '../nativebasetheme';

import React, { useState, useContext } from 'react'
export const context = React.createContext()

export default function HomeLayout() {
  const [searchFocus, setSearchFocus] = useState(false)

  return (
    <NativeBaseProvider>
      <context.Provider value={{searchFocus, setSearchFocus}}>
        <View style={styles.container}>
          <Header />
          <View style={styles.body}>
            <Slot />
          </View>
          <Footer />
        </View>
      </context.Provider>
    </NativeBaseProvider>
  );
}
