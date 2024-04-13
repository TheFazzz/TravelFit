import { Platform } from "react-native"

let URL

if (Platform.OS == 'ios') {
    //URL = `http://127.0.0.1:8000`
    URL = `https://travelfit.azurewebsites.net/`
} else if (Platform.OS == 'android') {
    URL = `http://10.0.2.2:8000`
}

export async function loginWithEmailAndPassword(email, password) {
    return new Promise((resolve, reject) => {
        const body = {
            email: email,
            password: password
        }

        fetch(`${URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'accept' : 'application/json'
            },
            body: JSON.stringify(body)
        })
        .then(response => response.json())
        .then(data => {
            if (data.access_token != null) {
                resolve(data)
            }
            else reject(`Login Error: ${data.detail}`)
        })
        .catch(error => {
            console.error(error)
            reject(error)
        })
    })
}
    
export async function registerNewUser(first_name, last_name, email, password){
    return new Promise((resolve, reject) => {
        const body = {
            first_name: first_name,
            last_name: last_name,
            email: email,
            password: password
        }
    
        fetch(`${URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        .then(response => response.json())
        .then(data => {
            if (data.id != null) {
                resolve(data)
            } else {
                reject(data.detail)
            }
        })
        .catch(error => {
            reject(error)
        })
    })
    }

export async function getAllUsers(){
    fetch(`${URL}/auth/users`, {method: 'POST'})
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error))
}

export async function purchaseGymPassByIdandPassOptionId(gym_id, pass_option_id, accessToken) {
    return new Promise((resolve, reject) => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        }
        const url = `${URL}/gyms/${gym_id}/guest-passes/purchase?pass_option_id=${pass_option_id}`

        fetch(url, requestOptions)
        .then(response => response.json())
        .then(data => {
            if (data.detail) {
                reject(data.detail)
            }
            resolve(data)
        })
        .catch(error => {
            reject(error)
        })
    })
}

export async function getUserPasses(accessToken, user_id) {
    return new Promise((resolve, reject) => {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-type': 'application/json'
            }
        }
        const url = `${URL}/guest-passes/user_id`

        fetch(url, requestOptions)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            if (data.detail) {
                reject(data.detail)
            }
            else resolve(data)
        })
        .catch(error => {
            reject(error)
        })
    })
}