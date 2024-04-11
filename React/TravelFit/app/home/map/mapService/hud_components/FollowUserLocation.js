import { View, Text, StyleSheet} from 'react-native'
import { Button } from 'native-base'
import { useData } from '../../../../../contexts/DatabaseContext'
import { Icon, IconButton } from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useContext } from 'react';
import { context } from '../../../../_layout';

export default function FollowUserLocation({animateToRegion}) {
    const {userLocation} = useData()
    const {theme} = useContext(context)

    const styles = StyleSheet.create({
        container: {
            position: 'absolute',
            bottom: 200,
            left: 10,
            backgroundColor: 'grey',
            borderWidth: 1,
            opacity: 0.7,
        },
        icon: {
            color: theme.two
        }
    })

    return (
        
        <IconButton
            style={styles.container}
            onPress={() => {
                animateToRegion(userLocation, null)
            }}
            icon={<Icon as={MaterialCommunityIcons} name='crosshairs' style={styles.icon}/>}
            // title={'Animate to User'}
        >
        </IconButton>
    )
    
}

// const styles = StyleSheet.create({
//     container: {
//         position: 'absolute',
//         bottom: 200,
//         left: 10,
//         backgroundColor: 'grey',
//         borderWidth: 1,
//         opacity: 0.5
//     },
//     icon: {
//         color: theme.two
//     }
// })