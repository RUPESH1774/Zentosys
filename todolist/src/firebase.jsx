// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBQeTXofqE5RGE3fvDWqYF9UZIzQzkZUi0",
  authDomain: "to-do-list-c5587.firebaseapp.com",
  projectId: "to-do-list-c5587",
  storageBucket: "to-do-list-c5587.firebasestorage.app",
  messagingSenderId: "977076583993",
  appId: "1:977076583993:web:78ac4b70c1e3d935a2d7e8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)