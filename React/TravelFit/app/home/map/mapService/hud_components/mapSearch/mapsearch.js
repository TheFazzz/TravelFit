import { Box, Input, Button } from "native-base";
import React, { useContext, useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet, Keyboard } from 'react-native'
import { context } from '../../../../../_layout'
import SearchOptions from "./searchoptions";
import { useData } from "../../../../../../contexts/DatabaseContext";
import CityOptions from "./CityOptions";


export default function MapSearch(props) {
    const { searchFocus, setSearchFocus, darkStyle, theme } = useContext(context)
    const [searchInput, setSearchInput] = useState('')
    const [searchTypeChosen, setSearchTypeChosen] = useState(false)
    const [cityOptionChosen, setCityOptionChosen] = useState(false)
    const [option, setOption] = useState('')
    const { setSearchPreference } = useData()
    const [cityColor, setCityColor] = useState(null)
    const inputRef = useRef(null)

    useEffect(() => {
        if (inputRef.current) {
            if (searchFocus == false) {
                Keyboard.dismiss()
                setSearchTypeChosen(false)
                setCityOptionChosen(false)
                setSearchTypeChosen(false)
            }
        }
    }, [searchFocus])

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

    function handleCityPress() {
        console.log('hi')
        setCityOptionChosen(false)
        setSearchPreference('ByCity')
        setSearchTypeChosen(true)
    }

    //changes the color of the 'Search By City' Button when clicked
    useEffect(() => {
        if (cityOptionChosen) setCityColor('red')
        else setCityColor(null)
    }, [cityOptionChosen])

    function Buttons() {
        return (
            <View style={styles.buttons}>
                <Button
                    onPress={() => {
                        setSearchTypeChosen(true)
                        setSearchPreference('ByLocation')
                        setCityOptionChosen(false)
                    }}
                >
                    Search By Current Location
                </Button>
                <Button
                    color='info.800'
                    isDisabled={cityOptionChosen}
                    onPress={() => {
                        setCityOptionChosen(true)
                    }}
                >
                    Search By City
                </Button>
            </View>
        )
    }

    const styles = StyleSheet.create({
        search: {
            //everything you want to display on the map needs to have position: absolute
            position: 'absoulte',
            backgroundColor: theme.three,
        },
        view: {
            height: '100%',
            width: '100%',
            backgroundColor: theme.three,
            position: 'absolute',
            opacity: 0.6,
        },
        buttons: {
            display: 'flex',
            gap: 25,
            position: 'absolute',
            marginTop: 140,
            flexDirection: 'row',
            justifyContent: 'center',
            marginLeft: 30
        }
    })

    return (
        <>
            <View style={{
                position:'absolute',
                width: '93%',
                marginTop: 95,
            }}>
                <Input
                    shadow={3}
                    position='absolute'
                    rounded='lg'
                    ml='3'
                    placeholder="Search"
                    variant='rounded'
                    w="100%"
                    bg={theme.three}
                    ref={inputRef}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onChangeText={handleChange}
                    style={styles.search}
                />
            </View>
            {searchFocus ?
                <>
                    <View style={styles.view} />
                    {searchTypeChosen ?
                        <SearchOptions searchInput={searchInput} handleSearchPress={handleSearchPress} allLocations={props.allLocations} />
                        :
                        <Buttons />
                    }
                    {cityOptionChosen && <CityOptions handleCityPress={handleCityPress} />}
                </>
                : <></>}
        </>
    )
}




//once the user has the search bar selected, i want the whole screen to be filled
//with search options with the first option to be (use my current location) and then goes away
//once the user starts input


const padding = '1%'
