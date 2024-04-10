import React, { useContext, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { useAuth } from '../../contexts/AuthContext';
import { storeData } from '../../asyncStorage/asyncStorage';
import { context } from '../_layout';

export default function Logout() {
    const router = useRouter()
    const { logout } = useAuth()
    const {setFooter, setHeader, setBackground} = useContext(context)

    
    useEffect(() => {
        storeData('login-data', null)
        setFooter(false)
        setHeader(false)
        setBackground(true)
        logout()
        router.replace('/')
    },[])
    
  return 
}
