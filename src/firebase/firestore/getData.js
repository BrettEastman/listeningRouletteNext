import { FirebaseApp } from "../config";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const db = getFirestore(FirebaseApp);

export default async function getDocument(collection, id) {
  let docRef = doc(db, collection, id);

  let result = null;
  let error = null;

  try {
    result = await getDoc(docRef);
    console.log("getDoc successful");
  } catch (e) {
    error = e;
  }

  return { result, error };
}
