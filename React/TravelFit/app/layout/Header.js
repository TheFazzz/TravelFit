import React, { useContext } from 'react'
import { Link, useRouter } from 'expo-router'
import { StyleSheet, Text, View} from 'react-native';
import { Button, extendTheme } from 'native-base'

import { context } from '../_layout';

import { Icon, IconButton } from 'native-base';
import { MaterialCommunityIcons, AntDesign} from '@expo/vector-icons'

export default function Header() {

  const {searchFocus, setSearchFocus, backButton, setBackButton} = useContext(context)
  const router = useRouter()

  function handleBack() {
    if (backButton) {
      const recent = backButton[backButton.length - 1]

      if (recent[0] == 'route') {
        router.replace(recent[1])
      } else if (recent[0]) {
        recent[0](recent[1])
      }

      setBackButton(backButton.slice(0,-1))
    } else {
      console.error('back button doesnt exist')
    }
  }

  return (
    <View style={header.header}>
      {backButton.length > 0 && 
        <IconButton 
          onPress={handleBack} 
          style={header.back}
          icon={<Icon as={AntDesign} name='arrowleft' style={{color: 'black'}} size='8' />}
          size='sm'
          >
        </IconButton>
      }
      {searchFocus && 
        <IconButton
          icon={<Icon as={MaterialCommunityIcons} name='window-close' style={header.exit} size='8' />}
          onPress={() => {setSearchFocus(false)}}
          size='sm'
          color='red.100'
          style={header.exit}
          >
        </IconButton>
      }
    </View>
  )
}

let paddingleftandright = 15
const header = StyleSheet.create({
  back: {
    position: 'absolute',
    marginLeft: 15,
    marginTop: 50,
    flexDirection: 'row',
  },
  exit: {
    position: 'absolute',
    marginLeft: 370,
    // right: 0,
    // top: 26,
    marginTop: 52,
    // bottom: 0,
    color: 'red',
    width: 33,
    height: 33,
    // backgroundColor: '#004C6D'
  },
  header: {
    zIndex: 1,
    position: 'absolute',
    paddingLeft: paddingleftandright,
    paddingRight: paddingleftandright,
    top: 0,
    // backgroundColor: 'white',
    color:'white',
    width: '100%',
    height: '10%',
    flexDirection: 'row'
  }
})