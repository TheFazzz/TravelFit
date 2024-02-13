import React, { useContext } from 'react'
import { Link } from 'expo-router'
import { StyleSheet, Text, View} from 'react-native';
import { styles } from '../../styles';
import { Button, extendTheme } from 'native-base'

import { context } from '../_layout';

export default function Header() {

  const {searchFocus, setSearchFocus} = useContext(context)
  console.log(searchFocus, setSearchFocus)

  return (
    <View style={styles.header}>
        <Link href={'/'} style={header.container}>Back to Index</Link>
        <View style={styles.exit}>
        {searchFocus? <Button
          onPress={() => {setSearchFocus(false)}}
          size='sm'
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
    paddingTop: 50
  },
  exit: {
    paddingBottom: 10,
    position: 'absolute',
    right: 0,
    marginLeft: 300,
    width: 10,
  }
})