import React from 'react'
import { Link } from 'expo-router'
import { StyleSheet, Text, View } from 'react-native';
import { styles } from '../../styles';

export default function Footer() {
  return (
    <View style={styles.footer}>
        <Link href={'/home'}>Home</Link>
        <Link href={'/home/profile'}>Profile</Link>
        <Link href={'/home/map'}>Map</Link>
        <Link href={{
          pathname: '/home/gymPage/[id]',
          params: { id: 1 }
          }}>Gym Page</Link>
    </View>
  )
}