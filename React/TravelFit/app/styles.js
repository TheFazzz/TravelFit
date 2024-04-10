import { StyleSheet, Dimensions } from 'react-native';
import { useData } from '../contexts/DatabaseContext';
import { useEffect } from 'react';

let screenHeight = (Dimensions.get('window').height / 1);
let paddingleftandright = 15


export const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        // backgroundColor: '#AFE5E7',
        alignItems: 'center',
        justifyContent: 'center',
    },
    body: {
        paddingTop: 90,
        paddingLeft: paddingleftandright,
        paddingRight: paddingleftandright,
        flex: 1,
        // backgroundColor: '#AFE5E7',
        width: '100%',
        height: screenHeight * 2 * 2,
    },
    footer: {
        paddingLeft: paddingleftandright,
        paddingRight: paddingleftandright,
        bottom: 0,
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: 'lightgrey',
        width: '100%',
        height: '8%',
        justifyContent: 'center',
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        position: 'absolute',
        height: '100%',
        width: '100%'
    }
});