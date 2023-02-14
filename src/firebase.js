// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyDEbmGe8T6rYOB2SxELvkPLbOpHqd7b0fk",
	authDomain: "vote-vto.firebaseapp.com",
	projectId: "vote-vto",
	storageBucket: "vote-vto.appspot.com",
	messagingSenderId: "1060277255568",
	appId: "1:1060277255568:web:bc8487a7daad7c5ced0715",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
