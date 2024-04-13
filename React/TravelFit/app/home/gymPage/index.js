import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { Heading, Flex, Box, Button, Link, theme, ScrollView } from 'native-base'

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
    const { findGym, gymPassOptionsById, setIconPress } = useData()
    const { removeBackground, darkStyle, theme, setBackButton } = useContext(context)
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
        const {darkMode} = useContext(context)
        const infoStyles = StyleSheet.create({
            section: {
                borderBottomColor: theme.font,
                borderBottomWidth: 1,
                paddingBottom: 2,
                paddingRight: 5,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                gap: 10
            },
            container: {
                display: 'flex',
                gap: 4,
                marginTop: 20,
                marginRight: 20,
                marginLeft: 10,
                padding: 7,
                borderColor: 'black',
                borderWidth: 1,
                borderRadius: 5,
                backgroundColor: theme.two
            },
            gymName: {
                fontSize: 24,
                color: theme.font,
                fontWeight: 'bold',
                marginBottom: 10,
                textAlign: 'center',
            },
            font: {
                color: theme.font,
            },
            hoursFont: {
                color: darkStyle ? '#fff' : theme.font, 
            },
        })

        const formatHours = (hours) => {
            return Object.entries(hours).map(([day, hours]) => `${day}: ${hours}`).join('\n')
        }
        //add info here
        const infoData = {
            'City': gymData.city,
            'State': gymData.state,
            'Description': gymData.description,
            'Address': gymData.address1
        }
        console.log(gymData.hours_of_operation)

        return (
            <>
                <Text style={infoStyles.gymName}>{gymData.gym_name}</Text>
                <SlideShow />
                <ScrollView>
                    <Box style={[infoStyles.container]} shadow={3}>
                        {gymData.hours_of_operation && 
                            <View style={infoStyles.section}>
                                <Text style={[infoStyles.font, infoStyles.hoursFont]}>Hours:</Text> 
                                <View style={{display: 'flex', gap: 1}}>
                                {Object.entries(gymData.hours_of_operation).map(([data, hours], index) => (
                                    <View style={{display: 'flex', flexDirection: 'row', gap: 12, justifyContent: 'space-between'}}>
                                        <Text style={infoStyles.hoursFont}>{data}:</Text> 
                                        <Text style={infoStyles.hoursFont}>{hours}</Text> 
                                    </View>
                                ))}
                                </View>
                            </View>
                        }
                        {Object.keys(infoData).map((keyName, i) => (
                            <View style={infoStyles.section}>
                                <Text style={infoStyles.font}>
                                    {keyName}: 
                                </Text>
                                <Text style={[infoStyles.font, {width: keyName == 'Description'? 270 : null}]}>
                                    {infoData[keyName]}
                                </Text>
                            </View>
                        ))}
                    </Box>
                </ScrollView>
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
                                                        setBackButton([['route', '/home']])
                                                        setIconPress({
                                                            'Home': true,
                                                            'Profile': false,
                                                            'Map': false,
                                                            'Pass': false
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
                    }} style={[styles.tabButton, showInfo && styles.activeTabButton]} rounded={true}>
                    <Text style={styles.font}>
                        Info
                    </Text>
                </Button>
                <View style={{marginLeft: 10, marginRight: 10}}></View>
                <Button title="Pass Options"
                    onPress={() => {
                        setShowInfo(false)
                        setShowPassOptions(true)
                    }} style={[styles.tabButton, showPassOptions && styles.activeTabButton]}rounded={true}>
                    <Text style={styles.font}>
                        Pass Options
                    </Text>
                </Button>
            </View>
        )
    }

    function SlideShow() {
        const { photos } = gymData
        return (
            <Box style={styles.sliderbox} shadow={3}>
                <SliderBox
                    images={photos}
                    imageComponentStyle={{
                        paddingRight: 20,
                        marginRight: 20,
                        width: 100
                    }}
                />
            </Box>
        )
    }

    let styles = StyleSheet.create({
        display: {
            position: 'absolute',
            height: '120%',
            width: '110%',
            backgroundColor: '',
            paddingTop: 90,
            paddingBottom: 90,
            backgroundColor: theme.four
        },
        buttons: {
            marginTop: 30,
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 30,
            paddingLeft: 20,
            paddingRight: 20,
        },
        passes: {
            display: 'flex',
            gap: 10
        },
        sliderbox: {
            flex: 0,
            borderWidth: 1,
            margin: 5,
            marginRight: 15
        },
        tabButton: {
            flex: 1,
            backgroundColor: '#ccc',
            borderWidth: 1,
            borderColor: '#ccc',
            color: theme.font,
            borderColor: theme.two,
            borderRadius: 10,

        },
        activeTabButton: {
            backgroundColor: theme.one,
            color: theme.one,
        },
        font: {
            color: theme.font
        }
    })

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


