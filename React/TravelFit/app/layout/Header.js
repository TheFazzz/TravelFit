import React, { useContext } from 'react'
import { Link } from 'expo-router'
import { StyleSheet, Text, View} from 'react-native';
import { styles } from '../styles'
import { Button, extendTheme } from 'native-base'

import { context } from '../_layout';

import { Icon } from 'native-base';
import { MaterialCommunityIcons} from '@expo/vector-icons'

export default function Header() {

  const {searchFocus, setSearchFocus} = useContext(context)

  return (
    <View style={styles.header}>
        <Link href={'/'} style={header.container}>
          <Icon as={MaterialCommunityIcons} name='arrow-u-left-bottom' style={{paddingTop: 10, color: '#AFE5E7'}} size='8' />
        </Link>
        <View style={styles.exit}>
        {searchFocus? <Button
          onPress={() => {setSearchFocus(false)}}
          size='sm'
          color='red.100'
          style={styles.exit}
        >
          X
        </Button>: <></>}
        </View>
    </View>
  )
}

const header = StyleSheet.create({
  container: {
    paddingTop: 50,
    color: '#FFFFFF',
  },
  exit: {
    paddingBottom: 10,
    position: 'absolute',
    right: 0,
    marginLeft: 300,
    width: 10,
  }
})