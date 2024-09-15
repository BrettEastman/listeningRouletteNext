export type FormEvent = React.FormEvent<HTMLFormElement>;
export type MouseEvent = React.MouseEvent<HTMLButtonElement>;
export type ChangeEvent = React.ChangeEvent<HTMLInputElement>;
export type SelectEvent = React.ChangeEvent<HTMLSelectElement>;
export type KeyboardEvent = React.KeyboardEvent<HTMLInputElement>;

export type InputData = {
  [key: string]: string;
};

export interface AlbumEntry {
  uid: string | null | undefined;
  groupName: string;
  artistName: string;
  albumName: string;
}

export interface RouletteProps {
  albums: AlbumEntry[];
  viewState?: number;
  setViewState?: any;
}

// export interface Message {
//   createdAt: Date | string;
//   uid: string;
//   text: string;
// }

export interface Session {
  sessionId: string;
  sessionMember: string;
  sessionAlbum: AlbumEntry;
  sessionMessages: Message[];
}

// export interface Group {
//   groupName: string;
//   groupMembers: string[];
//   groupSessions: Session[];
// }

export interface UserData {
  userId: string | null | undefined;
  user: string | null | undefined;
  email: string | null | undefined;
  bio: string | null | undefined;
  photoURL: string | null | undefined;
  currentGroup: string | null | undefined;
  listeningGroups: Group[];
}

export type Users = UserData[];

// Claude suggestions
export interface User {
  username: string;
  name: string;
  email: string;
  bio: string;
  photoURL: string;
}

export interface Group {
  name: string;
  createdAt: string;
  createdBy: string;
}

export interface Message {
  id: string;
  text: string;
  timestamp: string;
  userId: string;
  userName: string;
}

// You can then use these types with Firestore
// For example:
// const userRef = doc(db, 'users', userId);
// const userData = await getDoc(userRef);
// const user: User = userData.data() as User;
