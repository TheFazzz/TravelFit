import React from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import MapDisplay from './mapdisplay';
import PullUpMenu from '../../../components/pullUpMenu';
import LocationList from '../location/locationList';

export default function Map() {
    return (
        <View style={styles.container}>
            <MapDisplay/>
        </View>
    )
}

const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 0,
        right: 0,
        width: width,
        height: height,
    }
})
