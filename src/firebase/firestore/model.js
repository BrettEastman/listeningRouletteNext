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

// this prints out the entire collection of documents in the "lr" collection
// const querySnapshot = await getDocs(collection(db, "lr"));
// querySnapshot.forEach((doc) => {
//   // doc.data() is never undefined for query doc snapshots
//   console.log(doc.id, " => ", doc.data());
// });

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
