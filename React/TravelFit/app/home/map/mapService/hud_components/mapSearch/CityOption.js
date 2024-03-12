import React, {useContext} from "react";
import { Text } from "react-native";
import { context } from "../../../../../_layout";

export default function CityOption({data, handleSearchPress}) {
    const {city, state} = data

    function handlePress(e) {
        handleSearchPress(city)
    }

    return (
        <Text onPress={handlePress}>{city}, {state}</Text>
    )
}