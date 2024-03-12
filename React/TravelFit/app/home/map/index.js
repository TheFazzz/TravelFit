import React, {useState} from 'react'
import { StyleSheet, Text, View } from 'react-native';
import Map from './mapService/map';

import Index from '../gymPage/[id]'
import { useData } from '../../../contexts/DatabaseContext';

export default function map() {
    const [gymId, setGymId] = useState(null)
    const { userLocation } = useData()

    return (
        <>
            <Map setGymId={setGymId}/>
            {gymId && <Index value={gymId} setGymId={setGymId}/>}
        </>
    )
}
