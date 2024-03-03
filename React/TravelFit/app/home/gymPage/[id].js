import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, View, Button } from 'react-native';
import { styles } from '../../styles';
import { router, useLocalSearchParams } from 'expo-router';
import locationData from '../map/location/locationData';
import { useData } from '../../../contexts/DatabaseContext';

export default function index() {
    const query = useLocalSearchParams()
    const {findGym} = useData()
    const [fetched, setFetched] = useState(false)
    const [gymData, setGymData] = useState({
        address1: '',
        address2: '',
        city: '',
        description: '',
        gym_name: '',
        hours: {},
        id: '',
        latitude: '',
        location: '',
        state: '',
        zipcode: ''
    })
        
    async function gatherData(){
        setGymData(await findGym(query.id))
        setFetched(true)
    }

     if (!fetched) gatherData()

     useEffect(() => {console.log(gymData)}, [gymData])

    return (
        <View>
            <Text>
                this is the gym page
            </Text>
            <Text>
                City: {gymData.city}
            </Text>
            <Text>
                State: {gymData.state}
            </Text>
            <Text>
                Gym Name: {gymData.gym_name}
            </Text>
            <Text>
                Description: {gymData.description}
            </Text>


            <Button
                title="Order Day Pass"
            ></Button>
        </View>
    )
}