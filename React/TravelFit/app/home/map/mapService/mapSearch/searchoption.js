import React, {useContext} from "react";
import { Text } from "react-native";
import { context } from "../../../_layout";

export default function SearchOption({data, handleSearchPress}) {
    const {gymName, city, id} = data
    const {setSearchFocus} = useContext(context)

    function handlePress(e) {
        handleSearchPress(data)
        setSearchFocus(false)
    }

    return (
        <Text onPress={handlePress}>{gymName}, {city}</Text>
    )
}