import FirebaseApp from "../config";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

const auth = getAuth(FirebaseApp);

export default async function signUp(email, password) {
  let result = null,
    error = null;
  try {
    result = await createUserWithEmailAndPassword(auth, email, password);
    console.log("auth:", auth, "email:", email, "password:", password);
  } catch (e) {
    error = e;
    console.log("signup error:", e);
  }

  return { result, error };
}
