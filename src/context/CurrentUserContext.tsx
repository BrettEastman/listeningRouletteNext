"use client";
import { createContext, useState, useContext, ReactNode } from "react";

type CurrentUserContextType = {
  userName: string;
  currentGroup: string;
};

const initialState: CurrentUserContextType = {
  userName: "",
  currentGroup: "",
};

const CurrentUserContext = createContext(initialState);

type CurrentUserContextProp = {
  children: ReactNode;
};

export const CurrentUserContextProvider = ({
  children,
}: CurrentUserContextProp) => {
  const [userName, setUserName] = useState("");
  const [currentGroup, setCurrentGroup] = useState("");

  return (
    <CurrentUserContext.Provider value={{ userName, currentGroup }}>
      {children}
    </CurrentUserContext.Provider>
  );
};

export function useCurrentUser() {
  const context = useContext(CurrentUserContext);
  if (!context) {
    throw new Error(
      "useCurrentUser must be used within CurrentUserContextProvider"
    );
  }
  return context;
}
