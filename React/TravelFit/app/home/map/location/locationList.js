import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import locationData from './locationData';
import Location from './location';

console.log(locationData)

const LocationList = () => {
    return (
        <View style={styles.container}>
            <Text>
                This is our locations:
            </Text>
            {locationData.map((data, index) => (
                <Location data={data} key={index}/>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: '1px',
        backgroundColor: 'orange',
    }   
})

export default LocationList;
