"use client";
import { onAuthStateChanged } from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import { auth } from "../firebase/config";
import { UserType } from "../types";
import CreateAuthContext from "./CreateAuthContext";

type AuthContextType = {
  children: React.ReactNode;
};

// AuthContextProvider is a wrapper component that will provide the auth context to all its children
export default function AuthContextProvider({ children }: AuthContextType) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
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
}

// useAuthContext is a custom hook that allows us to use the auth context in our components
export function useAuthContext() {
  const context = useContext(CreateAuthContext);
  if (!context) {
    throw new Error(
      "useAuthContext must be used within an AuthContextProvider"
    );
  }
  return context;
}
