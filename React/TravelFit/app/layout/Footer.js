import React, { useContext, useEffect, useState } from 'react'
import { Link, useRouter } from 'expo-router'
import { StyleSheet, Text, View, Button } from 'react-native';
import { styles, light, dark } from '../styles';
import { Icon, IconButton } from 'native-base';
import { MaterialCommunityIcons} from '@expo/vector-icons'
import { useAuth } from '../../contexts/AuthContext';
import { context } from '../_layout';
import { useData } from '../../contexts/DatabaseContext';


export default function Footer() {

  const { userRole } = useAuth()
  const { setBackButton, darkStyle, theme } = useContext(context)
  const [footer, setFooter] = useState(false)

  const {iconPress, setIconPress} = useData()

  useEffect(() => {
    setIconPress({
      'Home': true,
      'Profile': false,
      'Map': false,
      'Pass': false
    })
  }, []) 


  const router = useRouter()

  useEffect(() => {
    if (userRole == 'User') setFooter(true)
    else setFooter(false)
  }, [userRole])

  function handleRoute(name, route, params) {
    let pressed = {
      'Home': false,
      'Profile': false,
      'Map': false,
      'Pass': false
    }
    pressed = {
      ...pressed,
      [name]: true
    }
    setIconPress(pressed)
    setBackButton([])

    router.replace({
      pathname: route,
      params: params
    })
  }

  const icon = StyleSheet.create({
    icon: {
      bottom: 10,
      color: theme.one
    },
    button: {
      width: 110,
      borderRadius: 0,
      backgroundColor: theme.three
    },
    buttonDisabled : {
      width: 110,
      borderRadius: 0,
      backgroundColor: theme.two
    }
  })

  return (
    <>
    {footer? 
    <View style={styles.footer}>

        <IconButton 
          icon={<Icon as={MaterialCommunityIcons} name='home' style={icon.icon} size='8' />}
          onPress={() => {handleRoute('Home', '/home')}}
          style={iconPress['Home'] ? icon.buttonDisabled : icon.button}
          disabled={iconPress['Home']}
          >
          <Text>Home</Text>
        </IconButton>


        <IconButton 
          icon={<Icon as={MaterialCommunityIcons} name='arm-flex' style={icon.icon} size='8' />}
          onPress={() => {handleRoute('Pass', '/home/gymPage', {id: 6})}}
          disabled={iconPress['Pass']}
          style={iconPress['Pass'] ? icon.buttonDisabled : icon.button}
          >
          <Text>Gym Page</Text>
        </IconButton>

        <IconButton 
          icon={<Icon as={MaterialCommunityIcons} name='google-maps' style={icon.icon} size='8' />}
          onPress={() => {handleRoute('Map' ,'/home/map')}}
          style={iconPress['Map'] ? icon.buttonDisabled : icon.button}
          disabled={iconPress['Map']}
          >
          <Text>Map</Text>
        </IconButton>


        <IconButton 
          icon={<Icon as={MaterialCommunityIcons} name='account' style={icon.icon} size='8' />}
          onPress={() => {handleRoute('Profile', '/home/profile')}}
          style={iconPress['Profile'] ? icon.buttonDisabled : icon.button}
          disabled={iconPress['Profile']}
          >
          <Text>Profile</Text>
        </IconButton>

    </View> 
    :  
    <View style={styles.footer}>

    </View>}
    </>
  )
}


