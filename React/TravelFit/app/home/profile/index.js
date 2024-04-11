import React, { useContext, useEffect } from 'react'
import { StyleSheet, Text, View, Image, TextInput } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import { Slider, Box, Button, Pressable, Switch, ScrollView } from 'native-base';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { useData } from '../../../contexts/DatabaseContext';
import { useAuth } from '../../../contexts/AuthContext';
import { context } from '../../_layout';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Icon } from 'native-base';
import { Avatar } from 'react-native-elements'


export default function profile() {
    // var Select = require('react-select')
    const router = useRouter()
    const [value, setValue] = React.useState(10);

    const [onChangeValue, setOnChangeValue] = React.useState(10);
    const [onChangeEndValue, setOnChangeEndValue] = React.useState(10);

    const {
        raidiusPreferenceMeters,
        setRadiusPreferenceMeters,
        darkMode,
        setDarkMode,
        language,
        setLanguage
    } = useData()
    const { removeBackground, setDarkStyle, darkStyle, theme } = useContext(context)
    const { currentUser } = useAuth()
    const { firstName, lastName } = currentUser

    useEffect(() => {
        removeBackground()
    }, [])

    useEffect(() => {
        setDarkStyle(darkMode)
    }, [darkMode])

    const profileSettings = {
        'Content': {
            items: [
                {
                    title: 'Gym Passes',
                    icon: { as: MaterialCommunityIcons, name: 'badge-account-horizontal' },
                    type: {
                        function: Route,
                        render: Arrow,
                        params: { route: '/home/purchased_passes' }
                    },
                },
                {
                    title: 'Favorite Gyms',
                    icon: { as: MaterialCommunityIcons, name: 'cards-heart-outline' },
                    type: {
                        function: Route,
                        render: Arrow,
                        params: { route: '/home/profile' }
                    },
                }
            ]
        },
        'Preferences': {
            items: [
                {
                    title: 'Language',
                    icon: { as: MaterialCommunityIcons, name: 'earth' },
                    type: {
                        function: null,
                        popup: OptionsPopup,
                        render: Data,
                        params: {
                            data: language,
                            set: setLanguage,
                            options: ['English', 'Spanish']
                        }
                    }
                },
                {
                    title: 'Radius Preference',
                    icon: { as: MaterialCommunityIcons, name: 'map-marker-distance' },
                    type: {
                        function: null,
                        popup: SliderPopup,
                        render: Data,
                        params: {
                            data: raidiusPreferenceMeters,
                            set: setRadiusPreferenceMeters,
                            units: 'Meters',
                            min: 200,
                            max: 3000
                        }
                    }
                },
                {
                    title: 'Dark Mode',
                    icon: { as: MaterialCommunityIcons, name: 'moon-waning-crescent' },
                    type: {
                        function: Change,
                        render: SwitchRender,
                        params: { data: darkMode, set: setDarkMode }
                    }
                },
            ]
        }
    }

    function Arrow() {
        return (
            <>
                <Text style={{color: theme.font}}>{'>'}</Text>
            </>
        )
    }

    function OptionsPopup(props) {
        const { options, set } = props.data
        const { setPopup, popup } = props

        let height = 0

        if (options.length >= 3) {
            height = 100
        } else {
            height = 10 + (33 * options.length)
        }

        const optionsStyle = StyleSheet.create({
            container: {
                position: 'absolute',
                zIndex: 1,
                backgroundColor: 'silver',
                width: 100,
                height: height,
                right: 0,
                top: 50,
                borderRadius: 20,
                paddingLeft: 20,
                paddingTop: 8,
            },
            arrow: {
                position: 'absolute',
                width: 20,
                height: 20,
                right: 35,
                top: -10,
                borderLeftWidth: 20,
                borderLeftColor: 'transparent',
                borderRightWidth: 20,
                borderRightColor: 'transparent',
                borderBottomWidth: 20,
                borderBottomColor: 'silver',
            },
            font: {
                fontSize: 15
            },
            options: {
                paddingTop: 5,
                display: 'flex',
                flexDirection: 'column',
                gap: 13
            }
        })

        return (
            <>
                {popup &&
                    <View style={optionsStyle.container}>
                        <View style={optionsStyle.arrow} />
                        <ScrollView>
                            <View style={optionsStyle.options}>
                                {options.map((data, i) => (
                                    <Pressable onPress={() => {
                                        setPopup(false)
                                        set(data)
                                    }}>
                                        <Text style={optionsStyle.font}>{data}</Text>
                                    </Pressable>
                                ))}
                            </View>
                        </ScrollView>
                    </View>
                }
            </>
        )
    }

    function SliderPopup(props) {
        const { data, set, min, max } = props.data
        const { popup } = props

        const slider = StyleSheet.create({
            container: {
                position: 'absolute',
                zIndex: 1,
                backgroundColor: 'silver',
                width: 300,
                height: 40,
                right: 0,
                top: 115,
                borderRadius: 20,
                paddingLeft: 20,
                paddingTop: 8,
            },
            arrow: {
                position: 'absolute',
                width: 20,
                height: 20,
                right: 35,
                top: -10,
                borderLeftWidth: 20,
                borderLeftColor: 'transparent',
                borderRightWidth: 20,
                borderRightColor: 'transparent',
                borderBottomWidth: 20,
                borderBottomColor: 'silver',
            }
        })

        return (
            <>
                {popup && <View style={slider.container}>
                    <Slider
                        maxW="260"
                        defaultValue={data}
                        minValue={min}
                        maxValue={max}
                        colorScheme="cyan"
                        onChange={v => {
                            set(Math.floor(v));
                        }}
                        onChangeEnd={v => {
                            v && set(Math.floor(v));
                        }}>
                        <Slider.Track>
                            <Slider.FilledTrack />
                        </Slider.Track>
                        <Slider.Thumb />
                    </Slider>
                    <View style={slider.arrow} />
                </View>}
            </>
        )
    }

    function Data(props) {
        const { data, set, units } = props.data
        const slider = StyleSheet.create({
            container: {
                display: 'flex',
                flexDirection: 'row',
                gap: 13
            },
            dataFont: {
                color: darkStyle? 'silver': 'grey',
                fontSize: 14
            }
        })

        return (
            <View style={slider.container}>
                <Text style={slider.dataFont}>{data} {units}</Text>
                <Text style={{color: darkStyle? 'white' : null}}>{'>'}</Text>
            </View>
        )
    }

    function SwitchRender(props) {
        const { data, set } = props.data
        return (
            <>
                <Switch 
                    size='md'
                    isChecked={data} 
                    onToggle={() => { set(!data) }} 
                    onTrackColor={theme.two}
                    onThumbColor={theme.one}
                    offTrackColor={theme.two} 
                    offThumbColor={theme.one}
                    />
            </>
        )
    }

    function Change(props) {
        const { data, set } = props
        set(!data)
    }

    function Route({ route }) {
        router.replace({
            pathname: route,
            params: {
                back: '/home/profile'
            }
        })
    }

    function AvatarIcon() {
        return (
            <Avatar
                size='large'
                rounded
                activeOpacity={0.7}
                title={currentUser ? currentUser.firstName[0] : '?'}
                containerStyle={{ backgroundColor: 'lightblue' }}
            />
        )
    }

    function User() {
        const user = StyleSheet.create({
            container: {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                paddingBottom: 30,
                paddingTop: 20,
                gap: 13,
            }
        })

        return (
            <View style={user.container}>
                <Text style={{ fontSize: 45, color: theme.font}}>Profile</Text>
                <AvatarIcon />
                <Text style={[styles.font, {color: theme.font}]}>
                    {firstName} {lastName}
                </Text>
            </View>
        )
    }

    function Section(props) {
        const { title, items } = props
        const section = StyleSheet.create({
            container: {

            },
            titleContainer: {
                backgroundColor: theme.two,
                paddingLeft: 12,
                paddingTop: 10,
                paddingBottom: 5
            },
            title: {
                fontSize: 15,
                color: theme.font
            },
            settings: {

            }
        })

        return (
            <View style={section.container}>
                <View style={section.titleContainer}>
                    <Text style={section.title}>{title}</Text>
                </View>
                <View style={section.settings}>
                    {items.map((item, index) => (
                        <Setting data={item} />
                    ))}
                </View>
            </View>
        )
    }
    function Setting({ data }) {
        const { title, icon, type } = data
        const [popup, setPopup] = useState(false)

        const setting = StyleSheet.create({
            container: {
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: theme.one,
                paddingLeft: 12,
                paddingTop: 10,
                paddingBottom: 10,
            },
            icon: {
                size: 10,
                color: theme.three
            },
            iconContainer: {
                width: 60,
                paddingRight: 10,
            },
            text: {
                fontSize: 16,
                color: darkStyle? 'white' : null,
            },
            function: {
                position: 'absolute',
                right: 10
            }
        })

        return (
            <>
                {type.popup && type.popup({ data: type.params, setPopup: setPopup, popup: popup })}

                <Pressable onPress={() => {
                    if (type.function) type.function(type.params)
                    if (type.popup) setPopup(!popup)
                }}>
                    {({ isHovered, isFocused, isPressed }) => {

                        return (
                            <Box
                                style={[setting.container, { transform: [{ scale: isPressed ? 0.96 : 1 }] }]}
                                bg={isPressed ? "coolGray.200" : isHovered ? "coolGray.200" : "coolGray.100"}
                            >
                                <View style={setting.iconContainer}>
                                    <Icon as={icon.as} name={icon.name} style={setting.icon} size={setting.icon.size} />
                                </View>
                                <Text style={setting.text}>{title}</Text>
                                <View style={setting.function}>
                                    <type.render data={type.params} />
                                </View>
                            </Box>
                        )
                    }}
                </Pressable>
            </>
        )
    }

    function Logout() {
        const logout = StyleSheet.create({
            font: {
                fontSize: 15,
                color: 'white'
            }
        })

        return (
            <Box bg={{
                linearGradient: {
                    colors: [`lightblue.300`, `violet.800`],
                    start: [0, 0],
                    end: [1, 0]
                }
            }} p={10} rounded="xl" _text={{
                fontSize: `xl`,
                fontWeight: `medium`,
                color: `red`,
                textAlign: `center`,
                lineHeight: `60px`
            }}>

                <Button onPress={() => router.replace('/auth/Logout')} bg={'red.500'}>
                    <Text style={logout.font}>
                        Log Out
                    </Text>
                </Button>
            </Box>
        )
    }


    // const changeValue = (event, value) => {
    //     setValue(value);
    // }

    return (
        <View style={styles.container}>
            <User />

            {Object.keys(profileSettings).map((keyName, i) => (
                <Section title={keyName} items={profileSettings[keyName].items} />
            ))}

            <Logout />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        // flex: 1,
        backgroundColor: '',
    },
    textInput: {
        backgroundColor: 'white',
    },
    dropDown: {
        height: 50,
        width: 'auto',
        resizeMode: 'contain'
    },
    imageSize: {
        // flex: 1,
        // aspectRatio: 1.5,
        height: 100,
        width: 100,
        resizeMode: 'contain',
        justifyContent: 'center'
    },
    font: {
        fontSize: 20,
    }
});