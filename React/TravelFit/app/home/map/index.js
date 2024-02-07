import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import Map from './mapService/map';
import LocationList from './location/locationList';
import PullUpMenu from '../../components/pullUpMenu';

export default function map() {
    return (
        <View style={styles.body}>
            <Map/>
            {/* <PullUpMenu Content={LocationList}/> */}
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: 'lightgrey',
        width: '100%',
        height: '86%',
        marginTop: '8%',
        marginBottom: '8%'
    }
});