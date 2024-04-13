import { Platform } from "react-native"
let URL

if (Platform.OS == 'ios') {
    //URL = `http://127.0.0.1:8000`
    URL = `https://travelfit.azurewebsites.net/`
} else if (Platform.OS == 'android') {
    URL = `http://10.0.2.2:8000`
}

export default URL
