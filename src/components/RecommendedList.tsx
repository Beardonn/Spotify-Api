import React from "react";
import TopTrack from "./TopTracks/TopTrack";
import "../styles/recommendationList.scss";
import {
  getRecommendations,
  getUserTopTracksStats,
} from "../service/UserTracksService";
import { ITopTracks } from "../types/AlbumTypes";
import Button from "./elements/Button";
import Loading from "./elements/Loading";

const RecommendedList = () => {
  const [
    recommendations,
    setRecommendations,
  ] = React.useState<ITopTracks | null>(null);
  const [recommendBy, setRecommendBy] = React.useState<"artists" | "tracks">(
    "artists"
  );
  const [loading, setLoading] = React.useState<boolean>(true);
  React.useEffect(() => {
    const fetchRecommendations = async () => {
      setLoading(true);
      const userStats = await getUserTopTracksStats();
      const recommendedTracks = await getRecommendations(
        userStats,
        recommendBy
      );
      console.log("recommendded tracks", recommendedTracks);
      setRecommendations(recommendedTracks);
      setLoading(false);
    };
    fetchRecommendations();
  }, [recommendBy]);
  return (
    <section className='recommendation-list-container'>
      <h1 className='recommendation-header'>Top tracks</h1>
      <article className='recommendation-buttons'>
        <Button
          variant='green'
          handleClick={() => setRecommendBy("artists")}
          isActive={recommendBy === "artists"}
        >
          Recommend by Your Top Artists
        </Button>
        <Button
          variant='green'
          handleClick={() => setRecommendBy("tracks")}
          isActive={recommendBy === "tracks"}
        >
          Recommend by Your Top Tracks
        </Button>
      </article>
      {loading ? (
        <Loading />
      ) : (
        <ul className='recommendation-list'>
          {recommendations &&
            recommendations.map((recommendation, index) => {
              return <TopTrack topTrack={recommendation} index={index + 1} />;
            })}
        </ul>
      )}
    </section>
  );
};

export default RecommendedList;
