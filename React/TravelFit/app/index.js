import { Link, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { styles } from './styles';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useAuth } from '../contexts/AuthContext';
import { getData, storeData } from '../asyncStorage/asyncStorage';
import LoadingScreen from './layout/LoadingScreen';
import { useLayout } from './_layout';
import { context } from './_layout'

export default function index(props) {
    const { currentUser, login, loaded, setLoaded } = useAuth()
    const { setHeader, setFooter } = useContext(context)
    const router = useRouter()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!loaded) loadLogin()
        else {
            router.replace('/auth/Login')
            setLoading(false)
        }
    }, [])

    async function loadLogin() {
        try {
            const loginData = await getData('login-data')
            if (loginData) {
                const { email, password } = loginData
                try {
                    const userRole = await login(email, password)
                    if (userRole == 'User') {
                        setHeader(true)
                        setFooter(true)
                        router.replace('/home')
                    }
                    else if (userRole == 'Gym') router.replace('/gym_user')
                } catch (error) {
                    console.error('error logging in')
                    storeData('login-data', null)
                }
            } else {
                router.replace('/auth/Login')
            }
        } catch (error) {
            console.error('login not found')
            storeData('login-data', null)
        } finally {
            setLoading(false)
            setLoaded(true)
        }
    }

    return (
        <>
            {loading ?
                <LoadingScreen /> :
                <View style={styles.container}>
                    <StatusBar style="auto" />
                    {currentUser ?
                        <>
                            <Link href='/auth/Logout'>Log Out</Link>
                        </>
                        :
                        <>
                            <Link href='/auth/Login'>Login</Link>
                            <Link href='/auth/Signup'>Sign Up</Link>
                            <Link href='/auth/ForgotPassword'>Forgot Password?</Link>
                        </>
                    }
                </View>
            }
        </>
    );
}


