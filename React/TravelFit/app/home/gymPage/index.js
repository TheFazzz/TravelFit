import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { Heading, Flex, Box, Button, Link, theme, ScrollView, IconButton, Icon } from 'native-base'

import { router, useLocalSearchParams } from 'expo-router';
import locationData from '../map/location/locationData';
import { useData } from '../../../contexts/DatabaseContext';
import LoadingScreen from '../../layout/LoadingScreen';
import { useRouter } from 'expo-router';

import { SliderBox } from "react-native-image-slider-box";
import { context } from '../../_layout';
import { useAuth } from '../../../contexts/AuthContext';

import { MaterialCommunityIcons} from '@expo/vector-icons'


export default function Index(props) {
    const query = useLocalSearchParams()
    const router = useRouter()
    const { userAddFavoriteGym, userRemoveFavoriteGym, favoriteGyms } = useAuth()
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

    const [favorite, setFavorite] = useState(false)
    const [favoriteLoading, setFavoriteLoading] = useState(false)

    async function gatherData(id) {
        setLoading(true)
        try {
            setFavorite(favoriteGyms.some(subArray => subArray[0] == id))
            setGymData(await findGym(id))
            setPassOptions(await gymPassOptionsById(id))
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    async function handleFavorite() {
        if (!favorite) {
            setFavoriteLoading(true)
            try {
                await userAddFavoriteGym(gymData.id, gymData.gym_name)
                setFavorite(prevState => (!prevState))
            } catch (error){
                console.error(error)
            } finally {
                setFavoriteLoading(false)
            }
        } else {
            try {
                await userRemoveFavoriteGym(gymData.id)
                setFavorite(prevState => (!prevState))
            } catch (error){
                console.error(error)
            } finally {
                setFavoriteLoading(false)
            }
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


    function Info() {
        const { darkMode } = useContext(context)
        const infoStyles = StyleSheet.create({
            section: {
                borderBottomColor: theme.font,
                borderBottomWidth: 1,
                paddingBottom: 2,
                paddingRight: 5,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                gap: 10,
            },
            container: {
                display: 'flex',
                gap: 4,
                marginTop: 20,
                marginRight: 20,
                marginLeft: 10,
                marginBottom: 265,
                padding: 7,

                borderRadius: 5,
                backgroundColor: theme.two,
            },
            gymName: {
                paddingTop: 7,
                fontSize: 28,
                color: theme.font,
                fontWeight: 'bold',
                marginBottom: 10,
                textAlign: 'center',
                shadowColor: 'black',
                shadowOpacity: 0.1,
            },
            font: {
                color: theme.font,
                fontSize: 16
            },
            hoursFont: {
                color: darkStyle ? '#fff' : theme.font,
            },
            gymNameContainer: {
                backgroundColor: theme.three,
                borderRadius: 5,
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
                padding: 10,
                marginLeft: 20,
                marginRight: 20
            }
        })

        const formatHours = (hours) => {
            return Object.entries(hours).map(([day, hours]) => `${day}: ${hours}`).join('\n')
        }
        //add info here
        const infoData = {
            'City': gymData.city,
            'State': gymData.state,
            'Address': gymData.address1,
        }

        return (
            <>
                <Box shadow={3} style={infoStyles.gymNameContainer} flexDirection={'row'} >
                    <IconButton
                        icon={
                            favorite?
                            <Icon as={MaterialCommunityIcons} name='cards-heart' size='8' />
                            :
                            <Icon as={MaterialCommunityIcons} name='cards-heart-outline' size='8' />
                        }
                        onPress={() => {
                            handleFavorite()
                        }}
                        style={''}
                        disabled={favoriteLoading}
                        shadow={3}
                    />
                    <Text style={infoStyles.gymName}>{gymData.gym_name}, {gymData.city}</Text>
                </Box>
                <SlideShow />
                <Box style={[infoStyles.container]} shadow={3}>
                    <ScrollView>
                        {gymData.hours_of_operation &&
                            <View style={infoStyles.section}>
                                <Text style={[infoStyles.font, infoStyles.hoursFont]}>Hours:</Text>
                                <View style={{ display: 'flex', gap: 1 }}>
                                    {Object.entries(gymData.hours_of_operation).map(([data, hours], index) => (
                                        <View style={{ display: 'flex', flexDirection: 'row', gap: 12, justifyContent: 'space-between' }}>
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
                                <Text style={[infoStyles.font, { width: keyName == 'Description' ? 270 : null }]}>
                                    {infoData[keyName]}
                                </Text>
                            </View>
                        ))}
                        {gymData.description &&
                            <View style={infoStyles.section}>
                                <Text style={infoStyles.font}>
                                    {gymData.description}
                                </Text>
                            </View>
                        }
                    </ScrollView>
                </Box>
            </>
        )
    }

    function Passes() {
        return (
            <ScrollView>
                <View>
                    <View style={styles.passes}>
                        {passOption.map((data, index) => (
                            <Pass data={data} />
                        ))}
                    </View>
                </View>
            </ScrollView>
        )
    }

    function Pass(props) {
        const { data } = props
        const pass = StyleSheet.create({
            font: {
                color: theme.font
            }
        })

        return (
            <View>
                <Box alignItems="center">
                    <Box bg={theme.two} w={400} pl={10} p="3" rounded="8" shadow={3} >
                        <Flex flexDirection={'row'} justifyContent={'space-between'}>
                            <Box gap={1}>
                                <Heading style={pass.font}>
                                    {data.pass_name}
                                </Heading>
                                <Text mt="2" fontSize="sm" color="coolGray.700" bold style={pass.font}>
                                    {data.description}
                                </Text>
                                <Button backgroundColor={theme.three} shadow={1} paddingTop={1} marginTop={3}
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
                                    <Text style={{ color: theme.font }}>
                                        Order Pass
                                    </Text>
                                </Button>
                            </Box>
                            <Box
                                bgColor={theme.one}
                                style={{
                                    padding: 23,
                                    width: 125
                                }}
                                shadow={1}
                                borderColor={theme.three}
                            >
                                <Text style={{
                                    color: theme.font,
                                    fontSize: 40,
                                    fontFamily: 'Rowdies',
                                    shadowColor: 'black',
                                    shadowOpacity: 0.1
                                }}
                                >
                                    ${data.price}
                                </Text>
                            </Box>
                        </Flex>
                    </Box>
                </Box>
            </View>
        )
    }

    function Tabs() {
        const override = 140
        const tabs = StyleSheet.create({
            container: {
                width: '98%',
                position: 'absolute',
                backgroundColor: theme.two,
                top: -override / 2,
                paddingTop: override,
                paddingBottom: 20,
                borderBottomRightRadius: 10,
                borderBottomLeftRadius: 10
            }
        })

        return (
            <Box style={[styles.buttons, tabs.container]} shadow={3}>
                <Button title="Info"
                    onPress={() => {
                        setShowInfo(true)
                        setShowPassOptions(false)
                    }} style={[styles.tabButton, showInfo && styles.activeTabButton]} rounded={true}>
                    <Text style={[styles.font, { fontSize: showInfo ? 25 : 19 }]}>
                        Info
                    </Text>
                </Button>
                <View style={{ marginLeft: 10, marginRight: 10 }}></View>
                <Button title="Pass Options"
                    onPress={() => {
                        setShowInfo(false)
                        setShowPassOptions(true)
                    }} style={[styles.tabButton, showPassOptions && styles.activeTabButton]} rounded={true}>
                    <Text style={[styles.font, { fontSize: showPassOptions ? 25 : 19 }]}>
                        Pass Options
                    </Text>
                </Button>
            </Box>
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
            paddingTop: 190,
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
            gap: 20
        },
        sliderbox: {
            flex: 0,
            margin: 5,
            marginRight: 15,
            marginTop: 0
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
            color: theme.font,
            fontFamily: 'Jersey15',

        }
    })

    return (
        <>
            {!loading &&
                <View style={styles.display}>
                    <Tabs />
                    {showInfo && <Info />}
                    {showPassOptions && <Passes />}
                </View>
            }
            {loading && <LoadingScreen />}
        </>
    )
}


