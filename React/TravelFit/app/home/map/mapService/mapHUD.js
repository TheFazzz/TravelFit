import React, {useContext, useEffect, useState} from "react";
import { StyleSheet, View } from "react-native";
import MapSearch from "./hud_components/mapSearch/mapsearch";
import FollowUserLocation from "./hud_components/FollowUserLocation";
import { context } from "../../../_layout";

export default function MapHUD(props) {
    const [currentBackground, setCurrentBackground] = useState(HUDStyles.transparentOff)
    const [currentLocation, setCurrentLocation] = useState(props.data)
    const {searchFocus} = useContext(context)

    useEffect(() => {
        if (searchFocus) setCurrentBackground(HUDStyles.transparentOn)
        else setCurrentBackground(HUDStyles.transparentOff)
    }, [searchFocus])

    useEffect(() => {
        console.log(props.data)
        setCurrentLocation(props.data)
    }, [props.data])

    return (
        <>
            <View style={[HUDStyles.containter, currentBackground]}>
                <MapSearch animateToRegion={props.animateToRegion} allLocations={props.allLocations}/>
                <FollowUserLocation animateToRegion={props.animateToRegion}/>
            </View>
        </>
    )
}

const HUDStyles = StyleSheet.create({
    containter: {
        position: 'absolute',
        paddingTop: 50,
        height: '100%',
        width: '100%',
        backgroundColor: 'white',
    },
    transparentOn: {
        opacity: 0.7
    },
    transparentOff: {
        opacity: 0,
        pointerEvents: 'none'
    }
})