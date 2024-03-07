export async function findGymWithId(id) {
    try {
        const response = await fetch(`http://127.0.0.1:8000/gyms/${id}`);
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
        const response = await fetch(`http://127.0.0.1:8000/gyms/city/${city}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('error:', error);
    }
}

export async function getGymPassOptionsbyId(id) {
    return new Promise((resolve, reject) => {
        const body = {
            //add body content here
        }
        const requestOptions = {
            method: 'POST'
        }
        const url = `http://127.0.0.1:8000/gyms/${id}/guest-pass-options`

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

export async function purchaseGymPassByIdandPassOptionId(gym_id, pass_option_id, accessToken) {
    return new Promise((resolve, reject) => {
        const body = {
            //add body content here
        }
        const requestOptions = {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        }
        const url = `http://127.0.0.1:8000/gyms/${gym_id}/guest-passes/purchase?pass_option_id=${pass_option_id}`

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
        const response = await fetch(`http://127.0.0.1:8000/gyms/${gym_id}/photos`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('error:', error);
    }
}