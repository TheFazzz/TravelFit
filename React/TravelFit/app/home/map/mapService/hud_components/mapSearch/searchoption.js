import React, {useContext} from "react";
import { Text } from "react-native";
import { context } from "../../../../../_layout";
import { Button } from 'native-base'

export default function SearchOption({data, handleSearchPress}) {
    console.log(data)

    const {gym_name, id} = data
    const {setSearchFocus, theme} = useContext(context)

    function handlePress(e) {
        handleSearchPress(data)
        setSearchFocus(false)
    }

    const format = `${gym_name}`

    return (
        <Button 
            onPress={handlePress}
            width={300}
            height={10}
            paddingLeft={-40}
            bgColor={theme.two}
        >
            <Text style={{color: theme.font}}>
                {format}
            </Text>
        </Button>
    )
}