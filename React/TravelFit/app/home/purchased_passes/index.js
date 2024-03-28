import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Text, Pressable, Platform, Linking } from 'react-native'
import { Heading, Flex, Box, Button, Link } from 'native-base'
import { useAuth } from '../../../contexts/AuthContext'
import LoadingScreen from '../../layout/LoadingScreen'
import { useRouter } from 'expo-router'
import Index from '../gymPage/[id]'

export default function index() {
    const router = useRouter()
    const [passes, setPasses] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const { userPasses, currentUser } = useAuth()

    const [gymId, setGymId] = useState(null)


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
            console.log(passes)
        }
    }

    useEffect(() => {
        loadData()
    }, [])

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
        const { description, gym_name, id, qr_code, city, pass_name, latitude, longitude , gym_id, duration_days, is_valid} = props.data
        return (
            <View>
                <Box alignItems="center">
                    <Pressable maxW="96">
                        {({ isHovered, isPressed }) => {
                            return (
                                <Box
                                    bg={isPressed ? "coolGray.200" : isHovered ? "coolGray.200" : "coolGray.100"}
                                    style={{ transform: [{ scale: isPressed ? 0.96 : 1 }] }} w={400} 
                                    p="5" rounded="8" shadow={3} borderWidth="1" borderColor="coolGray.300">
                                    <View style={{display: 'flex', flexDirection: 'row', gap: 30}}>
                                        <View>
                                            <Heading>
                                                {gym_name}, {city}
                                            </Heading>
                                            <Text mt="2" fontSize="sm" color="coolGray.700" bold>
                                                {description}
                                            </Text>
                                            <Text mt="0" fontSize={12} fontWeight="medium" color="darkBlue.600" p="0">
                                                <Link style={{ display: 'flex', gap: 8 }}>
                                                    <Button size="md" variant="link" p={-3}
                                                        onPress={() => {
                                                            router.replace({
                                                                pathname: '/home/purchased_passes/qrCode',
                                                                params: {
                                                                    image: qr_code,
                                                                    pass_name: pass_name,
                                                                    gym_name: gym_name,
                                                                }
                                                            })
                                                        }}>
                                                        QR Code
                                                    </Button>
                                                    <Button size="md" variant="link" p={-3}
                                                        onPress={() => {
                                                            openGPS(latitude, longitude, gym_name)
                                                        }}>
                                                        Directions
                                                    </Button>
                                                    <Button size="md" variant="link" p={-3}
                                                        onPress={() => {
                                                            setGymId(gym_id)
                                                        }}>
                                                        Gym Info
                                                    </Button>
                                                </Link>
                                            </Text>
                                        </View>
                                        <View>
                                            <Text>{duration_days} days</Text>
                                            {is_valid && <Text>Activated</Text>}
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

    return (
        <>
            {!loading ?
                <View style={styles.view}>
                    <Heading style={styles.heading} size="lg" mb={1} p={4} pl={9}>
                        Current Passes for {currentUser.firstName}
                    </Heading>
                    {passes.length == 0 ?
                        <Text>
                            No passes.
                        </Text>
                        :
                        <Passes />
                    }
                </View>
                :
                <LoadingScreen />}
                {gymId && <Index value={gymId} setGymId={setGymId}/>}
        </>
    )
}

const styles = StyleSheet.create({
    view: {

    },
    passes: {
        paddingTop: 30,
        display: 'flex',
        gap: 15
    }
})
