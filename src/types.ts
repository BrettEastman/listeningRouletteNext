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
