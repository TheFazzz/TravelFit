import { Camera, CameraType } from 'expo-camera'
import { useState, useEffect } from 'react'
import { Button, StyleSheet, Text, TouchableOpacity, View, Box } from 'react-native'
import { BarCodeScanner } from 'expo-barcode-scanner'
import { useGym } from '../../contexts/GymContext';
import { router, useRouter } from 'expo-router';

export default function index() {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const { setLog } = useGym()
    const router = useRouter()

    useEffect(() => {
        const getBarCodeScannerPermissions = async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        };

        getBarCodeScannerPermissions();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);

        console.log(data)

        const dataObject = data.split(/,\s*/).reduce((obj, pair) => {
            const index = pair.indexOf(':');
            const key = pair.substring(0, index);
            const value = pair.substring(index + 1);
            obj[key] = isNaN(value) && !value.startsWith('http') ? value : (isNaN(value) ? value : Number(value));
            return obj;
        }, {});

        console.log(dataObject)

        setLog(prevState => ([...prevState, dataObject]))
        router.replace('/gym_user')
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    function QRCodeArea() {
        const area = StyleSheet.create({
            container: {
                position: 'absolute',
                borderColor: 'white',
                borderWidth: 5,
                width: 220,
                height: 220,
                left: '23%'
            }
        })

        return(
            <>
                <View style={area.container} shadow={1}>

                </View>
            </>
        )
    }

    return (
        <View style={styles.container}>
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
                />
            {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
            <QRCodeArea/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    camera: {
        flex: 1
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        margin: 64,
    },
    button: {
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
})