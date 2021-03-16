import React from "react";
import { IAlbum } from "../types/AlbumTypes";

interface IProps {
  album: IAlbum;
}

const Album = ({ album }: IProps) => {
  return (
    <div>
      <img src={album.images[1].url} alt={album.name} />
      <h1>{album.name}</h1>
      <h4>
        {album.artists.map((artist) => {
          return <span>{artist.name + " "}</span>;
        })}
      </h4>
      <p>Release Date: {album.release_date}</p>
      <p>Total tracks: {album.total_tracks}</p>
      <p>Type: {album.album_type}</p>
    </div>
  );
};

export default Album;
