// import { baseFontSize } from 'native-base/lib/typescript/theme/tools';
import React from 'react'
import { StyleSheet, Text, View, Image, TextInput } from 'react-native';
// import { styles } from '../../styles';
import SelectDropdown from 'react-native-select-dropdown';
import { Slider, Box, Button } from 'native-base';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { useData } from '../../../contexts/DatabaseContext';

export default function profile() {
    // var Select = require('react-select')
    const gender = ['Male', 'Female']
    const router = useRouter()
    const [value, setValue] = React.useState(10);

    const [onChangeValue, setOnChangeValue] = React.useState(10);
    const [onChangeEndValue, setOnChangeEndValue] = React.useState(10);
    const {raidiusPreferenceMeters, setRadiusPreferenceMeters} = useData()

    

    // const changeValue = (event, value) => {
    //     setValue(value);
    // }

    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 50 }}>My Profile</Text>
            <Image style={styles.imageSize} source={require('../../../assets/pfp-image.png')}></Image>

            <Text>
                this is profile pag
            </Text>
            <View style={{ flexDirection: 'row', margin: 20 }}>
                <Text style={{ paddingTop: 5, paddingRight: 10 }}>Age:</Text>
                <TextInput type style={styles.textInput}></TextInput>
            </View>

            <View style={{ flexDirection: 'row', margin: 20 }}>
                <Text style={{ paddingTop: 15, paddingRight: 10 }}>Gender:</Text>
                <SelectDropdown style={styles.dropDown} data={gender} defaultButtonText='Select Gender'></SelectDropdown>
            </View>

            <View style={{ flexDirection: 'row', margin: 20 }}>
                <Text style={{ paddingTop: 10, paddingRight: 10 }} nativeID='slider'>Radius Preference:</Text>
                <Text style={{ paddingTop: 10 }}>{raidiusPreferenceMeters} Meters</Text>
            </View>

            <Slider 
                w="3/4" 
                maxW="250" 
                defaultValue={raidiusPreferenceMeters}
                minValue={200}
                maxValue={3000} 
                colorScheme="cyan" 
                onChange={v => {
                    setRadiusPreferenceMeters(Math.floor(v));
                }} 
                onChangeEnd={v => {
                v && setRadiusPreferenceMeters(Math.floor(v));
                }}>
                <Slider.Track>
                    <Slider.FilledTrack />
                </Slider.Track>
                <Slider.Thumb />
            </Slider>

            <Box bg={{
                linearGradient: {
                    colors: [`lightblue.300`, `violet.800`],
                    start: [0, 0],
                    end: [1, 0]
                }
            }} p={10} rounded="xl" _text={{
                fontSize: `xl`,
                fontWeight: `medium`,
                color: `red`,
                textAlign: `center`,
                lineHeight: `60px`
            }}>

                <Button onPress={() => router.replace('/auth/Logout')}>Log Out</Button>
            </Box>

            {/* <Slider w="3/4" maxW="250" defaultValue={10} minValue={0} maxValue={100} accessibilityLabelledBy="slider" step={5} value={this.value} onChange={changeValue} valueLabelDisplays="auto">
                    <Slider.Track>
                        <Slider.FilledTrack />
                    </Slider.Track>
                    <Slider.Thumb />
                </Slider> */}
            {/* <Text>{value}</Text> */}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        // flex: 1,
        backgroundColor: 'silver',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textInput: {
        backgroundColor: 'white',
    },
    dropDown: {
        height: 50,
        width: 'auto',
        resizeMode: 'contain'
    },
    imageSize: {
        // flex: 1,
        // aspectRatio: 1.5,
        height: 100,
        width: 100,
        resizeMode: 'contain',
        justifyContent: 'center'
    }
});