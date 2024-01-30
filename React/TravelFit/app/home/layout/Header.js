import React from 'react'
import { Link } from 'expo-router'
import { StyleSheet, Text, View } from 'react-native';
import { styles } from '../../styles';


export default function Header() {
  return (
    <View style={styles.header}>
        <Link href={'/'}>Back to Index</Link>
    </View>
  )
}