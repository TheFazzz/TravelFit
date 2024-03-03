import React, {useContext} from "react";
import { Text } from "react-native";
import { context } from "../../../../../_layout";

export default function SearchOption({data, handleSearchPress}) {
    console.log(data)

    const {gym_name, id} = data
    const {setSearchFocus} = useContext(context)

    function handlePress(e) {
        handleSearchPress(data)
        setSearchFocus(false)
    }

    return (
        <Text onPress={handlePress}>{gym_name}</Text>
    )
}