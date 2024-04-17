import React, { useContext, useEffect } from 'react'

import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import { styles } from '../styles'
import { useData } from '../../contexts/DatabaseContext'
import { Center, Heading, Flex, Alert, Box, Button, NativeBaseProvider, VStack, Link, HStack, Icon, Pressable } from 'native-base'
import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'expo-router';
import { context } from '../_layout';
import { Avatar } from 'react-native-elements'
import { Calendar, CalendarList } from 'react-native-calendars'
import { MaterialCommunityIcons } from '@expo/vector-icons'

export default function index() {
  const {
    requestLocationPermission,
    setIconPress,
    darkMode
  } = useData()
  const { currentUser } = useAuth()
  const router = useRouter()
  const { removeBackground, setBackButton, setFooter, setDarkStyle, darkStyle, theme } = useContext(context)

  const currentDate = new Date();
  const currentDateString = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1)
    .toString()
    .padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;

  useEffect(() => {
    removeBackground()
    setFooter(true)
    setBackButton([])
  }, [])

  useEffect(() => {
    setDarkStyle(darkMode)
  }, [darkMode])

  requestLocationPermission()

  function existingPasses() {
    return (
      <Box alignItems="center" style={{ marginBottom: 20 }}>
        <Pressable maxW="96">
          {({ isHovered, isFocused, isPressed }) => {
            return (
              <Box
                bg={theme.two}
                style={{ transform: [{ scale: isPressed ? 0.96 : 1 }] }}
                p="5"
                rounded="8"
                shadow={3}
                borderWidth="1"
                borderColor="theme.one">
                <Heading>
                  <Text style={theme.font}>
                    Gym Passes
                  </Text>
                </Heading>
                <Text
                  mt="2"
                  fontSize="sm"
                  color="coolGray.700"
                  bold>
                  list of all available passes as of purchase date:
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
                      3 passes
                    </Text>
                    :
                    <Text
                      mt="0"
                      fontSize={12}
                      fontWeight="medium"
                      color="darkBlue.600"
                      p="2">
                      <Link href="https://google.com">
                        <Button
                          size="md"
                          variant="link"
                          p={-3}
                          onPress={() => {
                            router.replace({
                              pathname: '/home/purchased_passes',
                              params: {
                                back: '/home'
                              }
                            })
                          }}
                        >
                          3 passes
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


  const premium = () => {
    return (
      <Box p={10} rounded="xl" borderColor={theme.two} shadow={3} style={{ marginBottom: 20 }}
        _text={{
          fontSize: `xl`,
          fontWeight: `medium`,
          color: `emerald.50`,
          textAlign: `center`,
          lineHeight: `60px`
        }}>

        <Button
          bg={theme.three}
          onPress={() => {
            router.replace({
              pathname: '/purchase/purchaseScreen',
              params: {
                city: 'Fullerton',
                gym_name: 'Chuze Fitness',
                gym_id: 6,
                pass_id: 7,
                pass_name: 'Day Pass',
                pass_description: 'Day Pass for Chuze Fitness',
                pass_price: 10
              }
            })
          }}>
          <Text style={{ color: theme.font }}>
            Try Premium Today!
          </Text>
        </Button>
      </Box>
    )
  };

  const missionStatement = () => {
    return (
      <Center>
        <Heading bold italic underline color={darkStyle ? 'white' : 'black'}> Our Mission: </Heading>
        <VStack mb="2.5" mt="1.5" direction="column" space={3}>
          <Text italic p="20" size="4xl" style={{ color: darkStyle ? 'white' : 'black' }}>
            This will be the mission statement and our long term goal
          </Text>
        </VStack>
      </Center>
    );
  }
  const UserName = () => {
    const user = currentUser.firstName;

    return (
      <Center>
        <VStack>
          <Heading size="lg" mb={4} p={8} pt={5} pb={5} color={darkStyle ? 'white' : 'black'}>
            Welcome {user}
          </Heading>
        </VStack>
      </Center>
    );
  }

  const options = [
    {
      title: 'Gym Passes',
      icon: 'wallet-membership',
      route: '/home/purchased_passes'
    },
    {
      title: 'Favorite Gyms',
      icon: 'cards-heart-outline',
      route: '/home/favorite_gyms',
    
    },
    {
      title: 'Map',
      icon: 'google-maps',
      route: '/home/map'
    },
    {
      title: 'Profile',
      icon: 'account',
      route: '/home/profile'
    },
    {
      title: 'Featured Gym',
      icon: 'weight-lifter',
      route: '/home/featured_gym',
    },
  ]

  function Navigation() {
    const navigation = StyleSheet.create({
      container: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 19
      },
      box: {
        display: 'flex',
        flexDirection: 'column-reverse',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 120,
        height: 120,
        borderWidth: 2,
        borderColor: theme.three,
        backgroundColor: theme.two,
        borderRadius: 15
      },
      font: {
        color: theme.font,
        fontSize: 17,
        textAlign: 'center',
        paddingBottom: 20,
        shadowOpacity: 0.1,
        shadowColor: darkMode? 'white': 'black'
      },
      icon: {
        paddingTop: 25,
        height: 80,
      }
    })

    return (
      <Box style={navigation.container}>
        {options.map((item, index) => (
          <Pressable onPress={() => {
            //add router here
            router.replace({
              pathname: item.route,
            })
            setBackButton([['route', '/home']])
          }}>
            {({isHovered, isPressed}) => (
            <Box style={[navigation.box, {transform: [{scale: isPressed ? 0.96 : 1}]}]} shadow={3} >
              <Text style={navigation.font}>{item.title}</Text>
              <Icon as={MaterialCommunityIcons} name={item.icon} size={'5xl'} color={theme.four} style={navigation.icon} shadow={3}/>
            </Box>
            )}
          </Pressable>
        ))}
      </Box>
    )
  }

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
      <Box style={{ flexDirection: 'row', paddingTop: 10, paddingLeft: 8 }} bgColor={theme.two} borderRadius={25} shadow={3}>
        <Box shadow={3}>
          <Avatar
            size='small'
            rounded
            activeOpacity={0.7}
            title={currentUser ? currentUser.firstName[0] : '?'}
            containerStyle={{ backgroundColor: theme.three }}
            onPress={() => {
              setIconPress({
                'Home': false,
                'Profile': true,
                'Map': false,
                'Pass': false
              })
              router.replace({
                pathname: '/home/profile'
              })

            }}
          />
        </Box>
        <Image source={require('../../assets/Banner.png')} style={{ resizeMode: 'contain', height: 25, marginLeft: -60, marginTop: 5 }} disabled/>
        <Image source={require('../../assets/dumbbell-icon.png')} style={{ height: 60, width: 60, marginLeft: -80, marginTop: -13, tintColor: theme.three }} disabled/>

      </Box>

      {currentUser && <UserName />}

      <Calendar
        style={{
          backgroundColor: theme.three,
          borderWidth: 3,
          borderColor: theme.two,
          height: 320,
          marginBottom: 20
        }}
        headerStyle={{
          backgroundColor: theme.three
        }}
        theme={{
          calendarBackground: theme.two,
          dayTextColor: theme.font,
          monthTextColor: theme.font,
          textSectionTitleColor: theme.font
        }}
        hideExtraDays={true}
        current={currentDateString}
      >
      </Calendar>
      <Navigation />
      <VStack mb="2.5" mt="1.5" direction="column" space={4} style={{ marginTop: 20 }}>
        {missionStatement()}
      </VStack>
    </ScrollView>

  );
}