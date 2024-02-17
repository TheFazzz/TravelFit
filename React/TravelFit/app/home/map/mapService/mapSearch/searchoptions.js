import React, { useEffect } from "react";
import LocationList from "../../location/locationList";
import { Text, View, StyleSheet } from "react-native";


export default function SearchOptions(searchView, searchInput) {

    useEffect(() => {
        console.log(searchInput)
    }, [searchInput])

    return (
        <View style={[styles.container, searchView]}>
            <Text>
                Test
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        height: '100%',
        opacity: 0.7
    }
})