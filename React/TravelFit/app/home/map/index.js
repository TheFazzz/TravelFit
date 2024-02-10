import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import Map from './mapService/map';
import LocationList from './location/locationList';
import PullUpMenu from '../../components/pullUpMenu';
import { styles } from '../../styles';

export default function map() {
    return (
        <Map />
    )
}
