import AsyncStorage from '@react-native-async-storage/async-storage'

const storeData = async (key, value) => {
    return new Promise ((resolve, reject) => {
        const jsonValue = JSON.stringify(value)
        AsyncStorage.setItem(key, jsonValue)
        .then(e => {
            console.log(key, 'stored successfully')
            resolve(e)
        })
        .catch(e => {
            reject(e)
        })
    })
}

const getData = async (key) => {
    return new Promise ((resolve, reject) => {
        AsyncStorage.getItem(key)
        .then(jsonValue => {
            if(jsonValue == null) console.log(key, 'not found.')
            resolve(jsonValue != null ? JSON.parse(jsonValue) : null)
        })
        .catch(error => reject(error))
    })
}

export {storeData, getData}
