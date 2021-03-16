import React from "react";
import Search from "./Search";
import AlbumList from "./AlbumsList";

const Dashboard = () => {
  const [albums, setAlbums] = React.useState<Array<any>>([]);
  return (
    <div>
      <h1>Dashboard</h1>
      <Search setAlbums={setAlbums} />
      <AlbumList albums={albums} />
    </div>
  );
};

export default Dashboard;
