import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TextInput, View, Image, Button } from 'react-native';
import { Link, useRouter } from 'expo-router';
// import * as Keychain from 'react-native-keychain'
import { KeyboardAvoidingView } from 'native-base';
import { ScrollView, Spinner } from 'native-base';
import { useAuth } from '../../contexts/AuthContext';
import { validate } from 'react-native-web/dist/cjs/exports/StyleSheet/validate';

export default function index() {

  const { register } = useAuth()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter()

  const [error, setError] = useState(null)
  const [message, setMessage] = useState(null)

  const [loading, setLoading] = useState(false)


  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  }

  useEffect(() => {
    if (password != confirmPassword) {
      if (confirmPassword != '') {
        setError('Passwords do not match!')
      }
    } else {
      setError(null)
    }
  }, [password, confirmPassword])

  function validString(string) {
    if (string.length == 0) return false
    return true
  }

  function isValidEmail(email) {
    var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    return regex.test(email)
  }

  useEffect(() => {
    setError(null)
  }, [firstName, lastName, email])

  const signUpHandle = async ()=> {
    if (!validString(firstName)) {
      setError('First Name Required')
    } else if (!validString(lastName)) {
      setError('Last Name Required')
    } else if (!isValidEmail(email)) {
      setError('Email must be Valid')
    } else if (!error) {
      setLoading(true)
      register(firstName, lastName, email, password)
      .then(obj => {
        setError(null)
        setMessage('You are now Registered')
        setTimeout(setMessage, 10000, null)
        setLoading(false)
      })
      .catch(error => {
        setError(error)
        setLoading(false)
      })
    } else {
      shakeError()
    }
  }

  const shakeError = () => {
    //TODO: Add Code here that will shake the error message!
  }

  return (
    <View style={styles.container}>
        <ScrollView keyboardShouldPersistTaps="never" contentContainerStyle={{flexGrow: 1}}>
          <Image style={styles.imageSize} source={require('../../assets/travelfitlogo.png')}></Image>
          
          <View style={{flexDirection: 'row'}}>
            <Text>First Name: </Text>
            <TextInput 
              placeholder='John' 
              id='first_name' 
              style={styles.userinput} 
              value={firstName}
              onChangeText={setFirstName}
              autoCapitalize='none'
              >
            </TextInput> 
          </View>

          <View style={{flexDirection: 'row'}}>
            <Text>Last Name: </Text>
            <TextInput 
              placeholder='Doe' 
              id='last_name' 
              style={styles.userinput} 
              value={lastName}
              onChangeText={setLastName}
              autoCapitalize='none'
              >
            </TextInput> 
          </View>

          <View style={{flexDirection: 'row'}}>
            <Text>Email: </Text>
            <TextInput 
              placeholder='placeholder@email.com' 
              id='email' 
              style={styles.userinput} 
              value={email}
              onChangeText={setEmail}
              autoCapitalize='none'
              >
            </TextInput> 
          </View>

          <View style={{flexDirection: 'row'}}>
            <Text>Password: </Text>
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
          </View>

          <View style={{flexDirection: 'row'}}>
            <Text>Confirm Password: </Text>
            <TextInput 
              secureTextEntry={true} 
              placeholder='Confirm Password' 
              id='confirmed_password' 
              style={styles.userinput}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              autoCapitalize='none'
              >
            </TextInput> 
          </View>

          {loading?
            <Spinner size="lg" position={'absolute'} mt={500} ml={180}/>
            :
            <Button 
              title='Sign Up' 
              onPress={signUpHandle} 
              style={styles.signUpButton}
            >
            </Button>
          }

          
            
            {error && <View>
              <Text>
                {error}
              </Text>
            </View>}

            {message && <View>
              <Text>
                {message}
              </Text>
            </View>}
        </ScrollView>
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
    marginBottom: '10px',
    textAlignVertical: 'top',
  },
  signUpButton: {
    overflow: 'hidden',
    backgroundColor: '#89CFF0',
    // borderRadius: 15,
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
