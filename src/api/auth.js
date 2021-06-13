import axios, {validateResponseCode} from './config';

// Sets global axios token
export const updateAxiosToken = (token) => {
  if (!token) {
    console.log("Clearing axios token", token);
    axios.defaults.headers.common['Authorization'] = '';
  } else {
    console.log("updating axios token", token);
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
  }
};

// Uses idToken and fcmToken obtained after using any of the methods for firebase auth
export const firebaseGoogleAuth = async (idToken, fcmToken='') => {
  try {
    let response = await axios.post('/register/googleAuth', {
      idToken,
      fcmToken,
    });
    if (validateResponseCode(response.status)) {
      return response.data;
    } else
      return false;
  } catch (error) {
    console.log(error);
    return false;
  }
}
