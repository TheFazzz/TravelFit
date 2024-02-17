import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { styles } from '../styles'
import { useData } from '../../contexts/DatabaseContext';

export default function index() {

    const {findGym} = useData()

    async function test() {
        const data = await findGym(1)
        console.log(data)
    }
    
    test()

    return (
        <View>
            <Text>
                this is home page
            </Text>
        </View>
    )
}