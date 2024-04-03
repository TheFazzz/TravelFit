import { Slot } from 'expo-router';
import Footer from './layout/Footer';
import Header from './layout/Header';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Box, NativeBaseProvider, ScrollView } from 'native-base';
import { styles } from './styles';
import nativebasetheme from './nativebasetheme';
import { DataProvider } from '../contexts/DatabaseContext';
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import React, { useState, useContext, useEffect } from 'react'

export const context = React.createContext()

export default function HomeLayout() {

  const [searchFocus, setSearchFocus] = useState(false)
  const [header, setHeader] = useState(false)
  const [footer, setFooter] = useState(false)
  const [background, setBackground] = useState(true)


  const value = {
    searchFocus,
    setSearchFocus,
    header,
    setHeader,
    footer,
    setFooter
  }

  useEffect(() => {
    if (!footer) setBackground(true)
    else setBackground(null)
  }, [footer])


  return (
    <NativeBaseProvider>
      <AuthProvider>
        <DataProvider>
          <context.Provider value={value}>
            {background && <Image source={require('../assets/freeweights.png')} style={styles.backgroundImage}/>}
            <View style={styles.container}>
              {header && <Header />}
                <View style={styles.body}>
                  <Slot />
                </View>
              {footer && <Footer />}
            </View>
          </context.Provider>
        </DataProvider>
      </AuthProvider>
    </NativeBaseProvider>
  );
}

