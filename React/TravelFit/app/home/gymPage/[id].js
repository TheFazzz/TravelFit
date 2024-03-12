import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, View, Button } from 'react-native';

import { router, useLocalSearchParams } from 'expo-router';
import locationData from '../map/location/locationData';
import { useData } from '../../../contexts/DatabaseContext';
import LoadingScreen from '../../layout/LoadingScreen';
import { useRouter } from 'expo-router';


export default function Index(props) {
    const query = useLocalSearchParams()

    const router = useRouter()
    const {findGym} = useData()
    const [loading, setLoading] = useState(true)
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

    const [showInfo, setShowInfo] = useState(false)
    const [showPassOptions, setShowPassOptions] = useState(false)  

    async function gatherData(id){
        setLoading(true)
        try {
            setGymData(await findGym(id))
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (props.value) gatherData(props.value)
        else if (query) gatherData(query.id)
        else setGymData({
            address1: '123 Test St',
            address2: 'Apt C',
            city: 'City',
            description: 'Description',
            gym_name: 'Gym Name',
            hours: {},
            id: '403',
            latitude: '',
            location: '',
            state: 'CA',
            zipcode: '9288'
        })
    }, [])

     useEffect(() => {console.log(gymData)}, [gymData])

    return (
        <View style={styles.display}>
            {!loading && <>
                <Button 
                    title='back'
                    onPress={() => {props.setGymId(null)}}   
                >
<<<<<<< HEAD
                </Button>
                <View style={styles.tabButtons}>   
                    <Button
                        title="Gym Information"
                        variant='link'
                        style={styles.button}
                        onPress={() => {router.replace('./../../purchase/purchaseScreen')}}
                    ></Button>

                    <Button
                        title="Order Day Pass"
                        variant='link'
                        style={styles.button}
                        onPress={() => {router.replace('./../../purchase/purchaseScreen')}}
                    ></Button>
                </View>  

                <Text>
                    this is the gym page
=======
                
                
                    </Button>

                <View style={styles.buttons}><Button
                        title="Info"
                        onPress={() => {
                            setShowInfo(true)
                            setShowPassOptions(false)
                        }}
                    >
                    </Button>
                    
                    <Button
                        title="Pass Options"
                        onPress={() => {
                            setShowInfo(false)
                            setShowPassOptions(true)
                        }}
                    >
                    </Button></View>
                    
                
                
            
                {/*<Text>
                    this is the gym pagev
>>>>>>> 38fb2f196262b498720531458b38ba46013b97d3
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
<<<<<<< HEAD
                </Text>

=======
                    </Text>*/}

                {showInfo && (
                        <View style={styles.infoContainer}>
                            <Text>City: {gymData.city}</Text>
                            <Text>State: {gymData.state}</Text>
                            <Text>Gym Name: {gymData.gym_name}</Text>
                            <Text>Description: {gymData.description}</Text>
                        </View>
                    )}
                <Button
                    title="Order Day Pass"
                ></Button>
>>>>>>> 38fb2f196262b498720531458b38ba46013b97d3
            </>}
            {loading && <LoadingScreen/>}
        </View>
    )
}

let styles = StyleSheet.create({
    display: {
        position:'absolute',
        height: '100%',
        width: '110%',
        backgroundColor: 'aqua',
    },
<<<<<<< HEAD
    tabButtons: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%'
    },
    button: {
        width: '50%'
=======
    buttons: {
        marginTop: 30,
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 30
>>>>>>> 38fb2f196262b498720531458b38ba46013b97d3
    }
})