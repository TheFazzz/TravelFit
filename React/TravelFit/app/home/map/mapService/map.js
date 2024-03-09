import React, { useState, useEffect } from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import MapDisplay from './mapdisplay';
import { useData } from '../../../../contexts/DatabaseContext';
import LoadingScreen from '../../../layout/LoadingScreen';

export default function Map(props) {
    const { allGyms, userLocation, setUserLocation, getLocation} = useData()
    const [loading, setLoading] = useState(true)
    const [allLocations, setAllLocations] = useState([])
    const [findLocation, setFindLocation] = useState(false)

    useEffect(() => {
        loadData()
    }, []);

    async function loadData() {
        setLoading(true)
        setFindLocation(true)
        constantUpdateLocation()
        try {
            setAllLocations(await allGyms());

        } catch (error) {
            console.error('error:', error);
        } finally {
            setLoading(false);  
        }
    }

    async function constantUpdateLocation() {
        let newLocation
        try {
            newLocation = await getLocation()
        } catch (error) {
            console.error('error', error)
        } finally {
            setUserLocation(newLocation)
            setTimeout(constantUpdateLocation, 30000)
        }
    }

    return (
        <View style={styles.container}>
            {loading? 
            <LoadingScreen/> :
            <MapDisplay
                setGymId={props.setGymId}
                allLocations={allLocations}
                loadData={loadData}
                userLocation={userLocation}
            />}
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
