import React from "react";
import { getUserTopTracks } from "../../service/UserTracksService";
import { ITopTracks } from "../../types/AlbumTypes";
import TopTrack from "./TopTrack";
import Button from "../elements/button";
import "../../styles/topTracksList.scss";

const TopTracksList = () => {
  const [topTracks, setTopTracks] = React.useState<ITopTracks | null>(null);
  const [term, setTerm] = React.useState<"short" | "medium" | "long">("short");
  React.useEffect(() => {
    const getTopTracks = async () => {
      const tracks = await getUserTopTracks(term);
      setTopTracks(tracks);
    };
    getTopTracks();
    console.log(topTracks);
  }, [term]);
  return (
    <section className='top-tracks-container'>
      <h1 className='top-tracks-header'>Top tracks</h1>
      <article className='top-tracks-buttons'>
        <Button variant='green' handleClick={() => setTerm("short")}>
          1 Month
        </Button>
        <Button variant='green' handleClick={() => setTerm("medium")}>
          6 Months
        </Button>
        <Button variant='green' handleClick={() => setTerm("long")}>
          All time
        </Button>
      </article>

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
    </section>
  );
};

export default TopTracksList;
