import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, Text, TextInput, View } from 'react-native';
// import { styles } from '../styles';
import { useRef } from 'react'
// import { useAuth } from '../contexts/AuthContext';

export default function purchaseScreen() {

    return (
        <View style={styles.container}>
            
            <View style={{flexDirection: 'row', marginTop: 250}}>
                <Text>Cardholder Name: </Text>
                <TextInput 
                placeholder='Name' 
                id='cardName' 
                style={styles.userinput} 
                secureTextEntry={true}
              >
            </TextInput> 
            </View>

            <View style={{flexDirection: 'row'}}>
                <Text>Credit Card #: </Text>
                <TextInput 
                placeholder='Credit Card #' 
                id='creditNum' 
                style={styles.userinput} 
                secureTextEntry={true}
                keyboardType='numeric'
              >
            </TextInput> 
            </View>

            <View style={{flexDirection: 'row'}}>
                <Text>CVS: </Text>
                <TextInput 
                placeholder='CVS' 
                id='cvs' 
                style={styles.userinput} 
                secureTextEntry={true}
                keyboardType='numeric'
              >
            </TextInput> 
            </View>

            <View style={{flexDirection: 'row'}}>
                <Text>Expiration Date: </Text>
                <TextInput 
                placeholder='Expiration Date' 
                id='expDate' 
                style={styles.userinput} 
                secureTextEntry={true}
                keyboardType='numeric'
              >
            </TextInput> 
            </View>

            <View style={{flexDirection: 'row'}}>
                <Text>Zip Code: </Text>
                <TextInput 
                placeholder='Zip Code' 
                id='zipCode' 
                style={styles.userinput} 
                secureTextEntry={true}
                keyboardType='numeric'
              >
            </TextInput> 
            </View>
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