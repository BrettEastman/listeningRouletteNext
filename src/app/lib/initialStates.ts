import {
  UserData,
  Group,
  RouletteProps,
  Message,
  AlbumEntry,
} from "../../types";

export const initialAlbumEntryState: AlbumEntry = {
  uid: "",
  groupName: "",
  artistName: "",
  albumName: "",
};

export const initialRoulettePropsState: RouletteProps = {
  albums: [],
  viewState: 0,
  setViewState: () => {},
};

export const initialMessageState: Message = {
  createdAt: new Date(),
  uid: "",
  text: "",
};

export const initialGroupState: Group = {
  groupName: "",
  groupMembers: [],
  groupSessions: [],
};

export const initialUserDataState: UserData = {
  userId: "",
  user: "",
  email: "",
  bio: "",
  photoURL: "",
  currentGroup: "",
  listeningGroups: [],
};
