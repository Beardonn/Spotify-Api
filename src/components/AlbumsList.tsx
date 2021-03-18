import React from "react";
import Album from "./Album";
import "../styles/albumList.scss";

interface IProps {
  albums: Array<any>;
}
const AlbumsList = ({ albums }: IProps) => {
  if (albums.length === 0) {
    return null;
  }
  return (
    <section className='album-list-container'>
      {albums.map((album) => {
        return <Album album={album} key={album.id} />;
      })}
    </section>
  );
};

export default AlbumsList;
