import { Slot } from 'expo-router';
import Footer from './layout/Footer';
import Header from './layout/Header';
import { StyleSheet, Dimensions, Text, View, Image, TouchableNativeFeedbackComponent } from 'react-native';
import { Box, NativeBaseProvider, ScrollView } from 'native-base';
import nativebasetheme from './nativebasetheme';
import { DataProvider } from '../contexts/DatabaseContext';
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import React, { useState, useContext, useEffect } from 'react'
import { StatusBar, setStatusBarStyle } from 'expo-status-bar';
import { dark, light } from './styles';

let screenHeight = (Dimensions.get('window').height / 1);
let paddingleftandright = 15

export const context = React.createContext()
export default function HomeLayout() {

  const [searchFocus, setSearchFocus] = useState(false)
  const [header, setHeader] = useState(false)
  const [footer, setFooter] = useState(false)
  const [background, setBackground] = useState(null)
  const [qr, setQr] = useState(false)
  const [backButton, setBackButton] = useState([])
  const [darkStyle, setDarkStyle] = useState(false)
  const [theme, setTheme] = useState(light)


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
    setBackButton,
    setDarkStyle,
    darkStyle,
    theme
  }

  useEffect(() => {
    setBackground(true)
  }, [])

  useEffect(() => {
    if (darkStyle) {
      setStatusBarStyle('light')
      setTheme(dark)
    } else {
      setStatusBarStyle('dark')
      setTheme(light)
    }
  }, [darkStyle])



  const styles = StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
      backgroundColor: qr? theme.one : theme.four,
      alignItems: 'center',
      justifyContent: 'center',
    },
    body: {
      paddingTop: 90,
      paddingLeft: paddingleftandright,
      paddingRight: paddingleftandright,
      flex: 1,
      // backgroundColor: '#AFE5E7',
      width: '100%',
      height: screenHeight * 2 * 2,
    },
    footer: {
      paddingLeft: paddingleftandright,
      paddingRight: paddingleftandright,
      bottom: 0,
      display: 'flex',
      flexDirection: 'row',
      backgroundColor: 'lightgrey',
      width: '100%',
      height: '8%',
      justifyContent: 'center',
    },
    backgroundImage: {
      flex: 1,
      resizeMode: 'cover',
      position: 'absolute',
      height: '100%',
      width: '100%'
    },
  });

  return (
    <NativeBaseProvider>
      <AuthProvider>
        <DataProvider>
          <context.Provider value={value}>
            <View style={styles.container}>
              {background && <Image source={require(`../assets/freeweights.png`)} style={styles.backgroundImage} />}
              {header && <Header />}
              <View style={[styles.body, { backgroundColor: 'none' }]}>
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

