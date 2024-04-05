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
  const [background, setBackground] = useState(null)
  const [qr, setQr] = useState(false)
  const [backButton, setBackButton] = useState([])

  function removeBackground() {
    setBackground(null)
    setQr(null)
  }

  const value = {
    searchFocus,
    setSearchFocus,
    header,
    setHeader,
    footer,
    setFooter,
    setBackground,
    setQr,
    removeBackground,
    backButton,
    setBackButton
  }

  useEffect(() => {
    setBackground(true)
  }, [])

  return (
    <NativeBaseProvider>
      <AuthProvider>
        <DataProvider>
          <context.Provider value={value}>
            {qr && <Image source={require(`../assets/qrCode-background.jpg`)} style={styles.backgroundImage}/>}
            {background && <Image source={require(`../assets/freeweights.png`)} style={styles.backgroundImage}/>}
            <View style={styles.container}>
              {header && <Header />}
                <View style={[styles.body, {backgroundColor: 'none'}]}>
                  <Slot/>
                </View>
              {footer && <Footer />}
            </View>
          </context.Provider>
        </DataProvider>
      </AuthProvider>
    </NativeBaseProvider>
  );
}

