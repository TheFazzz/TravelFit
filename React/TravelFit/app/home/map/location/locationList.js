import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import locationData from './locationData';
import Location from './location';

const LocationList = () => {
    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <Text>
                    This is our locations:
                </Text>
                {locationData.map((data, index) => (
                    <Location data={data} key={index} />
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: '1px',
        backgroundColor: 'orange',
        padding: 5,
        gap: 1
    },
    scrollView: {
        height: 100
    }
})

export default LocationList;
