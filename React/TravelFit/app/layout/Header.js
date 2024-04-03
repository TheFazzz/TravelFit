import React, { useContext } from 'react'
import { Link } from 'expo-router'
import { StyleSheet, Text, View} from 'react-native';
import { Button, extendTheme } from 'native-base'

import { context } from '../_layout';

import { Icon, IconButton } from 'native-base';
import { MaterialCommunityIcons} from '@expo/vector-icons'

export default function Header() {

  const {searchFocus, setSearchFocus} = useContext(context)

  return (
    <View style={header.header}>
        <Link href={'/'} style={header.container}>
          <Icon as={MaterialCommunityIcons} name='arrow-u-left-bottom' style={{paddingTop: 10, color: '#AFE5E7'}} size='8' />
          {/* <IconButton href={'/'} icon={<Icon as={MaterialCommunityIcons} name='arrow-u-left-bottom' style={header.back} size='8' />} /> */}
        </Link>

        {searchFocus? <IconButton
          icon={<Icon as={MaterialCommunityIcons} name='window-close' style={header.exit} size='8' />}
          onPress={() => {setSearchFocus(false)}}
          size='sm'
          color='red.100'
          style={header.exit}
        >
        </IconButton> : <></>}
    </View>
  )
}

let paddingleftandright = 15
const header = StyleSheet.create({
  container: {
    paddingTop: 50,
    flexDirection: 'row'
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
  back: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    // width: 50,
    // height: 50,
    color: '#AFE5E7',
    // backgroundColor: 'red'
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