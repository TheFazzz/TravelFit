import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    body: {
        flex: 1,
        backgroundColor: 'lightgrey',
        width: '100%',
        height: '86%',
        marginTop: '8%',
        marginBottom: '8%'
    },
    header: {
        position: 'absolute',
        top: 0,
        backgroundColor: 'grey',
        width: '100%',
        height: '8%',
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        paddingLeft: '5px',
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        gap: '20px',
        backgroundColor: 'grey',
        width: '100%',
        height: '8%',
    }
});