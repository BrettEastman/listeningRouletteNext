import { db } from "../config";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  getDocs,
  collection,
} from "firebase/firestore";

export async function getAlbums() {
  try {
    const querySnapshot = await getDocs(collection(db, "lr"));
    const data = [];
    querySnapshot.forEach((doc) => {
      data.push({ ...doc.data(), uid: doc.id });
    });
    console.log("getAlbums data:", data);
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
      data.push({ ...doc.data(), uid: doc.id });
    });
    console.log("getMessages data:", data);
    return { data, error: null };
  } catch (error) {
    console.error("Error from getMessages:", error);
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
