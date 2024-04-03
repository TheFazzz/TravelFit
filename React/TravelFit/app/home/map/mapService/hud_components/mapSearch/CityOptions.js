import React, { useEffect, useState, useContext } from "react";
import { Text, View, StyleSheet } from "react-native";
import CityOption from "./CityOption.js";
import { useData } from "../../../../../../contexts/DatabaseContext.js";
import { context } from "../../../../../_layout.js";

export default function CityOptions({ handleCityPress }) {
    const { setPerferedCity } = useData()

    function handleSearchPress(e) {
        setPerferedCity(e)
        handleCityPress()
    }

    return (
        <View style={styles.container}>
            {cities.map((data, index) => (
                <CityOption data={data} handleSearchPress={handleSearchPress}/>
            ))}
        </View> 
    )
}

const cities = [
    {
        city: 'Fullerton',
        state: 'CA'
    },
    {
        city: 'Anaheim',
        state: 'CA'
    }
]

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        gap: 10,
        position: 'absolute',
        marginTop: 195,
        marginLeft: 40,
    }
})