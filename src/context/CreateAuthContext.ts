import React, { createContext } from "react";
import { User } from "firebase/auth";
import { init } from "next/dist/compiled/webpack/webpack";

type CreateAuthContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

const initialState: CreateAuthContextType = {
  user: null,
  setUser: () => {},
};

const CreateAuthContext = createContext<CreateAuthContextType>(initialState);

export default CreateAuthContext;
