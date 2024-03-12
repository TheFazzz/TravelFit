import React, { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { useAuth } from '../../contexts/AuthContext';
import { storeData } from '../../asyncStorage/asyncStorage';

export default function Logout() {
    const router = useRouter()
    const { logout } = useAuth()
    storeData('login-data', null)

    useEffect(() => {
        logout()
        router.replace('/')
    },[])
    
  return 
}
