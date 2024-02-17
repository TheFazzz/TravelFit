import { Box, Input } from "native-base";
import React, { useContext, useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet, Keyboard } from 'react-native'
import { context } from "../../../_layout";
import SearchOptions from "./searchoptions";


export default function MapSearch(props) {
    const {searchFocus, setSearchFocus} = useContext(context)
    const [searchView, setSearchView] = useState(styles.searchScreenOff)
    const [searchInput, setSearchInput] = useState('')
    const inputRef = useRef(null)

    useEffect(() => {
        if (inputRef.current) {
            if (searchFocus == false) {
                Keyboard.dismiss()
            }
        }
        if (searchFocus) setSearchView(styles.searchScreenOn) 
        else setSearchView(styles.searchScreenOff)
    },[searchFocus])

    function handleFocus(e) {
        setSearchFocus(true)
    }

    function handleBlur(e) {
    }

    function handleChange(e) {
        setSearchInput(e)
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
                    onChangeText={handleChange} 
                />
            </Box>
            <View style={searchView}>
                <SearchOptions style={searchView} searchInput={searchInput}/>
            </View> 
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
        zIndex: 3
    },
    searchScreenOn: {
        zIndex: 2
    },
    searchScreenOff: {
        display: 'none'
    }

})