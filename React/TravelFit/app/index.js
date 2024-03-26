import { Link, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { styles } from './styles';
import { useEffect, useRef, useState } from 'react'
import { useAuth } from '../contexts/AuthContext';
import { getData, storeData } from '../asyncStorage/asyncStorage';
import LoadingScreen from './layout/LoadingScreen';


export default function index(props) {
    const { currentUser, login, loaded, setLoaded } = useAuth()
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        if (!loaded) loadLogin()
        else setLoading(false)
    }, [])

    async function loadLogin() {
        try {
            const loginData = await getData('login-data')
            if (loginData) {
                const { email, password } = loginData
                try {
                    const userRole = await login(email, password)
                    if (userRole == 'User') router.replace('/home')
                    else if (userRole == 'Gym') router.replace('/gym_user')
                } catch (error) {
                    console.error('error logging in')
                    storeData('login-data', null)
                }
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


