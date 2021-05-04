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
export interface ITopTrack {
  id: string;
  name: string;
  images: Array<IImage>;
  artists: Array<IArtist>;
  release_date: string;
  album: IAlbum;
}
export type ITopTracks = Array<ITopTrack>;

export interface ITrackStatsResponse {
  id: string;
  acousticness: string;
  danceability: string;
  duration_ms: string;
  energy: string;
  instrumentalness: string;
  key: string;
  liveness: string;
  loudness: string;
  mode: string;
  speechiness: string;
  tempo: string;
  valence: string;
}
