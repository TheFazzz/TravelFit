import { Link, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { styles } from './styles';
import { useEffect, useRef, useState } from 'react'
import { useAuth } from '../contexts/AuthContext';
import { getData, storeData } from '../asyncStorage/asyncStorage';
import LoadingScreen from './layout/LoadingScreen';


export default function index() {
    const { currentUser, login } = useAuth()
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        loadLogin()
    }, [])

    async function loadLogin() {
        try {
            const loginData = await getData('login-data')
            if (loginData) {
                const { email, password } = loginData
                try {
                    await login(email, password)
                    router.replace('./home')
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
        }
    }

    return (
        <>
            {loading ?
                <LoadingScreen /> :
                <View style={styles.container}>
                    <Text>This is the index page</Text>
                    <StatusBar style="auto" />
                    <Link href='/home'>Home</Link>
                    {currentUser ?
                        <>
                            <Link href='/auth/Logout'>Log Out</Link>
                        </>
                        :
                        <Link href='/auth'>Authentication</Link>
                    }
                </View>
            }
        </>
    );
}


