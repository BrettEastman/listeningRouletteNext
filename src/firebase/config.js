// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";
// import { getAnalytics } from "firebase/compat/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// firebaseConfig is the configuration object that is passed to initializeApp()
// It is an object that contains the configuration settings required to connect your web application to Firebase services.
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// const FirebaseApp = initializeApp(firebaseConfig);

// const db = getFirestore(FirebaseApp);
export const FirebaseApp = initializeApp(firebaseConfig);

const firestore = getFirestore(FirebaseApp);

const specialAlbum = doc(firestore, "lr/2021-09-14");

function writeSpecialAlbum() {
  const docData = {
    name: "Special Album",
    album: "greatest-hits",
  };
  setDoc(specialAlbum, docData);

  console.log("Special album written");
}

writeSpecialAlbum();

// Initialize Firebase - this is the initialized Firebase application instance
// Once initialized, this instance can be used to access various Firebase services, such as Firestore, Authentication, Realtime Database, and more.

// By initializing Firebase with initializeApp, you set up a connection between your web application and Firebase services, allowing you to interact with Firebase features like real-time data synchronization, user authentication, and cloud functions.

// Get analytics
// export const analytics = getAnalytics(FirebaseApp);
