import React, { useContext, useEffect, useState } from 'react'
import { Link, useRouter } from 'expo-router'
import { StyleSheet, Text, View, Button } from 'react-native';
import { styles, light, dark } from '../styles';
import { Box, Icon, IconButton } from 'native-base';
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
    if (userRole == 'user') setFooter(true)
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
      color: theme.four
    },
    button: {
      width: 115,
      borderRadius: 0,
      backgroundColor: theme.three
    },
    buttonDisabled : {
      width: 115,
      borderRadius: 0,
      backgroundColor: theme.two
    }
  })

  return (
    <>
    {footer? 
    <Box style={styles.footer} shadow={5}>  

        <IconButton 
          icon={<Icon as={MaterialCommunityIcons} name='home' style={icon.icon} size='8' />}
          onPress={() => {handleRoute('Home', '/home')}}
          style={iconPress['Home'] ? icon.buttonDisabled : icon.button}
          disabled={iconPress['Home']}
          shadow={iconPress['Home'] ? 3 : 0}
          >
          <Text>Home</Text>
        </IconButton>


        <IconButton 
          icon={<Icon as={MaterialCommunityIcons} name='arm-flex' style={icon.icon} size='8' />}
          onPress={() => {handleRoute('Pass', '/home/purchased_passes')}}
          disabled={iconPress['Pass']}
          style={iconPress['Pass'] ? icon.buttonDisabled : icon.button}
          shadow={iconPress['Pass'] ? 3 : 0}
          >
          <Text>Gym Page</Text>
        </IconButton>

        <IconButton 
          icon={<Icon as={MaterialCommunityIcons} name='google-maps' style={icon.icon} size='8' />}
          onPress={() => {handleRoute('Map' ,'/home/map')}}
          style={iconPress['Map'] ? icon.buttonDisabled : icon.button}
          disabled={iconPress['Map']}
          shadow={iconPress['Map'] ? 3 : 0}
          >
          <Text>Map</Text>
        </IconButton>


        <IconButton 
          icon={<Icon as={MaterialCommunityIcons} name='account' style={icon.icon} size='8' />}
          onPress={() => {handleRoute('Profile', '/home/profile')}}
          style={iconPress['Profile'] ? icon.buttonDisabled : icon.button}
          disabled={iconPress['Profile']}
          shadow={iconPress['Profile'] ? 3 : 0}
          >
          <Text>Profile</Text>
        </IconButton>

    </Box> 
    :  
    <View style={styles.footer}>

    </View>}
    </>
  )
}


