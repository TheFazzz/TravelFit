import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, Text, TextInput, View, Image, Keyboard } from 'react-native';
import { useRouter } from 'expo-router';
import { ScrollView, Checkbox, HStack, Spinner, Box, Input, VStack, Center, Link, Button } from 'native-base';
import { useAuth } from '../../contexts/AuthContext';
import { storeData } from '../../asyncStorage/asyncStorage';
import { context } from '../_layout';

export default function index() {

  const router = useRouter()
  const { login } = useAuth()
  const { setFooter, setHeader } = useContext(context)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [saveLogin, setSaveLogin] = useState(false)

  const [error, setError] = useState(null)
  const [message, setMessage] = useState(null)

  const [loading, setLoading] = useState(false)

  const [emailFocus, setEmailFocus] = useState(false)
  const [passwordFocus, setPasswordFocus] = useState(false)

  useEffect(() => {
    console.log(saveLogin)
  }, [saveLogin])

  useEffect(() => {
    const keyboardListener = Keyboard.addListener('keyboardDidHide', () => {
      setEmailFocus(false)
      setPasswordFocus(false)
    })
  }, [])

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  }

  useEffect(() => { setError(null) }, [email, password])

  const handleLogin = async () => {
    if (email.length == 0) {
      setError('Email Required')
    } else if (password.length == 0) {
      setError('Password Required')
    } else if (!isValidEmail(email)) {
      setError('Email must be in proper email format')
    } else {
      try {
        setLoading(true)
        const userRole = await login(email, password)
        if (saveLogin) {
          await storeData('login-data', { email, password, userRole })
        }
        console.log('logged in')
        if (userRole == 'user') {
          setFooter(true)
          setHeader(true)
          router.replace('/home')
        }
        else if (userRole == 'gym') router.replace('/gym_user')
        else if (userRole == 'admin') router.replace('/admin')
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false)
      }
    }
  }

  function isValidEmail(email) {
    var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    return regex.test(email)
  }



  const emailBox = () => {
    return (
      <Box alignSelf='center' px={"-10"} >
        <Input
          // bg="white"
          mx="3"
          size="md"
          placeholder="Email"
          w={styles.form.width}
          value={email}
          onChangeText={setEmail}
          autoCapitalize='none'
          onFocus={() => {
            setEmailFocus(true)
            setPasswordFocus(false)
          }}
          isFocused={emailFocus}
          style={{ backgroundColor: 'white' }}
        />
      </Box>
    )
  }

  const passwordBox = () => {
    return (
      <Box alignSelf='center' px={"-10"} >
        <Input
          // bg="white"
          mx="3"
          size="md"
          placeholder="Password"
          id='password'
          w={styles.form.width}
          // style={styles.form}
          style={{ backgroundColor: 'white' }}
          value={password}
          onChangeText={setPassword}
          autoCapitalize='none'
          secureTextEntry={true}
          onFocus={() => {
            setPasswordFocus(true)
            setEmailFocus(false)
          }}
          isFocused={passwordFocus}
        />
      </Box>
    )
  }



  //forgot password link
  const forgotPWLink = () => {
    return <Box alignItems="center" paddingBottom={4}>
      <Link href='/forgotPW' mt={4} _text={{
        fontSize: "md",
        _light: {
          color: "cyan.500"
        },
        color: "cyan.300"
      }}
        isUnderlined _hover={{
          _text: {
            _light: {
              color: "cyan.600"
            },
            color: "cyan.400"
          }
        }} >
        <Text style={styles.fontForgotpassword}>
          Forgot Password?
        </Text>
      </Link>
    </Box>;
  }

  const styles = StyleSheet.create({
    container: {
      display: 'flex',
      // height: "auto",
      flexDirection: 'column',
      // flexGrow: 1,
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      transform: [{
        translateY: passwordFocus? -200 : emailFocus? -100 : 0,
      }]
    },
    error: {
      paddingTop: 15
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
    },
    font: {
      color: 'white',
      shadowColor: 'black 410',
      shadowOpacity: 1,
      fontSize: 17
    },
    fontError: {
      color: 'red',
      shadowColor: 'black 410',
      shadowOpacity: 1,
      fontSize: 17
    },
    fontForgotpassword: {
      color: 'aqua',
      shadowColor: 'black 410',
      shadowOpacity: 1,
      fontSize: 17
    },
    form: {
      width: '85%',
    },
    forms: {
      display: 'flex',
      gap: 7
    }
  });
  

  return (
    <ScrollView>

      <View style={styles.container}>
        <Image style={styles.imageSize} source={require('../../assets/travelfitlogo.png')}></Image>
        <VStack space={3} style={styles.forms}>
          {emailBox()}
          {passwordBox()}
        </VStack>
        <HStack space={6} alignSelf={'center'} alignItems={'center'} >

          <Checkbox
            shadow={2}
            value={saveLogin}
            onChange={(e) => setSaveLogin(e)}
            accessibilityLabel="This is a dummy checkbox"
          >
            <Text style={styles.font}>
              Remember Me?
            </Text>
          </Checkbox>
          {forgotPWLink()}
        </HStack>

        {loading ?
          <Spinner size="lg" position={'absolute'} mt={470} ml={180} />
          :
          <Button
            onPress={handleLogin}
            style={styles.form}
          >
            <Text style={styles.font}>
              Login
            </Text>
          </Button>
        }


        <View style={styles.error}>
          <Text bold alignSelf={'center'} fontSize="2xl" style={styles.fontError}>
            {error}
          </Text>
        </View>

        <View style={styles.signup}>
          <Text style={styles.font}>
            Don't have an account?
          </Text>
          <Link style={styles.signupLink} onPress={() => {
            router.replace('/auth/Signup')
          }}>
            <Text style={styles.font}>
              Sign Up
            </Text>
          </Link>
        </View>
      </View>
    </ScrollView>

  )
}

