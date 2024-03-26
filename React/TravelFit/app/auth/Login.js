import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TextInput, View, Image, Button } from 'react-native';
import { useRouter } from 'expo-router';
import { ScrollView, Checkbox, HStack, Spinner, Box, Input, VStack, Center, Link } from 'native-base';
import { useAuth } from '../../contexts/AuthContext';
import { storeData } from '../../asyncStorage/asyncStorage';

export default function index() {

  const router = useRouter()
  const { login } = useAuth()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [saveLogin, setSaveLogin] = useState(false)

  const [error, setError] = useState(null)
  const [message, setMessage] = useState(null)

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    console.log(saveLogin)
  }, [saveLogin])

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  }

  useEffect(() => {setError(null)}, [email, password])

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
            await storeData('login-data', {email, password, userRole})
          }
        console.log('logged in')
        if (userRole == 'User') router.replace('/home')
        else if (userRole == 'Gym') router.replace('/gym_user')
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
    return <Box bg="white"  alignSelf='center'px={"-10"} >
      <Input mx="3"
        size = "md"
        placeholder="Email"
        w="75%"
        value={email}
        onChangeText={setEmail}
        autoCapitalize = 'none'
        
         />
    </Box>
  }

  const passwordBox = () =>{
    return <Box bg="white"  alignSelf='center'px={"-10"} >
      <Input mx="3"
        size = "md"
        placeholder="Password"
        id='password'
        w="75%"
        value={password}
        onChangeText={setPassword}
        autoCapitalize = 'none'
        secureTextEntry={true}
         />
    </Box>
  }

  //forgot password link
  const forgotPWLink = () => {
    return <Box alignItems="center" paddingBottom={4}> 
      <Link href='/forgotPW' mt={4}_text={{
      fontSize:"md",
      _light:{
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
      Forgot Password?
    </Link>
    </Box>;
  }
  
  return (
    <View style={styles.container}>
      <ScrollView keyboardShouldPersistTaps="never" contentContainerStyle={{ flexGrow: 1 }}>
        <Image style={styles.imageSize} source={require('../../assets/travelfitlogo.png')}></Image>
      
       
      <VStack space={3}>
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
          Remember Me?
        </Checkbox>
        {forgotPWLink()}
      </HStack>

        {loading?
          <Spinner size="lg" position={'absolute'} mt={470} ml={180}/>
        :
          <Button 
            title='Login' 
            value='test' 
            onPress={handleLogin} 
            style={styles.loginButton}>
          </Button>
        }

        {error && <View>
          <Text bold alignSelf={'center'} fontSize="2xl"  >
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
    backgroundColor: 'white',
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
