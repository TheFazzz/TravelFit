import React, { useContext, useState, useEffect, Children } from 'react'
import {    findGymWithId, 
            gatherAllGyms,
            getGymPassOptionsbyId,
            purchaseGymPassByIdandPassOptionId,
            getGymPhotosbyId,
} from './DataConnection'

import { getCurrentLocation, getLocationPermission } from './GeolocationConnection'

const DataContext = React.createContext()

export function useData(){
    return useContext(DataContext)
}

export function DataProvider({ children }) {
    const [allLocations, setAllLocations] = useState([])
    const [userLocation, setUserLocation] = useState({})

    async function findGym(id){
        return findGymWithId(id)
    }

    async function allGyms(){
        return gatherAllGyms(`Anaheim`)
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
        gymPassOptionsById,
        purchaseGymPass,
        gymPhotosbyId,
        getLocation,
        requestLocationPermission,
        setUserLocation,
        userLocation
    }

    return(
        <DataContext.Provider value={value}>
            {children}   
        </DataContext.Provider>
    )
}