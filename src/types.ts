export interface AlbumEntry {
  _id: string;
  name: string;
  album: string;
}

export interface Message {
  _id: string;
  name: string;
  text: string;
}

export interface RouletteProps {
  albums: AlbumEntry[];
  viewState: number;
  setViewState: any;
  currentUser: string;
  handleMessage: any;
}

export interface UserType {
  providerId: string;
  proactiveRefresh: {
    user: string;
    isRunning: boolean;
    timerId: number | null;
    errorBackoff: number;
  };
  reloadUserInfo: {
    localId: string;
    email: string;
    passwordHash: string;
    emailVerified: boolean;
    passwordUpdatedAt: number;
  };
  reloadListener: null;
  uid: string;
  auth: any;
  stsTokenManager: {
    refreshToken: string;
    accessToken: string;
    expirationTime: number;
  };
  accessToken: string;
  displayName: string | null;
  email: string;
  emailVerified: boolean;
  phoneNumber: string | null;
  photoURL: string | null;
  isAnonymous: boolean;
  tenantId: string | null;
  providerData: any[];
  metadata: {
    createdAt: string;
    lastLoginAt: string;
    lastSignInTime: string;
    creationTime: string;
  };
}

// interface User {
//   providerId: string;
//   accessToken: string;
//   auth: {
//     // Define the structure of the `auth` property here if needed
//   };
//   displayName: string | null;
//   email: string;
//   emailVerified: boolean;
//   isAnonymous: boolean;
//   metadata: {
//     createdAt: string;
//     lastLoginAt: string;
//     lastSignInTime: string;
//     creationTime: string;
//   };
//   phoneNumber: string | null;
//   photoURL: string | null;
//   proactiveRefresh: {
//     user: User;
//     isRunning: boolean;
//     timerId: number | null;
//     errorBackoff: number;
//   };
//   providerData: {
//     // Define the structure of the `providerData` property here if needed
//   }[];
//   reloadListener: null;
//   reloadUserInfo: {
//     localId: string;
//     email: string;
//     passwordHash: string;
//     emailVerified: boolean;
//     passwordUpdatedAt: number;
//     // Add more properties as needed
//   };
//   stsTokenManager: {
//     refreshToken: string;
//     accessToken: string;
//     expirationTime: number;
//     // Define other properties of `stsTokenManager` if needed
//   };
//   tenantId: string | null;
//   uid: string;
// }

// // Usage:
// const user: User = {
//   // Initialize the object with the provided properties
// };
