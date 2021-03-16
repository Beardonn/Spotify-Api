import React from "react";
import Album from "./Album";

interface IProps {
  albums: Array<any>;
}
const AlbumsList = ({ albums }: IProps) => {
  return (
    <div>
      {albums.map((album) => {
        return <Album album={album} />;
      })}
    </div>
  );
};

export default AlbumsList;
