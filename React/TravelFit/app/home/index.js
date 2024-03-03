import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { styles } from '../styles'
import { useData } from '../../contexts/DatabaseContext';

export default function index() {
    const { requestLocationPermission } = useData()
    requestLocationPermission()

    return (
        <View>
            <Text>
                this is home page
            </Text>
        </View>
    )
}