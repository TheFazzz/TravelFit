import { StyleSheet, Dimensions } from 'react-native';
let screenHeight = (Dimensions.get('window').height / 1);

let paddingleftandright = 15

export const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        backgroundColor: 'silver',
        alignItems: 'center',
        justifyContent: 'center',
    },
    body: {
        paddingLeft: paddingleftandright,
        paddingRight: paddingleftandright,
        flex: 1,
        backgroundColor: 'lightgrey',
        width: '100%',
        height: screenHeight * 2 * 2,
    },
    header: {
        paddingLeft: paddingleftandright,
        paddingRight: paddingleftandright,
        top: 0,
        backgroundColor: 'grey',
        width: '100%',
        height: '11%',
    },
    footer: {
        paddingLeft: paddingleftandright,
        paddingRight: paddingleftandright,
        bottom: 0,
        display: 'flex',
        flexDirection: 'row',
        gap: '20px',
        backgroundColor: 'grey',
        width: '100%',
        height: '8%',
    }
});