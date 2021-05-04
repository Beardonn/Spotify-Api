import React from "react";
import { getUserTopTracks } from "../../service/UserTracksService";
import { ITopTracks } from "../../types/AlbumTypes";
import { useAppSelector } from "../../hooks/hooks";
import { selectUser } from "../../reducers/userReducer";
import TopTrack from "./TopTrack";
import Button from "../elements/Button";
import "../../styles/topTracksList.scss";
import { Redirect } from "react-router";
import Loading from "../elements/Loading";

const TopTracksList = () => {
  const [topTracks, setTopTracks] = React.useState<ITopTracks | null>(null);
  const [term, setTerm] = React.useState<"short" | "medium" | "long">("short");
  const [loading, setLoading] = React.useState<boolean>(true);
  const userName = useAppSelector(selectUser);
  React.useEffect(() => {
    const getTopTracks = async () => {
      setLoading(true);
      const tracks = await getUserTopTracks(term);
      setTopTracks(tracks);
      setLoading(false);
    };
    getTopTracks();
    console.log(topTracks);
  }, [term]);
  if (!userName) {
    return <Redirect to='/' />;
  }
  return (
    <section className='top-tracks-container'>
      <h1 className='top-tracks-header'>Top tracks</h1>
      <article className='top-tracks-buttons'>
        <Button
          variant='green'
          handleClick={() => setTerm("short")}
          isActive={term === "short"}
        >
          1 Month
        </Button>
        <Button
          variant='green'
          handleClick={() => setTerm("medium")}
          isActive={term === "medium"}
        >
          6 Months
        </Button>
        <Button
          variant='green'
          handleClick={() => setTerm("long")}
          isActive={term === "long"}
        >
          All time
        </Button>
      </article>
      {loading ? (
        <Loading />
      ) : (
        <ul className='top-tracks-list'>
          {topTracks &&
            topTracks.map((topTrack, index) => {
              return (
                <TopTrack
                  topTrack={topTrack}
                  index={index + 1}
                  key={topTrack.id}
                />
              );
            })}
        </ul>
      )}
    </section>
  );
};

export default TopTracksList;
