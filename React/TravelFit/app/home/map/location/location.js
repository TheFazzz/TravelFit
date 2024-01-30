import React from 'react'
import { StyleSheet, Text, View } from 'react-native';

export default function Location({ data }) {

    console.log(data)
    const hours = data.hours

    return (
        <View style={styles.container}>
            <View>
                <Text>{data.gymName}</Text>
                <Text>{data.city}, {data.state}</Text>
            </View>
            <View>
                <Text>Monday: {hours.monday.open} - {hours.monday.close}</Text>
                <Text>Tuesday: {hours.tuesday.open} - {hours.tuesday.close}</Text>
                <Text>Wednesday: {hours.wednesday.open} - {hours.wednesday.close}</Text>
                <Text>Thursday: {hours.thursday.open} - {hours.thursday.close}</Text>
                <Text>Friday: {hours.friday.open} - {hours.friday.close}</Text>
                <Text>Saturday: {hours.saturday.open} - {hours.saturday.close}</Text>
                <Text>Sunday: {hours.sunday.open} - {hours.sunday.close}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '98%',
        height: '25%',
        backgroundColor: 'red',
        border: 'black solid 2px',
        padding: '5px',
        margin: '3px'
    }
})
