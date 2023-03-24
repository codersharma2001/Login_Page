import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { RecaptchaVerifier } from "firebase/auth";


// const provider = new GoogleAuthProvider();

const firebaseConfig = {
  apiKey: "AIzaSyD5HG3x_P0gKfSdQ9D3UKA48xP72_wMl-s",
  authDomain: "gtl-round-1.firebaseapp.com",
  projectId: "gtl-round-1",
  storageBucket: "gtl-round-1.appspot.com",
  messagingSenderId: "64625507217",
  appId: "1:64625507217:web:9862cdbfe8e01b7dd37830",
  measurementId: "G-JJ4BHQWGRE",
  // recaptchaSiteKey: "6LezsCUlAAAAAIC0m1Y8xx7QkT44KC9BRb95hSX2",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, RecaptchaVerifier , firebaseConfig };
