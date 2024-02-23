import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, View, Image, Button } from 'react-native';
import { Link } from 'expo-router';
// import * as Keychain from 'react-native-keychain'
import { KeyboardAvoidingView } from 'native-base';

export default function index() {

  // const [isLoggedIn, setIsLoggedin] = useState(false);

  const handleLogin = async ()=> {
    const token = '';
    const username = '';
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
      setShowPassword(!showPassword);
    }

    await Keychain.setPassword(username, token);
    setIsLoggedin(true);
    setUserDetails({token, username});

    console.log("logged in")
  }

  return (
    <View>
        <KeyboardAvoidingView style={styles.container}>
          <Image style={styles.imageSize} source={require('../../assets/travelfitlogo.png')}></Image>


          <TextInput placeholder='Username' id='username' style={styles.userinput}>
          </TextInput> 

          <TextInput secureTextEntry={false} placeholder='Password' id='password' style={styles.userinput}>
          </TextInput> 

          <Button title='Login' onPress={handleLogin} style={styles.loginButton}></Button>
        </KeyboardAvoidingView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    // flex: 1,
    backgroundColor: 'silver',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userinput: {
    overflow: 'hidden',
    border: '1px solid black',
    padding: '5px',
    borderRadius: 15,
    marginBottom: '10px'
  },
  loginButton: {
    overflow: 'hidden',
    backgroundColor: '#89CFF0',
    borderRadius: 15,
    color: 'white',
    paddingVertical: '5px',
    paddingHorizontal: '25px',
    textAlign: 'center',
    width: 100,
    height: 25,
  },
  imageSize: {
    // flex: 1,
    // aspectRatio: 1.5,
    height: 400,
    width: 400,
    resizeMode: 'contain',
    justifyContent: 'center'
  }
});
