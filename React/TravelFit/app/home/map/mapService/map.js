import React, { useState, useEffect, useContext } from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import MapDisplay from './mapdisplay';
import { useData } from '../../../../contexts/DatabaseContext';
import LoadingScreen from '../../../layout/LoadingScreen';
import { context } from '../../../_layout';

export default function Map(props) {

    const { 
        allGyms, 
        nearbyGyms,
        userLocation, 
        setUserLocation, 
        getLocation,
        searchPreference,
        perferedCity
    } = useData()

    const {darkStyle} = useContext(context)

    const [loading, setLoading] = useState(true)
    const [first, setFirst] = useState(true)
    const [reload, setReload] = useState(false)
    const [allLocations, setAllLocations] = useState([])
    const [findLocation, setFindLocation] = useState(false)

    useEffect(() => {
        loadData(false)
    }, []);

    useEffect(() => {
        if (!first) loadData(true)
    }, [searchPreference, perferedCity])

    async function loadData(reload) {
        if (!reload) setLoading(true)
        if (reload) setReload(true)
        setFindLocation(true)
        constantUpdateLocation()
        try {
            if (searchPreference == 'ByCity') setAllLocations(await allGyms());
            if (searchPreference == 'ByLocation') setAllLocations(await nearbyGyms())
        } catch (error) {
            console.error('error:', error);
        } finally {
            setFirst(false)
            setLoading(false);
            setReload(false)  
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
            {reload && 
                <View style={styles.loading}>
                    <LoadingScreen/>
                </View>
            }
            {loading? 
            <LoadingScreen/> :
            <MapDisplay
                setGymId={props.setGymId}
                allLocations={allLocations}
                loadData={loadData}
                userLocation={userLocation}
                darkStyle={darkStyle}
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
    },
    loading: {
        position: 'absolute'
    }
})
