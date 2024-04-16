import React, { useState, useEffect, useContext } from "react";
import { Box, Pressable, Flex, Heading, Button, useSafeArea, Spinner } from 'native-base'
import { Text, StyleSheet, View, Dimensions } from 'react-native'
import { Link } from "expo-router";
import { useData } from "../../../../../contexts/DatabaseContext";
import { context } from "../../../../_layout";

export default function GymOverlay(props) {

    const { findGym, userLocation } = useData()
    const [distance, setDistance] = useState()
    const [loading, setLoading] = useState(false)
    const { setBackButton, backButton, theme } = useContext(context)
    const [gymData, setGymData] = useState({
        address1: '',
        address2: '',
        city: '',
        description: '',
        gym_name: '',
        hours: {},
        id: '',
        latitude: '',
        longitude: '',
        location: '',
        state: '',
        zipcode: ''
    })

    async function gatherData() {
        try {
            setLoading(true)
            setGymData(await findGym(props.currentMarker.id))
            console.log(props.currentMarker)
        } finally {
            setLoading(false)
            if (props.currentMarker) setDistance(calcDistance(userLocation, props.currentMarker.coordinate))
        }
    }


    useEffect(() => {
        gatherData()
    }, [])

    useEffect(() => {
        gatherData()
    }, [props.currentMarker])

    function calcDistance(dist1, dist2) {
        console.log(dist1.latitude, dist2)
        var lat1 = dist1.latitude
        var lon1 = dist1.longitude
        var lat2 = dist2.latitude
        var lon2 = dist2.longitude

        var R = 6371; // km
        var dLat = toRad(lat2 - lat1);
        var dLon = toRad(lon2 - lon1);
        lat1 = toRad(lat1);
        lat2 = toRad(lat2);

        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;
        return d;
    }

    function toRad(deg) {
        return deg * (Math.PI / 180)
    }

    const font = StyleSheet.create({
        color: theme.font,
    })

    return (
        <>
            {loading && <Spinner size="lg" position={'absolute'} mt={240} ml={120}  color={theme.two}/>}
            {props.currentMarker && !loading && <View style={styles.view}>
                <Box
                    alignItems="center"
                >
                    <Box
                        bg={theme.four}
                        p="6"
                        rounded="8"
                        shadow={3}
                        borderColor="coolGray.300"
                        gap={3}
                        >
                        <Text style={{color: theme.font, fontSize: 35, fontWeight: 'bold'}}>
                            {gymData.gym_name}
                        </Text>
                        <Text
                            mt="2"
                            fontSize="sm"
                            style={{color: theme.font, fontSize: 20}}
                            bold
                            >
                            {gymData.city} , {gymData.state}
                        </Text>
                        <Text
                            mt="2"
                            fontSize="sm"
                            style={{color: theme.font, fontSize: 20}}
                            bold>
                            {distance ? `${distance.toFixed(1)} Km` : ''}
                        </Text>
                        <Button
                            size="md"
                            variant="link"
                            style={{backgroundColor: theme.three}}

                            onPress={() => {
                                props.setGymId(gymData.id)
                                setBackButton(backButton.concat([[props.setGymId, null]]))
                            }}
                        >
                            <Text style={{color: theme.font}}>
                                More Info
                            </Text>
                        </Button>
                    </Box>
                </Box>
            </View>}
        </>)
}
let screenHeight = (Dimensions.get('window').height / 1);
let screenWidth = (Dimensions.get('window').width)
const styles = StyleSheet.create({
    view: {
        position: 'absolute',
        paddingTop: screenHeight * .2,
        paddingLeft: screenWidth * .1,
        pointerEvents: 'auto'
    }
})