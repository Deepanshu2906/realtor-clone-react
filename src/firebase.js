// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: "AIzaSyBiCmKE_AK2wkSRJbdOpM79WGG5itnWfiE",
//   authDomain: "realtor-clone-react-2d86c.firebaseapp.com",
//   projectId: "realtor-clone-react-2d86c",
//   storageBucket: "realtor-clone-react-2d86c.appspot.com",
//   messagingSenderId: "316495444379",
//   appId: "1:316495444379:web:c488878d6692a97d94893e"
// };

// // Initialize Firebase
// initializeApp(firebaseConfig);

// export const db = getFirestore();

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCZfaikGo91PVF7AomG3J55PsSCQXWJ8ek",
  authDomain: "real-estate-clone.firebaseapp.com",
  projectId: "real-estate-clone",
  storageBucket: "real-estate-clone.appspot.com",
  messagingSenderId: "239556779287",
  appId: "1:239556779287:web:9f17cdb02bcc468ff12b52",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();
