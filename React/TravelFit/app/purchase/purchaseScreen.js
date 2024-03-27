import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, Text, TextInput, View, Button, Alert } from 'react-native';
// import { styles } from '../styles';
import { useRef } from 'react'
import { useAuth } from '../../contexts/AuthContext';
import { router, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState, useEffect } from 'react';

export default function purchaseScreen() {

  const router = useRouter()
  const query = useLocalSearchParams()

  const [cardName, setCardName] = useState('');
  const [creditNum, setCreditNum] = useState('');
  const [cvv, setCvv] = useState('');
  const [expire, setExpire] = useState('');
  const [zip, setZip] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false)

  const { purchasePass } = useAuth()
  const { city, gym_name, gym_id, pass_id, pass_description, pass_name, pass_price } = query

  async function gatherData(){
    console.log(query)
  }

  useEffect(() => {
    gatherData()
  }, [])


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
    else if (!validString(zip))
      setError('Zip code is required')
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

  return (
    <View style={styles.container}>

      <Text style={{ fontSize: 26 }}>
        Credit Card Payment
      </Text>

      <Text>{gym_name}, {city} - {pass_name} - ${pass_price}</Text>

      <View style={{ flexDirection: 'row', marginTop: 100 }}>
        <Text>Cardholder Name: </Text>
        <TextInput
          placeholder='Name'
          id='cardName'
          value={cardName}
          onChangeText={setCardName}
          style={styles.userinput}
        >
        </TextInput>
      </View>

      <View style={{ flexDirection: 'row' }}>
        <Text>Credit Card #: </Text>
        <TextInput
          placeholder='Credit Card #'
          id='creditNum'
          value={creditNum}
          onChangeText={setCreditNum}
          style={styles.userinput}
          keyboardType='numeric'
        >
        </TextInput>
      </View>

      <View style={{ flexDirection: 'row' }}>
        <Text>CVV: </Text>
        <TextInput
          placeholder='CVV'
          id='cvv'
          value={cvv}
          onChangeText={setCvv}
          style={styles.userinput}
          keyboardType='numeric'
        >
        </TextInput>
      </View>

      <View style={{ flexDirection: 'row' }}>
        <Text>Expiration Date: </Text>
        <TextInput
          placeholder='Expiration Date'
          id='expDate'
          value={expire}
          onChangeText={setExpire}
          style={styles.userinput}
          keyboardType='numeric'
        >
        </TextInput>
      </View>

      <View style={{ flexDirection: 'row' }}>
        <Text>Zip Code: </Text>
        <TextInput
          placeholder='Zip Code'
          id='zipCode'
          value={zip}
          onChangeText={setZip}
          style={styles.userinput}
          keyboardType='numeric'
        >
        </TextInput>
      </View>

      <Button
        title='Confirm'
        onPress={() => { handlePurchase() }}
      ></Button>

      {error && <View>
        <Text style={{ padding: 15, color: 'red' }}>
          {error}
        </Text>
      </View>}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    // flex: 1,
    backgroundColor: 'silver',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  userinput: {
    overflow: 'hidden',
    border: '1px solid black',
    padding: '5px',
    borderRadius: 15,
    marginBottom: '10px',
    textAlignVertical: 'top',
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