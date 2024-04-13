import React, { useContext, useEffect } from "react";
import { View, Text, Pressable, StyleSheet } from 'react-native'
import { Avatar, Center, Heading, Flex, Alert, Box, Button, NativeBaseProvider, VStack, Link, HStack } from 'native-base'
import { useRouter } from "expo-router";
import { context } from "../_layout";

export default function index() {
    const router = useRouter()
    const { theme, setHeader, setBackButton } = useContext(context)

    useEffect(() => {
        setHeader(true)
        setBackButton([])

    }, [])

    function Title() {

        return(
            <Box bg={theme.one} p="5" rounded={8} shadow={3} borderWidth={1} borderColor={theme.two}>
                <Text>
                    Gym User
                </Text>
            </Box>
        )
    }

    function ScannedUsers() {
        return (
            <Box bg={theme.one} p="5" rounded={8} shadow={3} borderWidth={1} borderColor={theme.two}>
                <Text>
                    This is should be the list of users scanned:
                </Text>
            </Box>
        )
    }

    function ActivateBox() {
        return (
            <Box alignItems="center">
                <Pressable maxW="96">
                    {({ isHovered, isFocused, isPressed }) => {
                        return (
                            <Box bg={isPressed ? "coolGray.200" : isHovered ? "coolGray.200" : "coolGray.100"}
                                style={{ transform: [{ scale: isPressed ? 0.96 : 1 }] }} p="5" rounded="8"
                                shadow={3} borderWidth="1" borderColor="coolGray.300">
                                <Heading>
                                    Scan QR Code
                                </Heading>
                                <Text
                                    mt="2"
                                    fontSize="sm"
                                    color="coolGray.700"
                                    bold>
                                    scan for guest pass:
                                </Text>
                                <Flex>
                                    {isFocused ?
                                        <Text
                                            mt="2"
                                            fontSize={12}
                                            fontWeight="medium"
                                            textDecorationLine="underline"
                                            color="darkBlue.600"
                                            alignSelf="flex-start">
                                            camrea
                                        </Text>
                                        :
                                        <Text
                                            mt="0"
                                            fontSize={12}
                                            fontWeight="medium"
                                            color="darkBlue.600"
                                            p="2">
                                            <Link>
                                                <Button
                                                    size="md"
                                                    variant="link"
                                                    p={-3}
                                                    onPress={() => {
                                                        router.replace('/gym_user/camera')
                                                        setBackButton([['route', '/gym_user']])
                                                    }}
                                                >
                                                    camrea
                                                </Button>
                                            </Link>
                                        </Text>
                                    }
                                </Flex>
                            </Box>
                        )
                    }}
                </Pressable>
            </Box>
        )
    }

    return (
        <View style={styles.View}>
            <Title/>
            <ActivateBox />
            <ScannedUsers />
        </View>
    )
}



const styles = StyleSheet.create({
    View: {
        display: 'flex',
        paddingTop: 50,
        gap: 30
    }
})