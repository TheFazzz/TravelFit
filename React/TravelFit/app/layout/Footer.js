import React, { useEffect, useState } from 'react'
import { Link } from 'expo-router'
import { StyleSheet, Text, View } from 'react-native';
import { styles } from '../styles';
import { Icon } from 'native-base';
import { MaterialCommunityIcons} from '@expo/vector-icons'
import { useAuth } from '../../contexts/AuthContext';

export default function Footer() {

  const { userRole } = useAuth()
  const [footer, setFooter] = useState(false)

  useEffect(() => {
    if (userRole == 'User') setFooter(true)
    else setFooter(false)
  }, [userRole])

  return (
    <>
    {footer? 
    <View style={styles.footer}>
        <Link href={'/home'}>
          <Icon as={MaterialCommunityIcons} name='home' style={{paddingTop: 10}} size='8' />
        </Link>

        <Link href={'/home/profile'}>
          <Icon as={MaterialCommunityIcons} name='account' style={{paddingTop: 10}} size='8' />
        </Link>
        <Link href={'/home/map'}>
          <Icon as={MaterialCommunityIcons} name='google-maps' style={{paddingTop: 10}} size='8' />
        </Link>
        <Link href={{
          pathname: '/home/gymPage/[id]',
          params: { id: 6 }
          }}>
          <Icon as={MaterialCommunityIcons} name='arm-flex' style={{paddingTop: 10}} size='8' />
          </Link> 
    </View> 
    :  
    <View style={styles.footer}>

    </View>}
    </>
  )
}
