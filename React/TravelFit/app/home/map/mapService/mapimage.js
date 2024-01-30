import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native';


export default function Mapimage() {
  return (
    <View>
        <Image 
            style={styles.image}
            source={require('./assets/mapexample.jpeg')}/>
    </View>
  )
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: '100%'
    }
})
