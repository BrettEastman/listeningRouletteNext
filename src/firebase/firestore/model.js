import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../config";

// getAlbums and getMessages are examples of how to get data from Firestore database.
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

// addData is an example of how to add data to Firestore database.
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
