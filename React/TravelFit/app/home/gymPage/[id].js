import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native';
import { styles } from '../../styles';
import { router, useLocalSearchParams } from 'expo-router';
import locationData from '../map/location/locationData';

export default function index() {
    const query = useLocalSearchParams()
    const {city, coordinate, gymName, hours, id, state} = findGym(query.id)
    
    console.log(hours)

    function findGym(id){
        const foundGym = locationData.find(element => element.id == id)
        return foundGym
    }

    return (
        <View>
            <Text>
                this is the gym page
            </Text>
            <Text>
                City: {city}
            </Text>
            <Text>
                State: {state}
            </Text>
            <Text>
                Gym Name: {gymName}
            </Text>
            {Object.entries(hours).map(([key, value]) => (
                <Text>{key}: {value.open} - {value.close}</Text>
            ))}

            <Button
                title="Order Day Pass"
            ></Button>
        </View>
    )
}