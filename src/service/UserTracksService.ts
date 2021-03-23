import axios from "axios";
import { IArtist, ITopTrack, ITopTracks } from "../types/AlbumTypes";
import { checkAccessToken } from "./LoginService";

export const getUserTopTracks = async (term: string): Promise<ITopTracks> => {
  const accessToken = await checkAccessToken();
  const params = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const response = await axios.get(
    `https://api.spotify.com/v1/me/top/tracks?time_range=${term}_term`,
    params
  );
  const topTracks: ITopTracks = response.data.items.map((track: ITopTrack) => {
    return {
      id: track.id,
      name: track.name,
      artists: track.artists.map((artist: IArtist) => {
        return { id: artist.id, name: artist.name };
      }),
      images: track.album.images,
      release_date: track.album.release_date,
    };
  });
  console.log("topTracks", topTracks);
  console.log(response);
  return topTracks;
};
