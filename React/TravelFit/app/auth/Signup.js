import React, { useEffect, useState, useContext } from 'react'
import { StyleSheet, Text, TextInput, View, Image, Button } from 'react-native';
import { useRouter } from 'expo-router';
// import * as Keychain from 'react-native-keychain'
import { ScrollView, Checkbox, HStack, Spinner, Box, Input, VStack, Center, Link, Heading } from 'native-base';
import { useAuth } from '../../contexts/AuthContext';
import { validate } from 'react-native-web/dist/cjs/exports/StyleSheet/validate';
import { context } from '../_layout';

export default function index() {
  const { setFooter, setHeader } = useContext(context)
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
        setError(<Heading color='white' textAlign={'center'} >Passwords do not match!</Heading>)
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
      setError(<Heading color='white' textAlign={'center'}>First Name Required</Heading>)
    } else if (!validString(lastName)) {
      setError(<Heading color='white' textAlign={'center'}>Last Name Required</Heading>)
    } else if (!isValidEmail(email)) {
      setError(<Heading color='white' textAlign={'center'}>Email must be Valid!</Heading>)
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

  const firstNameBX = () => {
    return <Box bg = 'white' alignSelf='center' px={"-10"} >
      <Input 
        bg='white'
        mx="3"
        size = "md"
        placeholder="First Name"
        w="85%"
        value={firstName}
        onChangeText={setFirstName}
        autoCapitalize = 'none'
        id ='first_name'
        
         />
    </Box>
    /*return (
    <Box  alignSelf='center' px={"-10"} >
      <Input 
        bg="white"
        mx="3"
        size="md"
        placeholder="Email Address"
        w="65%"
        value={email}
        onChangeText={setEmail}
        autoCapitalize='none'

      />
    </Box>
    ) */
  }
  const lastNameBX = () => {
    return <Box bg='white' alignSelf='center'  >
    <Input 
      mx="3"
      w="85%"
      size = "md"
      placeholder="Last Name"
      style={{backgroundColor: 'white'}}
      value={lastName}
      onChangeText={setLastName}
      autoCapitalize = 'none'
      id ='last_name'

      />
      </Box>
  }

  const passwordBox = () => {
    return (
    <Box alignSelf='center' px={"-10"} bg='white'>
      <Input 
        bg="white"
        mx="3"
        w="85%"
        size="lg"
        placeholder="Password"
        id='password'
        value={password}
        onChangeText={setPassword}
        autoCapitalize='none'
        secureTextEntry={true}
      />
    </Box>
    )
  }

  const confirmPassWD = () => {
    return (
    <Box alignSelf='center' px={"-10"} bg='white' >
      <Input 
        bg="white"
        mx="3"
        w="85%"
        size="lg"
        placeholder='Confirm Password' 
        id='confirmed_password'
        value={confirmPassword}
        style={styles.userinput}
        onChangeText={setConfirmPassword}
        autoCapitalize='none'
        secureTextEntry={true}
      />
    </Box>
    )
  }

  //login txt
  const loginTXT = () => {
    return <Heading size={"md"} p="2" textAlign={'center'} color={'white'} >
      Welcome!
    </Heading>
  }
  const emailBox = () => {
    return (
    <Box  alignSelf='center' px={"-10"} bg='white' >
      <Input 
        bg="white"
        mx="3"
        size="md"
        placeholder="Email Address"
        w="85%"
        value={email}
        onChangeText={setEmail}
        autoCapitalize='none'

      />
    </Box>
    )
  }

  return (
    <View style={styles.container}>
        <ScrollView keyboardShouldPersistTaps="never" contentContainerStyle={{flexGrow: 1}}>
          <Image style={styles.imageSize} source={require('../../assets/travelfitlogo.png')}></Image>
          
          <View >
            <VStack space={4}>
            {loginTXT()}
            {firstNameBX()}
            {lastNameBX()}
            {emailBox()}
            {passwordBox()}
            {confirmPassWD()}
            </VStack>
          </View>
            
          


          {loading?
            <Spinner size="lg" position={'absolute'} mt={500} ml={180}/>
            :
            <Button 
              title='Submit' 
              onPress={signUpHandle} 
              style={styles.signUpButton}
              color={'white'}
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
    
    backgroundColor: 'transparent',
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
