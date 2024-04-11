import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, Text, TextInput, View, Alert, Image } from 'react-native';
import { Input, Button, theme } from 'native-base';
import { useContext, useRef } from 'react'
import { useFonts } from 'expo-font'
import { useAuth } from '../../contexts/AuthContext';
import { router, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { context } from '../_layout';

export default function purchaseScreen() {
  const [fontsLoaded, fontError] = useFonts({
    'CREDC': require('../../assets/fonts/CREDC.ttf')
  })

  const router = useRouter()
  const query = useLocalSearchParams()

  const [cardName, setCardName] = useState('');
  const [creditNum, setCreditNum] = useState('');
  const [cvv, setCvv] = useState('');
  const [expire, setExpire] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false)

  const {darkStyle, theme} = useContext(context)

  const { purchasePass } = useAuth()
  const { city, gym_name, gym_id, pass_id, pass_description, pass_name, pass_price } = query

  function validString(string) {
    if (string.length == 0)
      return false;
    return true;
  }

  async function handlePurchase() {
    if (!validString(cardName))
      setError('Card name is required');
    else if (!validString(creditNum))
      setError('Credit Card Number is required')
    else if (!validString(cvv))
      setError('CVV is required')
    else if (!validString(expire))
      setError('Expiration Date is required')
    else {
      try {
        const returnStatement = await purchasePass(gym_id, pass_id)
        Alert.alert('Purchase Confirmed');
      } catch (error) {
        console.error(error)
      }
      router.replace('../home')
    }
  }

  function Card() {
    const card = StyleSheet.create({
      view: {
        backgroundColor: 'darkgrey',
        width: 360,
        height: 180,
        borderRadius: 15,
        marginTop: 25
      },
      chip: {
        width: 130,
        height: 45,
        top: 55,
        left: -5
      },
      numbers: {
        color: 'white',
        fontFamily: 'CREDC',
        fontSize: 20,
        top: 75,
        left: 25
      }
    })

    return(
      <View style={card.view}> 
        <Image source={require('../../assets/card-chip.png')} style={card.chip}/>
        <Text style={card.numbers}>0000 0000 0000 0000</Text>
      </View>
    )
  }
  
  function Error() {
    return (
      <>
        {error && <View>
          <Text style={{ padding: 15, color: 'red' }}>
            {error}
          </Text>
        </View>}
      </>
    )
  }
  
  function Header() {
    const header = StyleSheet.create({
      checkout: {
        fontSize: 30,
        color: darkStyle? 'white' : 'black',
      },
      subTitle: {
        color: darkStyle? 'white' : 'black',
      },
      container: {
        display: 'flex',
        gap: 3
      }
    })
    
    return (
      <View style={header.container}>
        <Text style={header.checkout}>
          Checkout
        </Text>
        <Text style={header.subTitle}>
          {gym_name}, {city} - {pass_name} - ${pass_price}
        </Text>
      </View>
    )
  }
  
  function ConfirmButton() {
    const button = StyleSheet.create({
      container: {
        marginTop: 30,
        borderRadius: 30,
      },
      text: {
        color: 'white',
        fontSize: 20
      }
    })
    
    return(
      <Button
      onPress={() => { handlePurchase() }}
      style={button.container}
      bgColor={theme.two}
      >
          <Text style={button.text}>
            Pay now
          </Text>
        </Button>
    )
  }
  
  function TotalAmount() {
    const amount = StyleSheet.create({
      view: {
        paddingTop: 60,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      text: {
        color: theme.font,
        fontSize: 19
      },
      price: {
        color: theme.font,
        fontSize: 27,
      }
    })
    
    const price = parseInt(`${pass_price}`).toFixed(2)
    
    return(
      <View style={amount.view}>
        <Text style={amount.text}>
          Total Amount
        </Text>
        <Text style={amount.price}>
          ${price}
        </Text>
      </View>
    )
  }

  const form = StyleSheet.create({
    container: {
      paddingTop: 40,
      display: 'flex',
      gap: 30
    },
    userinput: {
      overflow: 'hidden',
      border: '1px solid black',
      padding: '5px',
      borderRadius: 15,
      marginBottom: '10px',
      textAlignVertical: 'top',
      color: theme.font
    },
    section: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      gap: 3
    },
    subSection: {
      width: '45%',
      display: 'flex',
      flexDirection: 'row',
      gap: 34
    },
    header: {
      fontSize: 19,
      color: theme.font
    }
  })
  
  return (
    <View style={styles.container}>

      <Header/>
      <Card/>

      <View style={form.container}>
        <View style={form.section}>
          <Text style={form.header}>Cardholder Name</Text>
          <Input
            placeholder='John Doe'
            id='cardName'
            variant={'underlined'}
            value={cardName}
            onChangeText={setCardName}
            style={form.userinput}
            autoCapitalize='none'
            
            >
          </Input>
        </View>

        <View style={form.section}>
          <Text style={form.header}>Card number</Text>
          <Input
            placeholder='0000 0000 0000 0000'
            id='creditNum'
            value={creditNum}
            variant={'underlined'}
            onChangeText={setCreditNum}
            style={form.userinput}
            keyboardType='numeric'
            autoCapitalize='none'
            
            >
          </Input>
        </View>

        <View style={form.subSection}>
          <View style={form.section}>
            <Text style={form.header}>Exp date </Text>
            <Input
              placeholder='MM/YY'
              id='expDate'
              variant={'underlined'}
              value={expire}
              onChangeText={setExpire}
              style={form.userinput}
              autoCapitalize='none'
              keyboardType='numeric'
              >
            </Input>
          </View>

          <View style={form.section}>
            <Text style={form.header}>CVV </Text>
            <Input
              placeholder='123'
              id='cvv'
              value={cvv}
              variant={'underlined'}
              onChangeText={setCvv}
              style={form.userinput}
              keyboardType='numeric'
              autoCapitalize='none'
              >
            </Input>
          </View>
        </View>
      </View>

      <TotalAmount/>
      <ConfirmButton/>
      <Error />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: 'silver',
    padding: 20,
  },
  signUpButton: {
    overflow: 'hidden',
    backgroundColor: '#89CFF0',
    // borderRadius: 15,
    color: 'white',
    paddingVertical: '5px',
    paddingHorizontal: '25px',
    textAlign: 'center',
    width: 100,
    height: 25,
  },
});

