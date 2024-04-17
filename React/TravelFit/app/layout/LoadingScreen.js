import { View, Text, StyleSheet, Dimensions} from 'react-native'
import { HStack, Spinner, Heading, Flex, Box} from 'native-base'
import { useContext } from 'react'
import { context } from '../_layout'

export default function LoadingScreen() {

    const {theme} = useContext(context)

    return (
        <View style={styles.view}>
            <Flex gap={3} flexDirection={'row'} justifyContent="center" alignContent={'center'} shadow={3}>
                <Spinner size="lg" color={theme.font}/>
                <Heading color={theme.font} fontSize="lg" pt={1}>
                    Loading
                </Heading>
            </Flex>
        </View>
    )
}
let screenHeight = (Dimensions.get('window').height / 1);

const styles = StyleSheet.create({
    view: {
        marginTop: screenHeight * .4
    }
})