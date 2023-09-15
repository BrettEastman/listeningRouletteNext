import { FirebaseApp } from "../config";
import { getAuth, signOut } from "firebase/auth";

const auth = getAuth(FirebaseApp);

export default async function signOutOfApp() {
  return signOut(auth);
}
