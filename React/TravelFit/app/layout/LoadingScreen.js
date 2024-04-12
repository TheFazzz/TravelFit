import { View, Text, StyleSheet, Dimensions} from 'react-native'
import { HStack, Spinner, Heading} from 'native-base'
import { useContext } from 'react'
import { context } from '../_layout'

export default function LoadingScreen() {

    const {theme} = useContext(context)
    const file = './home/layout/loadingscreen.js'

    return (
        <View style={styles.view}>
            <HStack space={3} justifyContent="center">
                <Spinner size="lg" color={theme.three}/>
                <Heading color={theme.three} fontSize="lg">
                    Loading
                </Heading>
            </HStack>
        </View>
    )
}
let screenHeight = (Dimensions.get('window').height / 1);

const styles = StyleSheet.create({
    view: {
        marginTop: screenHeight * .4
    }
})