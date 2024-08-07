import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getMessaging } from "firebase/messaging";

// firebaseConfig is the configuration object, containing the configuration settings for connecting to Firebase services, that is passed to initializeApp()
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase - this is the initialized Firebase application instance which can be used to access various Firebase services, such as Firestore, Authentication, Realtime Database, etc.
const FirebaseApp = initializeApp(firebaseConfig);

// TODO: Add more SDKs for Firebase products that we want to use
// https://firebase.google.com/docs/web/setup#available-libraries
export const db = getFirestore(FirebaseApp);

export const auth = getAuth(FirebaseApp);

// export const messaging = getMessaging(FirebaseApp);

// not used yet
// export const analytics = getAnalytics(FirebaseApp);
