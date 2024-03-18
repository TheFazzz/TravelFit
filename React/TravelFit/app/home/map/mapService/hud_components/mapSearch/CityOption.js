import React, {useContext} from "react";
import { Text } from "react-native";
import { context } from "../../../../../_layout";
import { Button } from "native-base";

export default function CityOption({data, handleSearchPress}) {
    const {city, state} = data

    function handlePress(e) {
        handleSearchPress(city)
    }
    
    const format = `${city}, ${state}`
    return (
        <Button 
            onPress={handlePress}
            width={300}
            height={10}
            color='orange.100'
        >
            {format}
        </Button>
    )
}