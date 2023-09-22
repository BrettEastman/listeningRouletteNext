import { FirebaseApp } from "../config";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  getDocs,
  collection,
} from "firebase/firestore";

const db = getFirestore(FirebaseApp);

export async function getAlbums() {
  try {
    const querySnapshot = await getDocs(collection(db, "lr"));
    const data = [];
    querySnapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });
    console.log("data:", data);
    return { data, error: null };
  } catch (error) {
    console.error("Error from getAlbums:", error);
    return { data: null, error: error.message };
  }
}

export async function getMessages() {
  try {
    const querySnapshot = await getDocs(collection(db, "messages"));
    const data = [];
    querySnapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });
    console.log("data:", data);
    return { data, error: null };
  } catch (error) {
    console.error("Error from getMessages:", error);
    return { data: null, error: error.message };
  }
}

export async function getDocument(filepath) {
  try {
    const docRef = doc(db, filepath);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { data: docSnap.data(), error: null };
    } else {
      return { data: null, error: "Document does not exist" };
    }
  } catch (error) {
    console.error("Error from getDocument:", error);
    return { data: null, error: error.message };
  }
}

export async function addData(collection, id, data) {
  try {
    const docRef = doc(db, collection, id);
    const result = await setDoc(docRef, data, {
      merge: true,
    });
    console.log("addData successful, data: ", data);
    return { result, error: null };
  } catch (error) {
    console.error("addData error:", error);
    return { result: null, error: error.message };
  }
}
