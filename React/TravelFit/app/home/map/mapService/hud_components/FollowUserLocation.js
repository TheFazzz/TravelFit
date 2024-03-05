import { View, Text, StyleSheet} from 'react-native'
import { Button } from 'native-base'
import { useData } from '../../../../../contexts/DatabaseContext'


export default function FollowUserLocation({animateToRegion}) {
    const {userLocation} = useData()

    return (
        
        <Button
            style={styles.container}
            onPress={() => {
                animateToRegion(userLocation, null)
            }}
            title={'Animate to User'}
        >
        </Button>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 200,
        backgroundColor: 'blue',
        opacity: 1
    }
})