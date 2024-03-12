import React, {useState} from 'react'
import { StyleSheet, Text, View } from 'react-native';
import Map from './mapService/map';

import Index from '../gymPage/[id]'

export default function map() {
    const [gymId, setGymId] = useState(null)
    
    return (
        <>
            <Map setGymId={setGymId}/>
            {gymId && <Index value={gymId} setGymId={setGymId}/>}
        </>
    )
}
