import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { styles } from './styles';
import { useRef } from 'react'

export default function index() {

    return (
        <View style={styles.container}>
            <Text>This is the index page</Text>
            <StatusBar style="auto"/>
            <Link href='/home'>Home</Link>
            <Link href='/auth'>Authentication</Link>
        </View>
    );
}
