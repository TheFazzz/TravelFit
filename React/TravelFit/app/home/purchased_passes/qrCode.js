import React, { useContext, useEffect } from "react";
import { View, Text, Image, StyleSheet } from 'react-native'
import { Heading, Box } from 'native-base'
import { useLocalSearchParams } from "expo-router";
import { context } from "../../_layout";
import { useFonts } from 'expo-font'


export default function QRCode(props) {
    const query = useLocalSearchParams()

    const { image, pass_name, gym_name, city } = props.params
    const { setQrCodePage } = props
    const { setQr, setBackButton, backButton, setFooter, theme } = useContext(context)

    const [fontsLoaded, fontError] = useFonts({
        'Rowdies': require('../../../assets/fonts/Rowdies-Regular.ttf'),
        'RobotoSlab': require('../../../assets/fonts/RobotoSlab.ttf')
      })

    useEffect(() => {
        setQr(true)
        setFooter(false)
        setBackButton(backButton.concat([[setQrCodePage, null]]))
    }, [])

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

    return (
        <>
            <Box style={styles.container} shadow={3}>
                <Text style={styles.text}>
                    {pass_name} - {gym_name}
                </Text>
                <Box style={styles.ImageContainer}>
                    <Image style={styles.image} source={{ uri: image }} />
                </Box>
                <Text style={styles.text}>
                    Scan QR Code at Front Desk
                </Text>
                <Text style={styles.text}>
                    {gym_name}, {city} 
                </Text>
            </Box>
        </>
    )
}

