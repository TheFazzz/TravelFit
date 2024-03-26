import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, Text, TextInput, View, Button, Alert } from 'react-native';
// import { styles } from '../styles';
import { useRef } from 'react'
// import { useAuth } from '../contexts/AuthContext';
import { router, useLocalSearchParams } from 'expo-router';
import { useRouter } from 'expo-router';
import { useState } from 'react';

export default function purchaseScreen() {

  const router = useRouter()

  const [cardName, setCardName] = useState('');
  const [creditNum, setCreditNum] = useState('');
  const [cvv, setCvv] = useState('');
  const [expire, setExpire] = useState('');
  const [zip, setZip] = useState('');
  const [error, setError] = useState(null);

  function validString(string)
  {
    if(string.length == 0)
      return false;
    return true;
  }

  const handlePurchase = () => {

    if(!validString(cardName))
      setError('Card name is required');
    else if(!validString(creditNum))
      setError('Credit Card Number is required')
    else if(!validString(cvv))
      setError('CVV is required')
    else if(!validString(expire))
      setError('Expiration Date is required')
    else if(!validString(zip))
      setError('Zipcode is required')
    Alert.alert('Purchase Confirmed');
    router.replace('../home')
  }

  return (
    <View style={styles.container}>

      <View style={{ flexDirection: 'row', marginTop: 250 }}>
        <Text>Cardholder Name: </Text>
        <TextInput
          placeholder='Name'
          id='cardName'
          value={cardName}
          onChangeText={setCardName}
          style={styles.userinput}
          secureTextEntry={true}
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
          secureTextEntry={true}
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
          secureTextEntry={true}
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
          secureTextEntry={true}
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
          secureTextEntry={true}
          keyboardType='numeric'
        >
        </TextInput>
      </View>

      <Button 
      title='Confirm'
      onPress={() => {handlePurchase()}}
      ></Button>

{/* {error && <View>
              <Text>
                {error}
              </Text> */}

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