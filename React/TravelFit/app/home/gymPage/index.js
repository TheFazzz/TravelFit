import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { Heading, Flex, Box, Button, Link } from 'native-base'

import { router, useLocalSearchParams } from 'expo-router';
import locationData from '../map/location/locationData';
import { useData } from '../../../contexts/DatabaseContext';
import LoadingScreen from '../../layout/LoadingScreen';
import { useRouter } from 'expo-router';

import { SliderBox } from "react-native-image-slider-box";
import { context } from '../../_layout';


export default function Index(props) {
    const query = useLocalSearchParams()
    const router = useRouter()
    const { findGym, gymPassOptionsById } = useData()
    const { removeBackground } = useContext(context)
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
        removeBackground()

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
        const infoStyles = StyleSheet.create({
            section: {
                borderBottomColor: 'black',
                borderBottomWidth: 1,
                paddingBottom: 2,
            },
            container: {
                display: 'flex',
                gap: 3,
                paddingTop: 20,
                paddingLeft: 20,
                marginRight: 30,
            },
            gymName: {
                fontSize: 24,
                fontWeight: 'bold',
                marginBottom: 10,
                textAlign: 'center',
            },
        })
        const formatHours = (hours) => {
            return Object.entries(hours).map(([day, hours]) => `${day}: ${hours}`).join('\n')
        }
        //add info here
        const infoData = {
            'Hours': formatHours(gymData.hours_of_operation),
            'City': gymData.city,
            'State': gymData.state,
            'Description': gymData.description,
            'Address': gymData.address1
        }
        return (
            <>
                <Text style={infoStyles.gymName}>{gymData.gym_name}</Text>
                <SlideShow />
                <View style={infoStyles.container}>
                    {Object.keys(infoData).map((keyName, i) => (
                        <View style={infoStyles.section}>
                            <Text>{keyName}: {infoData[keyName]}</Text>
                        </View>
                    ))}
                </View>
            </>
        )
    }

    function Passes() {
        return (
            <View>
                <View style={styles.passes}>
                    {passOption.map((data, index) => (
                        <Pass data={data} />
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
                            )
                        }}
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

    function SlideShow() {
        const { photos } = gymData
        return (
            <View style={styles.sliderbox}>
                <SliderBox
                    images={photos}
                />
            </View>
        )
    }

    return (
        <View style={styles.display}>
            {!loading &&
                <>
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
        height: '120%',
        width: '110%',
        backgroundColor: 'white',
        paddingTop: 90,
        paddingBottom: 90
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
    },
    sliderbox: {
        flex: 0,
    }
})
