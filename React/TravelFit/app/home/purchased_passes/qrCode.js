import React, { useEffect } from "react";
import {View, Text, Image, StyleSheet} from 'react-native'
import { Heading } from 'native-base'
import { useLocalSearchParams } from "expo-router";

export default function index() {
    const query = useLocalSearchParams()
    const {image, pass_name, gym_name} = query

    useEffect(() => {
        console.log(image)
    }, [])

    return (
        <View>
            <Heading style={styles.heading} size="lg" mb={6} p={7} pl={9}>
                {pass_name} - {gym_name}
            </Heading>
            <View style={styles.ImageContainer}>
                <Image style={{ width: 400, height: 400 }} source={{uri: image}}/>
            </View>
            <Heading style={styles.heading} size="lg" mb={6} p={7} pl={9}>
                Expiration: *insert date here*
            </Heading>
        </View>
    )
}

const styles = StyleSheet.create({
    ImageContainer: {
        
    },
    heading: {
        
    }
})