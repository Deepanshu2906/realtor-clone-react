// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBiCmKE_AK2wkSRJbdOpM79WGG5itnWfiE",
  authDomain: "realtor-clone-react-2d86c.firebaseapp.com",
  projectId: "realtor-clone-react-2d86c",
  storageBucket: "realtor-clone-react-2d86c.appspot.com",
  messagingSenderId: "316495444379",
  appId: "1:316495444379:web:c488878d6692a97d94893e"
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const db = getFirestore();