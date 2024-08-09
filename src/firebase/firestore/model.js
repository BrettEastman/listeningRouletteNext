import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { db, auth } from "../config";
import { UserData } from "../../types";

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

export async function getUserSnapshot() {
  // only need to retrieve displayName when fetching data
  const currentUser = auth.currentUser?.displayName;
  const currentUserID = auth.currentUser?.uid;
  try {
    if (!currentUser) {
      throw new Error("No current user found.");
    }
    const querySnapshot = await getDoc(doc(db, "users", `${currentUserID}`));
    const res = querySnapshot.data();
    console.log("res: ", res);

    return {
      success: true,
      message: `Successfully fetched ${currentUser} data`,
      error: null,
      res,
    };
  } catch (e) {
    return {
      success: false,
      message: `Error fetching ${currentUser || "unknown user"} data: ${e}`,
      error: e,
    };
  }
}

// export async function getUserSnapshot() {
//   // only need to retrieve displayName when fetching data
//   const currentUser = auth.currentUser?.displayName;
//   const currentUserID = auth.currentUser?.uid;
//   console.log("currentUserID: ", currentUserID);
//   try {
//     if (!currentUser) {
//       throw new Error("No current user found.");
//     }
//     const q = query(collection(db, "users"), where("uid", "==", currentUserID));
//     const querySnapshot = await getDocs(q);

//     const res = querySnapshot.docs.map((doc) => ({
//       id: doc.id,
//       ...doc.data(),
//     }));
//     return {
//       success: true,
//       message: `Successfully fetched ${currentUser} data`,
//       error: null,
//       res,
//     };
//   } catch (e) {
//     return {
//       success: false,
//       message: `Error fetching ${currentUser || "unknown user"} data: ${e}`,
//       error: e,
//     };
//   }
// }

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

// addDoc is similar to setDoc, but it will generate a unique id for the document. So you don't need to specify the id. It will also add the data destructively, so if there is already data at that location, it will be overwritten. It might look like this:
// const someDoc = doc(db, "users/someName");
// const collection = collection(db, "users");
// addDoc(collection, { name: 'Darla' });

// deleteDoc is used to delete a document from the database. It takes a docRef as an argument. It might look like this:
// const someDoc = doc(db, "users/someName");
// deleteDoc(someDoc);

async function setUserDataDoc(formInput, currentUser) {
  try {
    const currentUserID = auth.currentUser?.uid;
    await setDoc(doc(db, "users", `${currentUserID}`), {
      ...formInput,
      createdAt: serverTimestamp(),
    });
    return true;
  } catch (e) {
    console.error("setUserData error: ", e);
    return false;
  }
}

async function updateUserDataDoc(formInput, currentUser) {
  try {
    const currentUserID = auth.currentUser?.uid;
    const docRef = doc(db, "users", `${currentUserID}`);
    // updateDoc is not destructively adding data - it is updating the data at the location specified by the docRef. The catch is that the data must already exist at that location. If it doesn't, then you will get an error. Using setDoc with the merge option (like my addData example above) is a better option if you are not sure if the data already exists at that location.
    await updateDoc(docRef, {
      ...formInput,
      updatedAt: serverTimestamp(),
    });
    return true;
  } catch (e) {
    console.error("updateUserData error: ", e);
    return false;
  }
}

export async function setOrUpdateUserData(formInput, currentUser) {
  const currentUserID = auth.currentUser?.uid;
  try {
    const docRef = doc(db, "users", `${currentUserID}`);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      await updateUserDataDoc(formInput, currentUser);
    } else {
      await setUserDataDoc(formInput, currentUser);
    }
    return true;
  } catch (e) {
    console.error("setOrUpdateUserData error: ", e);
    return false;
  }
}
