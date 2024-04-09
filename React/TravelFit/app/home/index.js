import React, { useContext, useEffect } from 'react'

import { Pressable, StyleSheet, Text, View, ScrollView } from 'react-native';
import { styles } from '../styles'
import { useData } from '../../contexts/DatabaseContext';
import {Center, Heading, Flex, Alert, Box, Button, NativeBaseProvider, VStack, Link, HStack} from 'native-base'
import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'expo-router';
import { context } from '../_layout';
import {Avatar} from 'react-native-elements'
import {Calendar} from 'react-native-calendars'

export default function index() {
  const { requestLocationPermission } = useData()
  const { currentUser } = useAuth()
  const router = useRouter()
  const { removeBackground, setBackButton, setFooter } = useContext(context) 
  const currentDate = new Date();
  const currentDateString = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1)
    .toString()
    .padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;

  useEffect(() => {
    removeBackground()
    setFooter(true)
    setBackButton([])
  }, [])

  requestLocationPermission()

  function existingPasses() {
    return (
      <Box alignItems="center">
        <Pressable maxW="96">
          {({ isHovered, isFocused, isPressed }) => {
            return (
              <Box
                bg={isPressed ? "coolGray.200" : isHovered ? "coolGray.200" : "coolGray.100"}
                style={{ transform: [{ scale: isPressed ? 0.96 : 1 }] }}
                p="5"
                rounded="8"
                shadow={3}
                borderWidth="1"
                borderColor="coolGray.300">
                <Heading>
                  Gym Passes
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
                            router.replace('/home/purchased_passes')
                          }}
                          >
                         3 passes
                        </Button>
                      </Link>
                    </Text>
                  }
                </Flex>
              </Box>
              )}}
        </Pressable>
      </Box>
    )
  }


  const premium = () => {
    return <Box bg={{
      linearGradient: {
        colors: [`lightblue.300`, `violet.800`],
        start: [0, 0],
        end: [1, 0]
      }
    }} p={10} rounded="xl" _text={{
      fontSize: `xl`,
      fontWeight: `medium`,
      color: `emerald.50`,
      textAlign: `center`,
      lineHeight: `60px`
    }}>

      <Button onPress={() => {
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
          Try Premium Today!
      </Button>
    </Box>
  };

  const missionStatement = () => {
    return (
      <Center>
        <Heading bold italic underline > Our Mission: </Heading>
        <VStack mb="2.5" mt="1.5" direction="column" space={3}>
          <Text italic p="20" size="4xl">
            This will be the mission statement and our long term goal
          </Text>
        </VStack>
      </Center>
    );
  }
  const UserName = () => {
    const user = currentUser.firstName;
    console.log(currentUser)

    return (
      <Center>
        <VStack>
          <Heading size="lg" mb={4} p={8}>
            Welcome {user}
          </Heading>
        </VStack>
      </Center>
    );
  }

  return (
    <ScrollView>
      <Avatar 
        size='small'
        rounded
        activeOpacity={0.7}
        title={currentUser ? currentUser.firstName[0] : '?'}
        containerStyle={{backgroundColor: 'lightblue'}}
        onPress={()=> {router.replace({pathname: '/profile/index'})}} //Fix Path to Profile page
      />

      {currentUser && <UserName />}

      <Calendar current={currentDateString} />

      {premium()}
      {existingPasses()}
      <VStack mb="2.5" mt="1.5" direction="column" space={4}>
        {missionStatement()}
      </VStack>
    </ScrollView>

  );
}