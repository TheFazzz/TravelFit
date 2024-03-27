import React, {useState, useEffect} from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { useAuth } from '../../../contexts/AuthContext'

export default function index() {
    const [passes, setPasses] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const { userPasses } = useAuth()

    async function loadData() {
        setLoading(true)
        try {
            setPasses(await userPasses())
        } catch (error) {
            setPasses([])
            setError(error)
            console.error(error)
        } finally {
            setLoading(false)
            console.log(passes)
        }
    }

    useEffect(() => {
        loadData()
    }, [])

    function Pass(props) {
        return (
            <>
                <Text>This is a pass</Text>
            </>
        )
    }

    return(
        <View style={styles.view}>
            <Text>
                purchased passes here:
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    view: {

    }
})
