import URL from "./SetUrl";

export async function PostVerifyPass(pass_id, user_id, gym_id, pass_name, duration) {
    return new Promise((resolve, reject) => {
        const body = {
            pass_id: pass_id,
            user_id: user_id,
            gym_id: gym_id,
            pass_name: pass_name,
            duration: duration
        }

        fetch(`${URL}/verify-pass`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        })
        .then(response => response.json())
        .then(data => {
            resolve(data)
        })
        .catch(error => {
            reject(error)
        })
    })
}