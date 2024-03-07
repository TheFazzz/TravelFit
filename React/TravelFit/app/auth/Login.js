import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, View, Image, Button } from 'react-native';
import { useRouter } from 'expo-router';
// import * as Keychain from 'react-native-keychain'
import { KeyboardAvoidingView } from 'native-base';
import { ScrollView } from 'native-base';
import { useAuth } from '../../contexts/AuthContext';

export default function index() {

  const router = useRouter()
  const { login } = useAuth()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState(null)
  const [message, setMessage] = useState(null)

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  }

  const handleLogin = async ()=> {
    try {
      await login(email, password)
      console.log('logged in')
      router.replace('/home')
    } catch (error) {
      console.error(error)
      // setError(error)
    } 
  }

  return (
    <View style={styles.container}>
        <ScrollView keyboardShouldPersistTaps="never" contentContainerStyle={{flexGrow: 1}}>
          <Image style={styles.imageSize} source={require('../../assets/travelfitlogo.png')}></Image>

          <TextInput 
            placeholder='Email' 
            id='email' 
            style={styles.userinput} 
            value={email} 
            onChangeText={setEmail}
            autoCapitalize='none'
            >
          </TextInput> 

          <TextInput 
            secureTextEntry={true} 
            placeholder='Password' 
            id='password' 
            style={styles.userinput} 
            value={password} 
            onChangeText={setPassword}
            autoCapitalize='none'
            >
          </TextInput> 

          <Button title='Login' onPress={handleLogin} style={styles.loginButton}></Button>

          {error && <View>
              <Text>
                {error}
              </Text>
            </View>}

        </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    // height: "auto",
    flexDirection: 'column',
    // flexGrow: 1,
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
    borderRadius: 25,
    color: 'white',
    paddingVertical: '5px',
    paddingHorizontal: '25px',
    textAlign: 'center',
    width: 200,
    height: 25,
    marginTop: '20px'
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
