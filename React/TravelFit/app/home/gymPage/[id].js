import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { Heading, Flex, Box, Button, Link } from 'native-base'

import { router, useLocalSearchParams } from 'expo-router';
import locationData from '../map/location/locationData';
import { useData } from '../../../contexts/DatabaseContext';
import LoadingScreen from '../../layout/LoadingScreen';
import { useRouter } from 'expo-router';


export default function Index(props) {
    const query = useLocalSearchParams()
    const router = useRouter()
    const { findGym, gymPassOptionsById } = useData()
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

    const [showInfo, setShowInfo] = useState(true)
    const [showPassOptions, setShowPassOptions] = useState(false)
    const [passOption, setPassOptions] = useState([])

    async function gatherData(id) {
        setLoading(true)
        try {
            setGymData(await findGym(id))
            setPassOptions(await gymPassOptionsById(id))
        } catch (error) {
            console.log(error)
        } finally {
            console.log(passOption)
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

    useEffect(() => { console.log(gymData) }, [gymData])

    function Info() {
        return (
            <View style={styles.infoContainer}>
                <Text>City: {gymData.city}</Text>
                <Text>State: {gymData.state}</Text>
                <Text>Gym Name: {gymData.gym_name}</Text>
                <Text>Description: {gymData.description}</Text>
            </View>
        )
    }

    function Passes() {
        return (
            <View>
                <View style={styles.passes}>
                    {passOption.map((data, index) => (
                        <Pass data={data}/>
                    ))}
                </View>
            </View>
        )
    }

    function Pass(props) {
        const { data } = props
        return (
            <View>
                <Box alignItems="center">
                <Pressable maxW="96">
                    {({ isHovered, isPressed }) => {
                    return (
                    <Box
                        bg={isPressed ? "coolGray.200" : isHovered ? "coolGray.200" : "coolGray.100"}
                        style={{ transform: [{ scale: isPressed ? 0.96 : 1 }] }} w={400} pl={70}
                        p="5" rounded="8" shadow={3} borderWidth="1" borderColor="coolGray.300">
                        <Heading>
                            {data.pass_name} - ${data.price}
                        </Heading>
                        <Text mt="2" fontSize="sm" color="coolGray.700" bold>
                            {data.description}
                        </Text>                                    
                        <Flex>
                        <Text mt="0" fontSize={12} fontWeight="medium" color="darkBlue.600" p="2">
                            <Link href="https://google.com">
                                <Button size="md" variant="link" p={-3}
                                    onPress={() => {
                                        router.replace({
                                            pathname: '/purchase/purchaseScreen',
                                            params: {
                                                city: gymData.city,
                                                gym_name: gymData.gym_name,
                                                gym_id: gymData.id,
                                                pass_id: data.id,
                                                pass_name: data.pass_name,
                                                pass_description: data.description,
                                                pass_price: data.price
                                            }
                                        })
                                }}>
                                    Order Pass
                                </Button>
                            </Link>
                        </Text>
                        </Flex>
                    </Box>
                    )}}
                </Pressable>
                </Box>
            </View>
        )
    }

    function Tabs() {
        return (
            <View style={styles.buttons}>
                <Button title="Info"
                    onPress={() => {
                        setShowInfo(true)
                        setShowPassOptions(false)
                    }} >Info</Button>
                <Button title="Pass Options"
                    onPress={() => {
                        setShowInfo(false)
                        setShowPassOptions(true)
                    }}>Pass Options</Button>
            </View>
        )
    }

    return (
        <View style={styles.display}>
            {!loading &&
                <>
                    <Button onPress={() => { props.setGymId(null) }}>
                        Back
                    </Button>
                    <Tabs />
                    {showInfo && <Info />}
                    {showPassOptions && <Passes />}
                </>}
            {loading && <LoadingScreen />}
        </View>
    )
}

let styles = StyleSheet.create({
    display: {
        position: 'absolute',
        height: '100%',
        width: '110%',
        backgroundColor: 'aqua',
    },
    buttons: {
        display: 'flex',
        gap: 30,
        marginTop: 30,
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 30
    },
    passes: {
        display: 'flex',
        gap: 10
    }
})