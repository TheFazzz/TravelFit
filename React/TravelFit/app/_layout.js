import { Slot } from 'expo-router';
import Footer from './layout/Footer';
import Header from './layout/Header';
import { StyleSheet, Text, View } from 'react-native';
import { Box, NativeBaseProvider } from 'native-base';
import { styles } from './styles';
import nativebasetheme from './nativebasetheme';
import { DataProvider } from '../contexts/DatabaseContext';
import { AuthProvider, useAuth } from '../contexts/AuthContext';

import React, { useState, useContext, useEffect } from 'react'
export const context = React.createContext()

export default function HomeLayout() {

  const [searchFocus, setSearchFocus] = useState(false)

  return (
    <NativeBaseProvider>
      <AuthProvider>
        <DataProvider>
          <context.Provider value={{ searchFocus, setSearchFocus }}>
            <View style={styles.container}>
              <Header />
              <View style={styles.body}>
                <Slot/>
              </View>
              <Footer />
            </View>
          </context.Provider>
        </DataProvider>
      </AuthProvider>
    </NativeBaseProvider>
  );
}
