import { StyleSheet, Dimensions } from 'react-native';
let screenHeight = (Dimensions.get('window').height / 1);

let paddingleftandright = 15

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: screenHeight * 1.2,
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
        height: '86%',
        marginTop: '8%',
        marginBottom: '8%'
    },
    header: {
        paddingLeft: paddingleftandright,
        paddingRight: paddingleftandright,
        position: 'absolute',
        bottom: screenHeight * 0.85,
        backgroundColor: 'grey',
        width: '100%',
        height: '13%',
    },
    footer: {
        paddingLeft: paddingleftandright,
        paddingRight: paddingleftandright,
        position: 'absolute',
        top: screenHeight * 0.85,
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        gap: '20px',
        backgroundColor: 'grey',
        width: '100%',
        height: '10%',
    }
});