import React, { createContext, useContext, useState, useEffect } from "react";
import CreateAuthContext from "./CreateAuthContext";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { FirebaseApp } from "@/firebase/config";
import { nanoid } from "nanoid";

const auth = getAuth(FirebaseApp);

export const useAuthContext = () => useContext(CreateAuthContext);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        console.log(
          "user:",
          user,
          "userEmail:",
          user.email,
          "userId:",
          user.uid
        );
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <CreateAuthContext.Provider value={{ user }}>
      {loading ? <div>Loading...</div> : children}
    </CreateAuthContext.Provider>
  );
};
