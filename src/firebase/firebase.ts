// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD0JQjYrRhuWc0rlqMsTT2JFT0SkIY-Jqc",
    authDomain: "wheelbus-cu.firebaseapp.com",
    projectId: "wheelbus-cu",
    storageBucket: "wheelbus-cu.appspot.com",
    messagingSenderId: "634435389337",
    appId: "1:634435389337:web:25361435723e93bdd23508"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {
    auth
};

