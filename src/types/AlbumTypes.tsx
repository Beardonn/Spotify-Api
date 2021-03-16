export interface IAlbum {
  id: string;
  artists: Array<IArtist>;
  name: string;
  images: Array<IImage>;
  release_date: string;
  total_tracks: string;
  album_type: string;
}
export interface IArtist {
  id: string;
  name: string;
}
export interface IImage {
  height: string;
  url: string;
  width: string;
}
