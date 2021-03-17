import React from "react";
import Album from "./Album";
import "../styles/albumList.scss";

interface IProps {
  albums: Array<any>;
}
const AlbumsList = ({ albums }: IProps) => {
  return (
    <section className='album-list-container'>
      {albums.map((album) => {
        return <Album album={album} />;
      })}
    </section>
  );
};

export default AlbumsList;
