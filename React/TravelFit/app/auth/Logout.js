import React, { useContext, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { useAuth } from '../../contexts/AuthContext';
import { storeData } from '../../asyncStorage/asyncStorage';
import { context } from '../_layout';

export default function Logout() {
    const router = useRouter()
    const { logout } = useAuth()
    const {setFooter, setHeader} = useContext(context)

    
    useEffect(() => {
        storeData('login-data', null)
        setFooter(false)
        setHeader(false)
        logout()
        router.replace('/')
    },[])
    
  return 
}
