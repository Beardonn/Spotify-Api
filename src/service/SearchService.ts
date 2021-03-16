import axios from "axios";
import { checkAccessToken } from "./LoginService";
import { IAlbum, IArtist } from "../types/AlbumTypes";

export const getItems = async (querry: string) => {
  const params = new URLSearchParams({
    q: querry,
    type: "album",
    limit: "20",
  });
  const token = await checkAccessToken();
  console.log("token", token);
  console.log("params", params);
  const response = await axios.get("https://api.spotify.com/v1/search", {
    params: params,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log("response", response.data.albums.items);
  const albums = response.data.albums.items.map((album: IAlbum) => {
    const newAlbum = {
      id: album.id,
      artists: album.artists,
      name: album.name,
      images: album.images,
      release_date: album.release_date,
      total_tracks: album.total_tracks,
      album_type: album.album_type,
    };
    newAlbum.artists = newAlbum.artists.map((artist) => {
      const newArtist = {
        id: artist.id,
        name: artist.name,
      };
      return newArtist;
    });
    return newAlbum;
  });
  console.log(albums);
  return albums;
};
