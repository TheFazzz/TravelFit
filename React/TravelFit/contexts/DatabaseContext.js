import React, { useContext, useState, useEffect, Children } from 'react'
import {    findGymWithId, 
            gatherAllGyms,
            getGymPassOptionsbyId,
            purchaseGymPassByIdandPassOptionId,
            getGymPhotosbyId,
            getNearbyGyms,
} from './DataConnection'

import { getCurrentLocation, getLocationPermission } from './GeolocationConnection'

const DataContext = React.createContext()

export function useData(){
    return useContext(DataContext)
}

export function DataProvider({ children }) {
    const [allLocations, setAllLocations] = useState([])
    const [userLocation, setUserLocation] = useState({})
    const [raidiusPreferenceMeters, setRadiusPreferenceMeters] = useState(2000)
    const [searchPreference, setSearchPreference] = useState('ByCity')
    const [perferedCity, setPerferedCity] = useState('Anaheim')

    async function findGym(id){
        return findGymWithId(id)
    }

    async function allGyms(){
        return gatherAllGyms(perferedCity)
    }

    async function nearbyGyms(){
        const {latitude, longitude} = userLocation
        return getNearbyGyms(latitude, longitude, raidiusPreferenceMeters)
    }

    async function gymPassOptionsById(id){
        return getGymPassOptionsbyId(id)
    }

    async function purchaseGymPass(gym_id, pass_option_id) {
        return purchaseGymPassByIdandPassOptionId(gym_id, pass_option_id)
    }

    async function gymPhotosbyId(id){
        return getGymPhotosbyId(id)
    }

    async function getLocation(){
        return getCurrentLocation()
    }

    async function requestLocationPermission() {
        return getLocationPermission()

    }

    const value = {
        allLocations,
        setAllLocations,
        findGym,
        allGyms,
        nearbyGyms,
        gymPassOptionsById,
        purchaseGymPass,
        gymPhotosbyId,
        getLocation,
        requestLocationPermission,
        setUserLocation,
        userLocation,
        raidiusPreferenceMeters,
        setRadiusPreferenceMeters,
        searchPreference,
        setSearchPreference,
        perferedCity,
        setPerferedCity
    }

    return(
        <DataContext.Provider value={value}>
            {children}   
        </DataContext.Provider>
    )
}