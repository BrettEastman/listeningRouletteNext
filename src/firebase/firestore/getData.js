import { FirebaseApp } from "../config";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const db = getFirestore(FirebaseApp);

export default async function getDocument(collection, id) {
  try {
    const docRef = doc(db, collection, id);
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
