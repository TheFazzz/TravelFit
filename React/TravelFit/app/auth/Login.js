import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, View, Image } from 'react-native';
import { Link } from 'expo-router';
// import * as Keychain from 'react-native-keychain'

export default function index() {

  // const [isLoggedIn, setIsLoggedin] = useState(false);

  const handleLogin = async ()=> {
    const token = '';
    const username = '';

    await Keychain.setPassword(username, token);
    setIsLoggedin(true);
    setUserDetails({token, username});

    console.log("logged in")
  }

  return (
    <View>
        <Image source={require('../../assets/travelfitlogo.png')}></Image>

        <TextInput placeholder='Username' id='username' style={styles.userinput}>
        </TextInput> 

        <TextInput placeholder='Password' id='password' style={styles.userinput}>
        </TextInput> 

        <Text onPress={handleLogin} style={styles.loginButton}>Login</Text>
    </View>
  )
}

const styles = {
  userinput: {
    border: '1px solid black',
    padding: '5px',
    borderRadius: '15px',
    marginBottom: '10px'
  },
  loginButton: {
    backgroundColor: '#89CFF0',
    borderRadius: '15px',
    color: 'white',
    paddingVertical: '5px',
    paddingHorizontal: '25px',
    textAlign: 'center'
  }
};
