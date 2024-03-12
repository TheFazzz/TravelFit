import React, { useState, useEffect } from "react";
import { Box, Pressable, Flex, Heading, Button, useSafeArea, Spinner } from 'native-base'
import { Text, StyleSheet, View, Dimensions } from 'react-native'
import { Link } from "expo-router";
import { useData } from "../../../../../contexts/DatabaseContext";

export default function GymOverlay(props) {

    const { findGym } = useData()
    const [loading, setLoading] = useState(false)
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

    async function gatherData() {
        try {
            setLoading(true)
            setGymData(await findGym(props.currentMarker.id))
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        gatherData()
    }, [])

    useEffect(() => {
        gatherData()
    }, [props.currentMarker])

    return (
        <>
            {loading && <Spinner size="lg" position={'absolute'} mt={240} ml={120}/>}
            {props.currentMarker && !loading && <View style={styles.view}>
                <Box
                    alignItems="center"
                >
                    <Pressable maxW="96">
                        {({ isHovered, isFocused, isPressed }) => {
                            return (
                                <Box
                                    bg={"coolGray.100"}
                                    p="5"
                                    rounded="8"
                                    shadow={3}
                                    borderWidth="1"
                                    borderColor="coolGray.300">
                                    <Heading>
                                        {gymData.gym_name}
                                    </Heading>
                                    <Text
                                        mt="2"
                                        fontSize="sm"
                                        color="coolGray.700"
                                        bold>
                                        {gymData.city} , {gymData.state}
                                    </Text>
                                    <Flex>
                                        {isFocused ?
                                            <Text
                                                mt="2"
                                                fontSize={12}
                                                fontWeight="medium"
                                                textDecorationLine="underline"
                                                color="darkBlue.600"
                                                alignSelf="flex-start">
                                                3 passes
                                            </Text>
                                            :
                                            <Text
                                                mt="0"
                                                fontSize={12}
                                                fontWeight="medium"
                                                color="darkBlue.600"
                                                p="2">

                                                <Button 
                                                    size="md" 
                                                    variant="link"
                                                    onPress={() => props.setGymId(gymData.id)}
                                                    >
                                                    More Info
                                                </Button>

                                            </Text>
                                        }
                                    </Flex>
                                </Box>
                            )
                        }}
                    </Pressable>
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