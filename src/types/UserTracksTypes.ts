interface ITrackStatsKeys {
  [key: string]: string | number;
}

export interface ITrackStats {
  acousticness: number;
  danceability: number;
  energy: number;
  instrumentalness: number;
  liveness: number;
  loudness: number;
  speechiness: number;
  tempo: number;
  duration: number;
  key: number;
  mode: number;
}

export interface IRecommendationStats {
  acousticness: statsValues;
  danceability: statsValues;
  energy: statsValues;
  instrumentalness: statsValues;
  liveness: statsValues;
  loudness: statsValues;
  speechiness: statsValues;
  tempo: statsValues;
  duration: statsValues;
  key: statsValues;
  mode: statsValues;
}
export interface IGenres {
  genres: Array<string>;
}
export interface IRecommendationsData {
  topTracksIds: string;
  avgStatsForUser: IRecommendationStats;
  topArtists: string;
}

export type statsValues = { min: number; max: number };
