import {
  UserData,
  Groups,
  RouletteProps,
  Message,
  AlbumEntry,
} from "../../types";

export const initialAlbumEntryState: AlbumEntry = {
  _id: "",
  name: "",
  album: "",
};

export const initialMessageState: Message = {
  createdAt: new Date(),
  uid: "",
  text: "",
  photoURL: "",
};

export const initialRoulettePropsState: RouletteProps = {
  albums: [],
  viewState: 0,
  setViewState: () => {},
};

export const initialGroupsState: Groups = {
  members: [],
  messages: [],
};

export const initialUserDataState: UserData = {
  userId: "",
  user: "",
  email: "",
  bio: "",
  photoURL: "",
  listeningHistory: {
    initialAlbumSelections: {
      albums: [],
      date: new Date(),
    },
    listeningGroups: [],
  },
};
