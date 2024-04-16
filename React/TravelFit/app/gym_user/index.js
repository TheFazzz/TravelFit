import React, { useContext, useEffect } from "react";
import { View, Text, Pressable, StyleSheet } from 'react-native'
import { Avatar, Center, Heading, Flex, Alert, Box, Button, NativeBaseProvider, VStack, Link, HStack } from 'native-base'
import { useRouter } from "expo-router";
import { context } from "../_layout";
import { useGym } from "../../contexts/GymContext";

export default function index() {
    const router = useRouter()
    const { theme, setHeader, setBackButton } = useContext(context)
    const { log } = useGym()

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

    function ScannedUser(props) {
        const {pass_name, pass_id, gym_id, user_id} = props.data

        const scanneduser = StyleSheet.create({
            container: {
                borderRadius: 5,
                borderColor: 'black',
                display: 'flex',
                flexDirection: 'row'
            }
        })

        return(
            <Box shadow={3} style={scanneduser.container}>
                <Text>Pass Name: {pass_name}</Text>
                <Text>pass id: {pass_id}</Text>
                <Text>gym id: {gym_id}</Text>
                <Text>user id: {user_id}</Text>
            </Box>
        )
    }

    function Column(props) {
        const {title, data} = props
        const column = StyleSheet.create({
            container: {
                display: 'flex',
                flexDirection: 'column'
            },
            item: {
                borderWidth: 1,
                borderColor: 'black',
                paddingRight: 22
            }
        })

        return(
            <Box style={column.container}>
                <View style={column.item}>
                    <Text>{title}</Text>
                </View>
                {data.map((item, index) => (
                    <View style={column.item}>
                        <Text>{item}</Text>
                    </View>
                ))}
            </Box>
        )
    }

    function ScannedUsers() {
        const scannedusers = StyleSheet.create({
            log: {
                display: 'flex',
                flexDirection: 'row',
                backgroundColor: theme.three,
            }
        })

        return (
            <Box bg={theme.one} p="2" rounded={8} shadow={3} borderWidth={1} borderColor={theme.two}>
                 
                <Box style={scannedusers.log}>
                {/* {log.map((data, index) => (
                    <ScannedUser data={data}/>
                ))} */}
                    <Column title={'Pass Name'} data={log.map(data => data.pass_name)}/>
                    <Column title={'Pass Id'} data={log.map(data => data.pass_id)}/>
                    <Column title={'Gym Id'} data={log.map(data => data.gym_id)}/>
                    <Column title={'User Id'} data={log.map(data => data.user_id)}/>
                </Box>
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