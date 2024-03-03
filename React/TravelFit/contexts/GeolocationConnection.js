import * as Location from 'expo-location';

export async function getLocationPermission() {
    let { status } = await Location.requestForegroundPermissionsAsync()
    if (status !== 'granted') {
        alert('Permission to access location was denied')
        return
    }
}

export async function getCurrentLocation() {
    try {
        let { status } = await Location.requestForegroundPermissionsAsync()
        if (status !== 'granted') {
            alert('Permission to acces location was denied')
            return
        }
        let location = await Location.getCurrentPositionAsync({})
        const {latitude, longitude} = location.coords

        return location.coords
    } catch (error) {
        console.error(error)
    }
}