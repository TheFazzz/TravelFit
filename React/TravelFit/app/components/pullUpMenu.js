import React from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';

let screenHeight = (Dimensions.get('window').height * 0.78)
let screenWidth = Dimensions.get('window').width

export default function PullUpMenu(props) {
	
	let translateY = useSharedValue(screenHeight);
	let change = false
	let direction = 'top'

	console.log(screenHeight)

	const pan = Gesture.Pan()
		.onChange((e) => {
			change = true
			translateY.value = Math.min(Math.max(0, translateY.value + e.changeY), screenHeight)
		})
		.onFinalize((e) => {
			if (change) {
				if (translateY.value > screenHeight / 1.2) {
					menuPosition('bottom')
					direction = 'top'
				} else if (translateY.value > 190 && translateY.value < screenHeight / 1.2) {
					menuPosition('middle')
				} else {
					menuPosition('top')
					direction = 'bottom'
				}
			}
			change = false
		})


	const tap = Gesture.Tap()
		.onEnd(() => {
			if (translateY.value > screenHeight / 1.2) {
				console.log('1')
				menuPosition('middle')
				direction = 'top'
			} else if (translateY.value > 190 && translateY.value < screenHeight / 1.2) {
				console.log('2')
				menuPosition(direction)
			} else {
				console.log('3')
				menuPosition('middle')
				direction = 'bottom'
			}
		})

	function menuPosition(position) {
		switch (position) {
			case 'top':
				translateY.value = withSpring(screenHeight / 20, { panning: 10 });
				break;
			case 'middle':
				translateY.value = withSpring(screenHeight / 2, { panning: 10 });
				break;
			case 'bottom':
				translateY.value = withSpring(screenHeight, { panning: 10 });
				break;
			default:
				break;
		}
	}

	const composed = Gesture.Simultaneous(tap, pan)
	const animatedStyle = useAnimatedStyle(() => {
		return {
			transform: [{ translateY: translateY.value }],
		};
	});

	return (
			<GestureHandlerRootView style={{position:'absolute'}}>
				<Animated.View style={[animatedStyle, styles.all]}>
					<GestureDetector gesture={composed}>
						<View style={styles.dragblock}></View>
					</GestureDetector>
					<View style={styles.menuContainer}>
						<props.Content/>
					</View>
				</Animated.View>
			</GestureHandlerRootView>
	)
};

const styles = StyleSheet.create({
	menuContainer: {
		position: 'relative',
		left: 0,
		right: 0,
		width: screenWidth,
		height: screenHeight * 1.3,
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
	},
	dragblock: {
		position: 'relative',
		bottom: 0,
		left: screenWidth * .47,
		width: screenWidth * .1,
		height: screenHeight * 0.05,
		backgroundColor: 'silver',
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
	},
	all: {
		position: 'absolute',
		left: 0,
		top: 0,
		height: screenHeight * 2, 
		zIndex: 0,
	}
})