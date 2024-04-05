import React, {useContext, useEffect, useState} from 'react'
import { StyleSheet, Text, View } from 'react-native';
import Map from './mapService/map';

import Index from '../gymPage'
import { useData } from '../../../contexts/DatabaseContext';
import { context } from '../../_layout';

export default function map() {
    const [gymId, setGymId] = useState(null)
    const { userLocation } = useData()
    const { removeBackground } = useContext(context)

    useEffect(() => {
        removeBackground()
    }, [])

    return (
        <>
            <Map setGymId={setGymId}/>
            {gymId && <Index value={gymId} setGymId={setGymId}/>}
        </>
    )
}
