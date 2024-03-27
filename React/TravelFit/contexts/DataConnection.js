import { Platform } from "react-native"
let URL
if (Platform.OS == 'ios') {
    URL = `http://127.0.0.1:8000`
} else if (Platform.OS == 'android') {
    URL = `http://10.0.2.2:8000`
}

export async function findGymWithId(id) {
    try {
        const response = await fetch(`${URL}/gyms/${id}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('error:', error);
    }
}

export async function gatherAllGyms(city){
    try {
        const response = await fetch(`${URL}/gyms/city/${city}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('error:', error);
    }
}

export async function getNearbyGyms(latitude, longitude, radius_in_meters) {
    return new Promise((resolve, reject) => {
        const body = {
            latitude: latitude,
            longitude: longitude,
            radius_in_meters: radius_in_meters
        }
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body) 
        }

        const url = `${URL}/getNearbyGyms`

        fetch(url, requestOptions)
        .then(response => response.json())
        .then(data => {
            if (data.detail != null) reject(data.detail)
            else resolve(data)
        })
        .catch(error => reject(error))
    })
}

export async function getGymPassOptionsbyId(id) {
    return new Promise((resolve, reject) => {
        const requestOptions = {
            method: 'GET'
        }
        const url = `${URL}/gyms/${id}/guest-pass-options`

        fetch(url, requestOptions)
        .then(response => response.json())
        .then(data => {
            resolve(data)
        })
        .catch(error => {
            reject(error)
        })
    })
}



export async function getGymPhotosbyId(id){
    try {
        const response = await fetch(`${URL}/gyms/${id}/photos`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('error:', error);
    }
}