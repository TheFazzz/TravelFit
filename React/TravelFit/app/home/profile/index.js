// import { baseFontSize } from 'native-base/lib/typescript/theme/tools';
import React from 'react'
import { StyleSheet, Text, View, Image, TextInput } from 'react-native';
// import { styles } from '../../styles';
import SelectDropdown from 'react-native-select-dropdown';
import { Slider } from 'native-base';
import { useState } from 'react';

export default function profile() {
    // var Select = require('react-select')
    const gender = ['Male', 'Female']

    const [value, setValue] = React.useState(10);

    const [onChangeValue, setOnChangeValue] = React.useState(10);
    const [onChangeEndValue, setOnChangeEndValue] = React.useState(10);

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
                <Text style={{ paddingTop: 10, paddingRight: 10 }} nativeID='slider'>Budget:</Text>
                <Text style={{paddingTop: 10}}>${onChangeValue}</Text>
            </View>

            <Slider w="3/4" maxW="250" defaultValue={10} colorScheme="cyan" onChange={v => {
                setOnChangeValue(Math.floor(v));
            }} onChangeEnd={v => {
                v && setOnChangeEndValue(Math.floor(v));
            }}>
                <Slider.Track>
                    <Slider.FilledTrack />
                </Slider.Track>
                <Slider.Thumb />
            </Slider>

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