import { FirebaseApp } from "../config";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const db = getFirestore(FirebaseApp);

export default async function addData(collection, id, data) {
  let result = null;
  let error = null;

  try {
    result = await setDoc(doc(db, collection, id), data, {
      merge: true,
    });
    console.log("addData successful, data: ", data);
  } catch (e) {
    error = e;
  }

  return { result, error };
}
