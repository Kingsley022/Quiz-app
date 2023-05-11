// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyD86SPL4frJDm8a3h5b6yYcMUfVj-AiMkY",
  authDomain: "quizzy-app-812bb.firebaseapp.com",
  projectId: "quizzy-app-812bb",
  storageBucket: "quizzy-app-812bb.appspot.com",
  messagingSenderId: "209294205978",
  appId: "1:209294205978:web:ff465e417a183cb8841da3",
  measurementId: "G-89670B5JM0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();