export interface AlbumEntry {
  _id: string;
  name: string;
  album: string;
}

export interface Message {
  createdAt: Date | string;
  uid: string;
  text: string;
  photoURL?: string;
}

export interface RouletteProps {
  albums: AlbumEntry[];
  viewState: number;
  setViewState: any;
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
