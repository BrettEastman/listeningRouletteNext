import { createContext } from "react";
import { UserType } from "../types";

type CreateAuthContextType = {
  user: UserType;
  setUser: React.Dispatch<React.SetStateAction<UserType>>;
};

const CreateAuthContext = createContext<CreateAuthContextType | {}>({});

export default CreateAuthContext;
