import React, { useContext, useState, useEffect, Children } from 'react'
import { findGymWithId, gatherAllGyms } from './DataConnection'

const DataContext = React.createContext()

export function useData(){
    return useContext(DataContext)
}

export function DataProvider({ children }) {

    async function findGym(id){
        return findGymWithId(id)
    }

    async function allGyms(){
        return gatherAllGyms()
    }

    const value = {
        findGym,
        gatherAllGyms
    }

    return(
        <DataContext.Provider value={value}>
            {children}   
        </DataContext.Provider>
    )
}