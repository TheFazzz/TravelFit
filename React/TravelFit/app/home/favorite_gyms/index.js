import React, { useContext, useEffect } from "react";
import { Text, StyleSheet } from "react-native";
import { Box, Pressable, Icon } from "native-base";
import { useAuth } from "../../../contexts/AuthContext";
import { context } from "../../_layout";
import { useRouter } from "expo-router";
import { MaterialCommunityIcons} from '@expo/vector-icons'


export default function index() {
    const { favoriteGyms, currentUser } = useAuth()
    const { theme, setBackButton } = useContext(context)
    const router = useRouter()

    function Gym(props) {
        const id = props.data[0]
        const gym_name = props.data[1]
        const city = props.data[2]

        const gym = StyleSheet.create({
            container: {
                backgroundColor: theme.two,
                padding: 8,
                marginLeft: 15,
                marginRight: 15
            },
            font: {
                color: theme.font,
                fontSize: 19
            }
        })
        
        return (
            <Pressable onPress={() => {
                setBackButton(prevState => ([...prevState, ['route', '/home/favorite_gyms']]))
                router.replace({
                    pathname: '/home/gymPage',
                    params: {id : id}
                })
            }}>
            {({isPressed}) => (
                <Box style={[gym.container, {transform: [{scale: isPressed ? 0.96 : 1}]}]} shadow={3}>
                    <Text style={gym.font}>{gym_name}, {city}</Text>
                </Box>
            )}
            </Pressable>
        )
    }

    function Gyms() {
        const gyms = StyleSheet.create({
            container: {
                display: 'flex',
                flexDirection: 'column',
                gap: 20,
                backgroundColor: theme.one,
                padding: 14,
                borderRadius: 15,
                marginTop: 32,
            }
        })

        return(
            <Box style={gyms.container}>
                <Banner/>
                {favoriteGyms.map((item, index) => (
                    <Gym data={item}/>
                ))}
            </Box>
        )
    }

    function Banner() {
        const banner = StyleSheet.create({
            container: {
                paddingBottom: 20,
                paddingTop: 20,
                backgroundColor: theme.two,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                gap: 15
            },
            font: {
                color: theme.font,
                fontSize: 30,
            },
            icon: {
                color: theme.one,
                paddingTop: 3
            }
        })

        return (
            <Box style={banner.container} shadow={3}>
                <Icon as={MaterialCommunityIcons} name='cards-heart' size='8' style={banner.icon} shadow={3}/>
                <Text style={banner.font}>{currentUser.firstName}'s Favorite Gyms</Text>
            </Box>
        )
    }

    function Header() {
        const header = StyleSheet.create({
            container: {
                position: 'absolute',
                backgroundColor: theme.two,
                height: 105,
                width: '108%',
                borderRadius: 20
            }
        })

        return (
            <Box style={header.container} shadow={3}>

            </Box>
        )
    }

    return (
    <>
        <Header/>
        <Gyms/>
    </>
    )
}