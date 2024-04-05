import React, { useContext, useEffect } from "react";
import { View, Text, Image, StyleSheet } from 'react-native'
import { Heading } from 'native-base'
import { useLocalSearchParams } from "expo-router";
import { context } from "../../_layout";
import { useFonts } from 'expo-font'


export default function QRCode(props) {
    const query = useLocalSearchParams()

    const { image, pass_name, gym_name, city } = props.params
    const { setQrCodePage } = props
    const { setQr, setBackButton, backButton, setFooter } = useContext(context)

    const [fontsLoaded, fontError] = useFonts({
        'Rowdies': require('../../../assets/fonts/Rowdies-Regular.ttf'),
        'RobotoSlab': require('../../../assets/fonts/RobotoSlab.ttf')
      })

    useEffect(() => {
        setQr(true)
        setFooter(false)
        setBackButton(backButton.concat([[setQrCodePage, null]]))
    }, [])

    return (
        <>
            <View style={styles.container}>
                <Text style={styles.text}>
                    {pass_name} - {gym_name}
                </Text>
                <View style={styles.ImageContainer}>
                    <Image style={styles.image} source={{ uri: image }} />
                </View>
                <Text style={styles.text}>
                    Scan QR Code at Front Desk
                </Text>
                <Text style={styles.text}>
                    {gym_name}, {city} 
                </Text>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    ImageContainer: {
        paddingTop: 80,
        padding: 50,
    },
    image: {
        width: 280,
        height: 280,
        borderWidth: 5,
        borderColor: 'black',
        borderStyle: 'solid'
    },
    container: {
        paddingTop: 80,
        width: '100%',
        display: 'flex',
        gap: 5,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 29,
        fontFamily: 'RobotoSlab'
    }
})