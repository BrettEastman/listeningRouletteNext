import { createContext } from "react";
import { UserType } from "../types";

// type UserType = {
//   providerId: string;
//   proactiveRefresh: {
//     user: string;
//     isRunning: boolean;
//     timerId: number | null;
//     errorBackoff: number;
//   };
//   reloadUserInfo: {
//     localId: string;
//     email: string;
//     passwordHash: string;
//     emailVerified: boolean;
//     passwordUpdatedAt: number;
//   };
//   reloadListener: null;
//   uid: string;
//   auth: any;
//   stsTokenManager: {
//     refreshToken: string;
//     accessToken: string;
//     expirationTime: number;
//   };
//   accessToken: string;
//   displayName: string | null;
//   email: string;
//   emailVerified: boolean;
//   phoneNumber: string | null;
//   photoURL: string | null;
//   isAnonymous: boolean;
//   tenantId: string | null;
//   providerData: any[];
//   metadata: {
//     createdAt: string;
//     lastLoginAt: string;
//     lastSignInTime: string;
//     creationTime: string;
//   };
// };

type CreateAuthContextType = {
  user: UserType;
  setUser: React.Dispatch<React.SetStateAction<UserType>>;
};

const CreateAuthContext = createContext<CreateAuthContextType | {}>({});

export default CreateAuthContext;
