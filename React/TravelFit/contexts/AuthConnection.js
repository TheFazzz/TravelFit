var jose = require('node-jose')

export async function loginWithEmailAndPassword(email, password) {
    const body = {
        email: email,
        password: password
    }

    fetch('http://127.0.0.1:8000/auth/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error))
}

export async function registerNewUser(first_name, last_name, email, password){
    const body = {
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: password
    }

    fetch('http://127.0.0.1:8000/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error))
}

export async function getAllUsers(){
    fetch('http://127.0.0.1:8000/auth/users', {method: 'POST'})
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error))
}