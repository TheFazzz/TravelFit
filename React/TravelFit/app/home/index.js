import React from 'react'

import { Pressable, StyleSheet, Text, View } from 'react-native';
import { styles } from '../styles'
import { useData } from '../../contexts/DatabaseContext';
import {Avatar, Center, Heading, Flex, Alert, Box, Button, NativeBaseProvider, VStack, Link, HStack} from 'native-base'
import { useAuth } from '../../contexts/AuthContext';

export default function index() {
  const { requestLocationPermission } = useData()
  const { currentUser } = useAuth()
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
                        <Button size="md" variant="link" p={-3}>
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

      <Button onPress={() => console.log("change this to diff page")}>Try Premium Today!</Button>
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
            {user}
          </Heading>
        </VStack>
      </Center>
    );
  }

  //<UserName/>
  return (
    <Center >
      <Heading style={{  }} size="lg" mb={4} p={6} >
        Welcome! 
      </Heading>
      <Heading>
        {currentUser && <UserName />}
      </Heading>

      <Avatar bg={'green.100'} size={"lg"}> </Avatar>
      {premium()}
      {existingPasses()}
      <VStack mb="2.5" mt="1.5" direction="column" space={4}>
        {missionStatement()}
      </VStack>
    </Center>

  );
}