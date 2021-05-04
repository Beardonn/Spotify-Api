import axios from "axios";
import {
  IArtist,
  ITopTrack,
  ITopTracks,
  ITrackStatsResponse,
} from "../types/AlbumTypes";
import {
  ITrackStats,
  IRecommendationsData,
  IRecommendationStats,
} from "../types/UserTracksTypes";
import { checkAccessToken } from "./LoginService";

export const getUserTopTracks = async (term: string): Promise<ITopTracks> => {
  try {
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
    const topTracks: ITopTracks = response.data.items.map(
      (track: ITopTrack) => {
        return {
          id: track.id,
          name: track.name,
          artists: track.artists.map((artist: IArtist) => {
            return { id: artist.id, name: artist.name };
          }),
          images: track.album.images,
          release_date: track.album.release_date,
        };
      }
    );
    console.log("topTracks", topTracks);
    console.log(response);
    return topTracks;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getUserTopTracksStats = async (): Promise<IRecommendationsData> => {
  try {
    const accessToken = await checkAccessToken();
    const params = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    const topTracks = await getUserTopTracks("short");
    const topArtists = [
      ...new Set(topTracks.map((topTrack) => topTrack.artists[0].id)),
    ]
      .slice(0, 4)
      .join(",");
    const ids = topTracks.map((topTrack) => {
      return topTrack.id;
    });
    const requestIds = ids.join(",");
    const response = await axios.get(
      `https://api.spotify.com/v1/audio-features?ids=${requestIds}`,
      params
    );
    const topTracksStats: Array<ITrackStats> = response.data.audio_features.map(
      (topTrack: ITrackStatsResponse) => {
        return {
          acousticness: topTrack.acousticness,
          danceability: topTrack.danceability,
          energy: topTrack.energy,
          instrumentalness: topTrack.instrumentalness,
          liveness: topTrack.liveness,
          loudness: topTrack.loudness,
          speechiness: topTrack.speechiness,
          tempo: topTrack.tempo,
          duration: topTrack.duration_ms,
          key: topTrack.key,
          mode: topTrack.mode,
        };
      }
    );
    const avgStatsForUser = avgForUser(topTracksStats);
    return {
      topTracksIds: ids.slice(0, 5).join(","),
      avgStatsForUser,
      topArtists,
    };
  } catch (error) {
    console.log(error);
    return error;
  }
};

const avgStat = (stat: string, list: Array<any>) => {
  const lol = list.reduce((acc, curr, currIndex) => {
    if (currIndex === list.length - 1) {
      return (acc += curr[stat]) / list.length;
    }
    return (acc += curr[stat]);
  }, 0);
  return lol;
};
const maxStat = (stat: keyof ITrackStats, list: Array<ITrackStats>) => {
  const maxValue = list.reduce((acc, curr) => {
    return acc[stat] > curr[stat] ? acc : curr;
  });
  return +maxValue[stat].toFixed(2);
};
const minStat = (stat: keyof ITrackStats, list: Array<ITrackStats>) => {
  const minValue = list.reduce((acc, curr) => {
    return acc[stat] < curr[stat] ? acc : curr;
  });
  return +minValue[stat].toFixed(2);
};
const avgForUser = (list: Array<ITrackStats>): IRecommendationStats => {
  return {
    acousticness: {
      max: maxStat("acousticness", list),
      min: minStat("acousticness", list),
    },
    danceability: {
      max: maxStat("danceability", list),
      min: minStat("danceability", list),
    },
    energy: { max: maxStat("energy", list), min: minStat("energy", list) },
    instrumentalness: {
      max: maxStat("instrumentalness", list),
      min: minStat("instrumentalness", list),
    },
    liveness: {
      max: maxStat("liveness", list),
      min: minStat("liveness", list),
    },
    loudness: {
      max: maxStat("loudness", list),
      min: minStat("loudness", list),
    },
    speechiness: {
      max: maxStat("speechiness", list),
      min: minStat("speechiness", list),
    },
    tempo: { max: maxStat("tempo", list), min: minStat("tempo", list) },
    duration: {
      max: maxStat("duration", list),
      min: minStat("duration", list),
    },
    key: { max: maxStat("key", list), min: minStat("key", list) },
    mode: { max: maxStat("mode", list), min: minStat("mode", list) },
  };
};

const getUserTopGenres = async () => {
  try {
    const accessToken = await checkAccessToken();
    const params = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const response = await axios.get(
      `https://api.spotify.com/v1/me/top/artists`,
      params
    );
    console.log("responseGenres", response.data.items);
    const getAllGenres = flatten(
      response.data.items.map((genre: any) => genre.genres)
    );
    const topGenres = findTopGenres(getAllGenres);
    return topGenres.join(",").replace(/\s+/g, "-");
  } catch (error) {
    console.log(error);
  }
};

export const getRecommendations = async (
  data: IRecommendationsData,
  seedType: "artists" | "tracks"
) => {
  try {
    const accessToken = await checkAccessToken();
    const params = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        limit: 20,
        // seed_genres: "",
        seed_artists: seedType === "artists" ? data.topArtists : "",
        seed_tracks: seedType === "tracks" ? data.topTracksIds : "",
        min_acousticness: data.avgStatsForUser.acousticness.min,
        max_acousticness: data.avgStatsForUser.acousticness.max,
        min_danceability: data.avgStatsForUser.danceability.min,
        max_danceability: data.avgStatsForUser.danceability.max,
        min_duration_ms: data.avgStatsForUser.duration.min,
        max_duration_ms: data.avgStatsForUser.duration.max,
        min_energy: data.avgStatsForUser.energy.min,
        max_energy: data.avgStatsForUser.energy.max,
        min_instrumentalness: data.avgStatsForUser.instrumentalness.min,
        max_instrumentalness: data.avgStatsForUser.instrumentalness.max,
        min_key: data.avgStatsForUser.key.min,
        max_key: data.avgStatsForUser.key.max,
        min_liveness: data.avgStatsForUser.liveness.min,
        max_liveness: data.avgStatsForUser.liveness.max,
        min_loudness: data.avgStatsForUser.loudness.min,
        max_loudness: data.avgStatsForUser.loudness.max,
        min_mode: data.avgStatsForUser.mode.min,
        max_mode: data.avgStatsForUser.mode.max,
        min_speechiness: data.avgStatsForUser.speechiness.min,
        max_speechiness: data.avgStatsForUser.speechiness.max,
        min_tempo: data.avgStatsForUser.tempo.min,
        max_tempo: data.avgStatsForUser.tempo.max,
      },
    };
    const response = await axios.get(
      `https://api.spotify.com/v1/recommendations`,
      params
    );
    const recommendedTracks: ITopTracks = response.data.tracks.map(
      (track: ITopTrack) => {
        return {
          id: track.id,
          name: track.name,
          artists: track.artists.map((artist: IArtist) => {
            return { id: artist.id, name: artist.name };
          }),
          images: track.album.images,
          release_date: track.album.release_date,
        };
      }
    );
    return recommendedTracks;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const flatten = (array: Array<string>): any => {
  return array.reduce((acc, curr) => {
    return acc.concat(Array.isArray(curr) ? flatten(curr) : curr);
  }, []);
};

const mode = (arr: Array<string>) => {
  return arr
    .sort(
      (a, b) =>
        arr.filter((v) => v === a).length - arr.filter((v) => v === b).length
    )
    .pop();
};
const findTopGenres = (arr: Array<string>) => {
  let returnArray: Array<string> = [];
  let checkArray = arr;
  for (let i = 0; i < 5; i++) {
    const md = mode(checkArray);
    checkArray = checkArray.filter((item) => item !== md);
    console.log("newArr", checkArray);
    if (md) {
      returnArray.push(md);
    }
  }
  return returnArray;
};
