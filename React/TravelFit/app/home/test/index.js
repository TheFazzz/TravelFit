import { GestureHandlerRootView, Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import { Text } from 'react-native';
import { useRef } from 'react';

const tap = Gesture.Tap()
    .onEnd((e) => {
        console.log('tap')
    })

export default function test() {
    const locationRef = useRef()
    console.log(locationRef)


    return (
        <GestureHandlerRootView style={{flex: 1}}>
            <GestureDetector gesture={tap}>
                <Animated.View style={{flex: 1}}>
                    <Text> Test </Text>
                </Animated.View>
            </GestureDetector>
        </GestureHandlerRootView>
    );
}
