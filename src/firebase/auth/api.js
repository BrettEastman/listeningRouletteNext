import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../config";

// export async function signUp(email, password, displayName) {
//   let result = null,
//     error = null;
//   try {
//     result = await createUserWithEmailAndPassword(auth, email, password);

//     console.log("auth.currentUser:", auth.currentUser);

//     if (displayName) {
//       const user = auth.currentUser;
//       user.displayName = displayName;
//     }
//   } catch (e) {
//     error = e;
//     console.log("signup error:", e);
//   }

//   console.log("result:", result);
//   return { result, error };
// }

export async function signUp(email, password, displayName) {
  try {
    await createUserWithEmailAndPassword(auth, email, password).catch((err) =>
      console.log("createUserWithEmailAndPassword error:", err)
    );
    await updateProfile(auth.currentUser, { displayName: displayName }).catch(
      (err) => console.log("updateProfile error:", err)
    );
    console.log("Sign in successfull! CurrentUser:", auth.currentUser);
  } catch (err) {
    console.log("signUp error:", err);
  }
}

// export async function signIn(email, password) {
//   let result = null,
//     error = null;
//   try {
//     result = await signInWithEmailAndPassword(auth, email, password);
//   } catch (e) {
//     error = e;
//   }
//   return { result, error };
// }

export async function signIn(email, password) {
  try {
    await signInWithEmailAndPassword(auth, email, password).catch((err) => {
      console.log("signInWithEmailAndPassword error:", err);
    });
    console.log("Sign in successfull! CurrentUser:", auth.currentUser);
  } catch (err) {
    console.log("signIn error:", err);
  }
}

export async function signOutOfApp() {
  return signOut(auth);
}
