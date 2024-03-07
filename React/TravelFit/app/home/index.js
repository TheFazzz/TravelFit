import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { styles } from '../styles'
import { useData } from '../../contexts/DatabaseContext';
import { useAuth } from '../../contexts/AuthContext';

export default function index() {
    const { requestLocationPermission} = useData()
    const { currentUser } = useAuth()
    requestLocationPermission()

    return (
        <View>
            {currentUser?
            <Text>
                Welcome, {currentUser.firstName}
            </Text> :
            <Text>
                Please Log in
            </Text>
            }
        </View>
    )
}