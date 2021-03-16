import axios from "axios";
import { checkAccessToken } from "./LoginService";

interface IAlbum {
  id: string;
  artists: Array<IArtist>;
  name: string;
  images: Array<any>;
  release_date: string;
  total_tracks: string;
  album_type: string;
}
interface IArtist {
  id: string;
  name: string;
}
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
      releaseDate: album.release_date,
      totalTracks: album.total_tracks,
      albumType: album.album_type,
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
