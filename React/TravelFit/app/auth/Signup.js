import React, { useEffect, useState, useContext } from 'react'
import { StyleSheet, Text, TextInput, View, Image, Keyboard } from 'react-native';
import { useRouter } from 'expo-router';
// import * as Keychain from 'react-native-keychain'
import { ScrollView, Checkbox, HStack, Spinner, Box, Input, VStack, Center, Link, Heading, Button } from 'native-base';
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

  const [formFocus, setFormFocus] = useState({
    firstName: false,
    lastName: false,
    email: false,
    password: false,
    confirmPassword: false,
  })

  useEffect(() => {
    setBottom(0)
  }, [bottom])

  const [bottom, setBottom] = useState(0)

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  }

  useEffect(() => {
    const keyboardListener = Keyboard.addListener('keyboardDidHide', () => {
      setFormFocus({
        firstName: false,
        lastName: false,
        email: false,
        password: false,
        confirmPassword: false,
      })
    })
  }, [])

  useEffect(() => {

    if (password != confirmPassword) {
      if (confirmPassword != '') {
        setError(<Heading color='red' textAlign={'center'} >Passwords do not match!</Heading>)
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

  const signUpHandle = async () => {
    if (!validString(firstName)) {
      setError(<Heading color='red' textAlign={'center'}>First Name Required</Heading>)
    } else if (!validString(lastName)) {
      setError(<Heading color='red' textAlign={'center'}>Last Name Required</Heading>)
    } else if (!isValidEmail(email)) {
      setError(<Heading color='red' textAlign={'center'}>Email must be Valid!</Heading>)
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
    return <Box alignSelf='center' px={"-10"} >
      <Input
        // bg='white'
        mx="3"
        size="md"
        placeholder="First Name"
        w="85%"
        value={firstName}
        onChangeText={setFirstName}
        autoCapitalize='none'
        id='first_name'
        style={{ backgroundColor: 'white' }}
        onFocus={() => {
          setFormFocus({
            firstName: true,
            lastName: false,
            email: false,
            password: false,
            confirmPassword: false,
          })
        }}
        isFocused={formFocus.firstName}
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
    return <Box alignSelf='center'  >
      <Input
        mx="3"
        w="85%"
        size="md"
        placeholder="Last Name"
        style={{ backgroundColor: 'white' }}
        value={lastName}
        onChangeText={setLastName}
        autoCapitalize='none'
        id='last_name'
        onFocus={() => {
          setFormFocus({
            firstName: false,
            lastName: true,
            email: false,
            password: false,
            confirmPassword: false,
          })
        }}
        isFocused={formFocus.lastName}

      />
    </Box>
  }

  const passwordBox = () => {
    return (
      <Box alignSelf='center' px={"-10"}>
        <Input
          // bg="white"
          mx="3"
          w="85%"
          size="lg"
          placeholder="Password"
          id='password'
          value={password}
          onChangeText={setPassword}
          autoCapitalize='none'
          secureTextEntry={true}
          style={{ backgroundColor: 'white' }}
          onFocus={() => {
            setFormFocus({
              firstName: false,
              lastName: false,
              email: false,
              password: true,
              confirmPassword: false,
            })
          }}
          isFocused={formFocus.password}

        />
      </Box>
    )
  }

  const confirmPassWD = () => {
    return (
      <Box alignSelf='center' px={"-10"} >
        <Input
          // bg="white"
          mx="3"
          w="85%"
          size="lg"
          placeholder='Confirm Password'
          id='confirmed_password'
          value={confirmPassword}
          // style={styles.userinput}
          onChangeText={setConfirmPassword}
          autoCapitalize='none'
          secureTextEntry={true}
          style={{ backgroundColor: 'white' }}
          onFocus={() => {
            setFormFocus({
              firstName: false,
              lastName: false,
              email: false,
              password: false,
              confirmPassword: true,
            })
          }}
          isFocused={formFocus.confirmPassword}

        />
      </Box>
    )
  }

  //login txt
  const loginTXT = () => {
    return (
      <Box bgColor={'primary.500'} shadow={3} borderRadius={7}>
        <Heading size={"lg"} p="2" textAlign={'center'} color={'white'} shadow={5}>
          Register New User
        </Heading>
      </Box>
    )
  }
  const emailBox = () => {
    return (
      <Box alignSelf='center' px={"-10"} >
        <Input
          // bg="white"
          mx="3"
          size="md"
          placeholder="Email Address"
          w="85%"
          value={email}
          onChangeText={setEmail}
          autoCapitalize='none'
          style={{ backgroundColor: 'white' }}
          onFocus={() => {
            setFormFocus({
              firstName: false,
              lastName: false,
              email: true,
              password: false,
              confirmPassword: false,
            })
          }}
          isFocused={formFocus.email}

        />
      </Box>
    )
  }

  useEffect(() => {
    let bottom
    if (formFocus.firstName) {
      bottom = 0
    } else if (formFocus.lastName) {
      bottom = 50
    } else if (formFocus.email) {
      bottom = 100
    } else if (formFocus.password) {
      bottom = 150
    } else if (formFocus.confirmPassword) {
      bottom = 200
    } else {
      bottom = 0
    }
    setBottom(bottom)

  }, [formFocus])

  return (
    <ScrollView keyboardShouldPersistTaps="never" contentContainerStyle={{ flexGrow: 1 }}>
      <View style={{ bottom: bottom }}>
        
        <View style={styles.container}>
          <VStack space={3} style={styles.forms} >
            {loginTXT()}
            
            {/* Display error for first name */}
            
            <View style={{width : '100%'}}>
            {firstNameBX()}
              {error && !validString(firstName) && (
                <Text style={errorTextStyle}>First Name Required*</Text>
              )}
              
            </View>
            
            <View style={{width : '100%'}}>
              {/* Display error for last name */}
              {lastNameBX()}
              {error && !validString(lastName) && (
                <Text style={errorTextStyle}>Last Name Required*</Text>
              )}
              
            </View>

            <View style={{width : '100%'}}>
              {emailBox()}
              {/* Display error for email */}
              {error && !isValidEmail(email) && (
                <Text style={errorTextStyle}>Email must be Valid!*</Text>
              )}
              
            </View>

            <View style={{width : '100%'}}>
              {/* Display error for password */}
              {passwordBox()}
              {error && !validString(password) && (
                <Text style={errorTextStyle}>Password Required*</Text>
              )}
              
            </View>

            <View style={{width : '100%'}}>
              {/* Display error for password confirmation */}
              {confirmPassWD()}
              {error && password !== confirmPassword && (
                <Text style={errorTextStyle} pl={3} pb={1}>Passwords do not match*</Text>
              )}
              
            </View>
            
          </VStack >
          {/* </View> */}




          {loading ?
            <Spinner size="lg" position={'absolute'} mt={500} ml={180} />
            :
            // <Button 
            //   onPress={signUpHandle} 
            //   style={styles.form}
            //   title='Sign Up'
            // >
            // </Button>
            <Button
              onPress={signUpHandle}
              style={styles.form}
            >
              <Text style={styles.font}>
                Sign Up
              </Text>
            </Button>
          }

          <View style={styles.signup}>
            <Text style={styles.font}>
              Already have an account?
            </Text>
            <Link style={styles.signupLink} onPress={() => {
              router.replace('/auth/Login')
            }}>
              <Text style={styles.font}>
                Log in
              </Text>
            </Link>
          </View>

        </View>





        

        {message && <View>
          <Text>
            {message}
          </Text>
        </View>}
      </View>
    </ScrollView>
  )
}
const errorTextStyle = {
  color: 'red', // Change color to light pink
  fontSize: 13, // Change font size to smaller text
  paddingBottom: 5,
  paddingLeft: 15
};

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
  },
  font: {
    color: 'white',
    shadowColor: 'black 410',
    shadowOpacity: 1,
    fontSize: 17
  },
  form: {
    width: '85%',
    // backgroundColor: '#89CFF0',
    marginTop: 20
  },
  forms: {
    display: 'flex',
    gap: 7
  },
  signup: {
    marginTop: 100,
    display: 'flex',
    flexDirection: 'row',
    gap: 5
  },
  signupLink: {
    bottom: 2,
  },
});
