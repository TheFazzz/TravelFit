import React, {useContext, useEffect, useState} from "react";
import { StyleSheet, View } from "react-native";
import MapSearch from "./hud_components/mapSearch/mapsearch";
import FollowUserLocation from "./hud_components/FollowUserLocation";
import { context } from "../../../_layout";
import GymOverlay from "./hud_components/GymOverlay";

export default function MapHUD(props) {
    const [currentLocation, setCurrentLocation] = useState()
    const [searchedLocation, setSearchedLocation] = useState()

    useEffect(() => {
        setCurrentLocation(props.data)
    }, [props.data])

    useEffect(() => {
        setCurrentLocation(props.currentMarker)
    }, [props.currentMarker])

    useEffect(() => {
        setCurrentLocation(searchedLocation)
    }, [searchedLocation])

    useEffect(() => {
        setSearchedLocation(null)
        setCurrentLocation(null)
    }, [props.onPanDrag])


    return (
        <>
            <GymOverlay currentMarker={currentLocation} setGymId={props.setGymId}/>
            <MapSearch animateToRegion={props.animateToRegion} allLocations={props.allLocations} setSearchedLocation={setSearchedLocation}/>
            <FollowUserLocation animateToRegion={props.animateToRegion}/>
        </>
    )
}

const HUDStyles = StyleSheet.create({
    all: {
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
    },
    containter: {
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