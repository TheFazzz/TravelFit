import { View, Text, StyleSheet, Dimensions} from 'react-native'
import { HStack, Spinner, Heading} from 'native-base'

export default function LoadingScreen() {
    const file = './home/layout/loadingscreen.js'
    return (
        <View style={styles.view}>
            <HStack space={3} justifyContent="center">
                <Spinner size="lg"/>
                <Heading color="primary.500" fontSize="lg">
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