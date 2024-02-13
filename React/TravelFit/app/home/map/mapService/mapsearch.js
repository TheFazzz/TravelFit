import { Box, Input } from "native-base";
import React, { useContext, useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet } from 'react-native'
import { context } from "../../_layout";

export default function MapSearch(props) {
    const {searchFocus, setSearchFocus} = useContext(context)
    const inputRef = useRef(null)

    useEffect(() => {
        if (inputRef.current) {
            if (searchFocus == false) {
                inputRef.current.Blur()
            }
        }
    },[searchFocus])

    function handleFocus(e) {
        console.log(e)
        setSearchFocus(true)
    }

    function handleBlur(e) {
        console.log(e)
    }

    return (
        <>
            <Box alignItems='center' style={styles.search} h='15%'>
                <Input
                    mx='3'
                    placeholder="Search"
                    variant='rounded'
                    w="100%"
                    ref={inputRef}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                // onChange={handleChange} 
                />
            </Box>
            {searchFocus ? 
            <View>

            </View> 
            : <></>}
        </>
    )
}


//once the user has the search bar selected, i want the whole screen to be filled
//with search options with the first option to be (use my current location) and then goes away
//once the user starts input


const padding = '3%'
const styles = StyleSheet.create({
    search: {
        //everything you want to display on the map needs to have position: absolute
        position: 'absolute',
        width: '100%',
        height: '15%',
        paddingLeft: padding,
        paddingRight: padding,
        paddingTop: padding,
    }
})