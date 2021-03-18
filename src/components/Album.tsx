import React from "react";
import { IAlbum } from "../types/AlbumTypes";
import "../styles/album.scss";

interface IProps {
  album: IAlbum;
}

const Album = ({ album }: IProps) => {
  return (
    <article className='album-container'>
      <img
        src={album.images[1].url}
        alt={album.name}
        className='album-container__image'
      />
      <h1 className='album-container__album-name'>{album.name}</h1>
      <h4 className='artist-container'>
        {album.artists.map((artist) => {
          return (
            <span className='artist-container__artist-name'>
              {artist.name + " "}
            </span>
          );
        })}
      </h4>
      <p className='album-container__release-date'>
        <span>Release Date: </span>
        <span> {album.release_date}</span>
      </p>
      <p className='album-container__total-tracks'>
        Total tracks: {album.total_tracks}
      </p>
      <p className='album-container__album-type'>Type: {album.album_type}</p>
    </article>
  );
};

export default Album;
