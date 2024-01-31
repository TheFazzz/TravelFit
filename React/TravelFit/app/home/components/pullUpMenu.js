import React from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';

const screenHeight = (Dimensions.get('window').height / 1.19);
const translateY = useSharedValue(screenHeight);

export default function PullUpMenu(props) {

  // const gestureHandler = useAnimatedGestureHandler({
  //   onStart: (_, context) => {
  //     context.startY = translateY.value;
  //   },
  //   onActive: (event, context) => {
  //     translateY.value = Math.max(screenHeight, context.startY + event.translationY);
  //   },
  //   onEnd: () => {
  //     if (translateY.value > screenHeight / 2) {
  //       translateY.value = withSpring(screenHeight, { damping: 10 });
  //     } else {
  //       translateY.value = withSpring(screenHeight / 2, { damping: 10 });
  //     }
  //   },
  // });

  const pan = Gesture.Pan()
    .onStart((e) => {
      //console.log('onstart', e)
      translateY.value = withSpring(screenHeight / 2, { damping: 10 });
    })
    .onChange((e) => {
      //console.log('onchange', e)
      translateY.value = Math.min(Math.max(0, translateY.value + e.changeY), screenHeight)
    })
    .onFinalize((e) => {
      //console.log('onfinalize', e)
      if (translateY.value > screenHeight / 1.2) {
        translateY.value = withSpring(screenHeight , { damping: 10 });
      } else if (translateY.value > 190 && translateY.value < screenHeight / 1.2) {
        translateY.value = withSpring(screenHeight / 2, { damping: 10 });
      } else  {
        translateY.value = withSpring(screenHeight / 20, { damping: 10 });
    }})



  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  return (
    <>
      <GestureHandlerRootView>
        <Animated.View style={[animatedStyle, styles.all]}>
          <GestureDetector gesture={pan}>
            <View style={styles.dragblock}></View>
          </GestureDetector>
          <props.Content style={styles.menuContainer} />
        </Animated.View>
      </GestureHandlerRootView>
    </>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    position: 'relative',
    left: 0,
    right: 0,
    width: '100%',
    height: `${screenHeight * 0.6}px`,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  dragblock: {
    position: 'relative',
    left: '46%',
    width: '13%',
    height: `${screenHeight * 0.05}px`,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  all: {
    height: `${screenHeight * 1.1}px`,
  }

});
