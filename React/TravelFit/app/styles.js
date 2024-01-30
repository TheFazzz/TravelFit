import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    body: {
        backgroundColor: 'lightgrey',
        width: '100%',
        height: '86%',
    },
    header: {
        backgroundColor: 'grey',
        width: '100%',
        height: '8%',
    },
    footer: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        gap: '20px',
        backgroundColor: 'grey',
        width: '100%',
        height: '8%',
    }
});