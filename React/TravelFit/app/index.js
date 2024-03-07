import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { styles } from './styles';
import { useRef } from 'react'
import { useAuth } from '../contexts/AuthContext';

export default function index() {
    const { currentUser } = useAuth()
    
    return (
        <View style={styles.container}>
            <Text>This is the index page</Text>
            <StatusBar style="auto"/>
            <Link href='/home'>Home</Link>
            {currentUser? 
                <>
                <Link href='/auth/Logout'>Log Out</Link>
                </>
                :
                <Link href='/auth'>Authentication</Link>
            }
        </View>
    );
}
