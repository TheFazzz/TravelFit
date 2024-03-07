import React, { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { useAuth } from '../../contexts/AuthContext';

export default function Logout() {
    const router = useRouter()
    const { logout } = useAuth()

    useEffect(() => {
        logout()
        router.replace('/')
    },[])
    
  return 
}
