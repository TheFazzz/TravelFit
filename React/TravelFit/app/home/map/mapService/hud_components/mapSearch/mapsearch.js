import { Box, Input } from "native-base";
import React, { useContext, useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet, Keyboard } from 'react-native'
import { context } from '../../../../../_layout'
import SearchOptions from "./searchoptions";


export default function MapSearch(props) {
    const {searchFocus, setSearchFocus} = useContext(context)
    const [searchInput, setSearchInput] = useState('')
    const inputRef = useRef(null)

    useEffect(() => {
        if (inputRef.current) {
            if (searchFocus == false) {
                Keyboard.dismiss()
            }
        }
    },[searchFocus])

    function handleFocus(e) {
        setSearchFocus(true)
    }

    function handleBlur(e) {
    }

    function handleChange(e) {
        setSearchInput(e)
    }

    function handleSearchPress(e) {
        props.animateToRegion(e.coordinate, e.id)
        props.setSearchedLocation(e)
    }

    return (
        <>
            <Input
                mx='3'
                position='absolute'
                rounded='lg'
                ml='3'
                mt='3'
                mr='6'
                placeholder="Search"
                variant='rounded'
                w="100%"
                ref={inputRef}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChangeText={handleChange} 
            />
            {searchFocus? 
            <>
            <View style={styles.view}/>
            <SearchOptions searchInput={searchInput} handleSearchPress={handleSearchPress} allLocations={props.allLocations}/>
            </> 
            : <></>} 
        </>
    )
}


//once the user has the search bar selected, i want the whole screen to be filled
//with search options with the first option to be (use my current location) and then goes away
//once the user starts input


const padding = '1%'
const styles = StyleSheet.create({
    search: {
        //everything you want to display on the map needs to have position: absolute
        position: 'absoulte',
    },
    view: {
        height: '100%',
        width: '100%',
        backgroundColor: 'white',
        position: 'absolute',
        opacity: 0.6,
    }

})