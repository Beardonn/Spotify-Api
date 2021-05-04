import React from "react";
import { ITopTrack } from "../../types/AlbumTypes";
import "../../styles/topTrack.scss";
interface IProps {
  topTrack: ITopTrack;
  index: number;
}

const TopTrack = ({ topTrack, index }: IProps) => {
  return (
    <>
      <li className='top-track-container'>
        <article className='top-track-index-container'>
          <span className='top-track-index-container__index'>{index}</span>
        </article>
        <article className='top-track-image-container'>
          <img
            src={topTrack.images[1].url}
            alt={topTrack.name}
            className='top-track-image-container__image'
          />
        </article>
        <article className='top-track-content-container'>
          <div className='top-track-content-artists'>
            {topTrack.artists.map((artist) => {
              return (
                <span
                  className='top-track-content-artists__artist'
                  key={artist.id}
                >
                  {artist.name}
                </span>
              );
            })}
          </div>
          <span className='top-track-content-container__name'>
            {topTrack.name}
          </span>
          <span className='top-track-content-container__release-date'>
            {topTrack.release_date}
          </span>
        </article>
      </li>
    </>
  );
};

export default TopTrack;
