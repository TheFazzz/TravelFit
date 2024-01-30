import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { styles } from './styles';

export default function index() {
    return (
        <View style={styles.container}>
            <Text>This is the index page, please click 'home'</Text>
            <StatusBar style="auto" />
            <Link href='/home'>
                Home
            </Link>
        </View>
    );
}
