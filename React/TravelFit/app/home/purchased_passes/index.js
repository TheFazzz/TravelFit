import React, { useState, useEffect, useContext } from 'react'
import { View, StyleSheet, Text, Pressable, Platform, Linking } from 'react-native'
import { Heading, Flex, Box, Button, Link, ScrollView } from 'native-base'
import { useAuth } from '../../../contexts/AuthContext'
import LoadingScreen from '../../layout/LoadingScreen'
import { useRouter, useLocalSearchParams } from 'expo-router'
import Index from '../gymPage'
import { context } from '../../_layout'
import QRCode from './qrCode'
import { useFonts } from 'expo-font'

export default function index() {
    const router = useRouter()
    const query = useLocalSearchParams()

    const [passes, setPasses] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const { userPasses, currentUser } = useAuth()
    const { removeBackground, backButton, setBackButton, setFooter, darkStyle, theme } = useContext(context)

    const [gymId, setGymId] = useState(null)
    const [qrCodePage, setQrCodePage] = useState(null)
    const [loaded, setLoaded] = useState(false)

    const [fontsLoaded, fontError] = useFonts({
        'CREDC': require('../../../assets/fonts/CREDC.ttf'),
        'Merriweather-Bold': require('../../../assets/fonts/Merriweather-Bold.ttf')
    })

    async function loadData() {
        setLoading(true)
        try {
            setPasses(await userPasses())
        } catch (error) {
            setPasses([])
            setError(error)
            console.error(error)
        } finally {
            setLoading(false)
            setLoaded(true)
            console.log(passes)
        }
    }

    useEffect(() => {
        const {back} = query
        if (back) setBackButton([['route', back]])

        if (!loaded) loadData()
        removeBackground()
        setFooter(true)
    }, [])
    
    useEffect(() => {
        if (!qrCodePage) {
            removeBackground()
            setFooter(true)
        }
    }, [qrCodePage])

    function openGPS(lat, lng, gym_name) {
        const scheme = Platform.select({ ios: 'maps://0,0?q=', android: 'geo:0,0?q=' });
        const latLng = `${lat},${lng}`;
        const label = gym_name;
        const url = Platform.select({
            ios: `${scheme}${label}@${latLng}`,
            android: `${scheme}${latLng}(${label})`
        });
        Linking.openURL(url);
    }

    function Pass(props) {
        const pass = StyleSheet.create({ 
            font: {
                color: theme.font,
            },
            link: {
                borderColor: 'black',
                borderWidth: 1,
                shadowColor: 'black',
                backgroundColor: theme.four,
                padding: 2,
            }  
        })

        const { description, gym_name, id, qr_code, city, pass_name, latitude, longitude, gym_id, duration_days, is_valid } = props.data
        return (
            <View>
                <Box alignItems="center">
                    <Pressable maxW="96">
                        {({ isHovered, isPressed }) => {
                            return (
                                <Box
                                    bg={theme.one}
                                    style={{ transform: [{ scale: isPressed ? 0.96 : 1 }] }} w={400}
                                    p="5" rounded="8" shadow={3} borderWidth="1" borderColor={theme.two}> 
                                    <View style={{ display: 'flex', flexDirection: 'row', gap: 30 }}>
                                        <View style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
                                            <Heading style={{color: theme.font}}>
                                                {gym_name}, {city}
                                            </Heading>
                                            <Text mt="2" fontSize="sm" style={{color: theme.font}} bold>
                                                {description}
                                            </Text>
                                            <Text mt="0" fontSize={12} fontWeight="medium" p="0">
                                                <Link style={{ display: 'flex', gap: 8 }}>
                                                    <Box shadow={3}>
                                                        <Button style={pass.link}
                                                            onPress={() => {
                                                                setQrCodePage({
                                                                    image: qr_code,
                                                                    pass_name: pass_name,
                                                                    gym_name: gym_name,
                                                                    city: city
                                                                })
                                                            }}>
                                                            <Text style={[pass.font]}>
                                                                QR Code
                                                            </Text>
                                                        </Button>
                                                    </Box>
                                                    <Box shadow={3}>
                                                        <Button style={pass.link}
                                                            onPress={() => {
                                                                openGPS(latitude, longitude, gym_name)
                                                            }}>
                                                            <Text style={[pass.font]}>
                                                                Directions
                                                            </Text>
                                                        </Button>
                                                    </Box>
                                                    <Box shadow={3}>
                                                        <Button style={pass.link}
                                                            onPress={() => {
                                                                setGymId(gym_id)
                                                                setBackButton(backButton.concat([[setGymId, null]]))
                                                            }}>
                                                            <Text style={[pass.font]}>
                                                                Gym Info
                                                            </Text>
                                                        </Button>
                                                    </Box>

                                                </Link>
                                            </Text>
                                        </View>
                                        <View>
                                            <Text style={pass.font}>{duration_days} days</Text>
                                            {is_valid && <Text style={pass.font}>Activated</Text>}
                                        </View>
                                    </View>
                                </Box>
                            )
                        }}
                    </Pressable>
                </Box>
            </View>
        )
    }

    function Passes() {
        return (
            <View style={styles.passes}>
                {passes.map((data, index) => (
                    <Pass data={data} />
                ))}
            </View>
        )
    }


    const styles = StyleSheet.create({
        view: {

        },
        passes: {
            paddingTop: 30,
            display: 'flex',
            gap: 15
        },
        headingContainer: {
            borderColor: theme.two,
            borderWidth: 1,
            borderRadius: 6,
            paddingTop: 10,
            paddingBottom: 10,
            backgroundColor: theme.one,
            marginTop: 20,
            shadowColor: 'black',
            shadowRadius: 10,
            shadowOffset: {width: 10, height: 10},
        },
        heading: {
            color: theme.font,
            paddingLeft: 13,
            fontSize: 25,
            fontFamily: 'Merriweather-Bold'
        }
    })

    return (
        <>
            {qrCodePage ?
                <QRCode params={qrCodePage} setQrCodePage={setQrCodePage} />
                :
                !loading ?
                    <View style={styles.view}>
                        <ScrollView>
                        <Box style={styles.headingContainer} shadow={1}>
                            <Text style={styles.heading}>
                                Current Passes for {currentUser.firstName}
                            </Text>
                        </Box>
                        {passes.length == 0 ?
                            <Text>
                                No passes.
                            </Text>
                            :
                            <Passes />
                        }
                        </ScrollView>
                    </View>
                    :
                    <LoadingScreen />
            }
            {gymId && <Index value={gymId} setGymId={setGymId} />}
        </>
    )
}

