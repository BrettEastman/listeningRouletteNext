export type FormEvent = React.FormEvent<HTMLFormElement>;
export type MouseEvent = React.MouseEvent<HTMLButtonElement>;
export type ChangeEvent = React.ChangeEvent<HTMLInputElement>;
export type SelectEvent = React.ChangeEvent<HTMLSelectElement>;
export type KeyboardEvent = React.KeyboardEvent<HTMLInputElement>;

export type InputData = {
  [key: string]: string;
};

export interface Message {
  createdAt: Date | string;
  uid: string;
  text: string;
  photoURL?: string;
}

export type MessageFeed = Message[];

export interface Groups {
  members: string[];
  messages: MessageFeed;
}

export interface AlbumEntry {
  _id: string;
  name: string;
  album: string;
}

export interface RouletteProps {
  albums: AlbumEntry[];
  viewState?: number;
  setViewState?: any;
}

export interface UserData {
  userId: string | null | undefined;
  user: string | null | undefined;
  email: string | null | undefined;
  bio: string | null | undefined;
  photoURL: string | null | undefined;
  messages: Message[];
  listeningHistory: {
    initialAlbumSelections: {
      albums: AlbumEntry[];
      date: Date;
    };
    listeningGroups: Groups[];
  };
}

export type Users = UserData[];
