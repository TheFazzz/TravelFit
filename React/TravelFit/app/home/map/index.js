import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { styles } from '../../styles';
import Map from './mapService/map';
import LocationList from './location/locationList';
import PullUpMenu from '../components/pullUpMenu';

export default function map() {
    return (
        <View style={styles.body}>
            <PullUpMenu Content={LocationList}/>
            <Map/>
        </View>
    )
}
