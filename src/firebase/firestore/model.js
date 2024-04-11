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
    return { data, error: null };
  } catch (error) {
    console.error("Error from getMessages:", error);
    return { data: null, error: error.message };
  }
}

// addData is an example of how to add data to Firestore database.
export async function addData(collection, id, data) {
  try {
    // this doc creates the reference to the document - i.e. where is it?
    // collection could be "lr" or "messages" in this example, or it could be a path to a subcollection, like "lr/album1"
    const docRef = doc(db, collection, id);
    // setDoc is the mutation function that actually adds the data to the database - let me update the server
    // on the Frontend masters video, he says await is not needed here and it could be actually worse to use it. The purpose of await is to wait for the response from the server, but if you don't need the response, then you don't need await. Firestore autmatically handles the response from the server, so you don't need to wait for it.
    // also note that setDoc adds data destructively - i.e. it will overwrite any existing data at that location
    const result = await setDoc(docRef, data, {
      merge: true,
    });
    return { result, error: null };
  } catch (error) {
    console.error("addData error:", error);
    return { result: null, error: error.message };
  }
}

// updateDoc is not destructively adding data - it is updating the data at the location specified by the docRef. The catch is that the data must already exist at that location. If it doesn't, then you will get an error. Using setDoc with the merge option (like my addData example above) is a better option if you are not sure if the data already exists at that location.

// addDoc is similar to setDoc, but it will generate a unique id for the document. So you don't need to specify the id. It will also add the data destructively, so if there is already data at that location, it will be overwritten. It might look like this:
// const someDoc = doc(db, "users/someName");
// const collection = collection(db, "users");
// addDoc(collection, { name: 'Darla' });
