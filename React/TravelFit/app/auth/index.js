import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';


export default function index() {
  return (
    <View>
        <Link href='/auth/Login'>Login</Link>
        <Link href='/auth/Signup'>Sign Up</Link>
        <Link href='/auth/ForgotPassword'>Forgot Password?</Link>
    </View>
  )
}
