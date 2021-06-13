import firebase from 'firebase';
import "firebase/auth";

const firebaseOptions = {
  apiKey: "AIzaSyDUb4JyzHi-O3tXwFA3SQIOX2E-Re9DcQc",
  authDomain: "patients-app-3793c.firebaseapp.com",
  projectId: "patients-app-3793c",
  storageBucket: "patients-app-3793c.appspot.com",
  messagingSenderId: "880629249838",
  appId: "1:880629249838:web:d081d98a77eb883ff16cbf",
  databaseURL: "",
}
const fire = firebase.initializeApp(firebaseOptions);
export default fire;


export const auth = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider()
export const signInWithGoogle = async () => {
  try {
    return await auth.signInWithPopup(googleProvider)
  } catch (error) {
    console.log(error.message)
    return false;
  }
}
