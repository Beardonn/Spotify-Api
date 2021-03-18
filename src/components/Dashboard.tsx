import React from "react";
import Search from "./Search";
import AlbumList from "./AlbumsList";
import { getUserData } from "../service/LoginService";

const Dashboard = () => {
  const [albums, setAlbums] = React.useState<Array<any>>([]);
  React.useEffect(() => {
    const getUser = async () => {
      await getUserData();
    };
    getUser();
  }, []);
  return (
    <>
      <h1>Dashboard</h1>
      <Search setAlbums={setAlbums} />
      <AlbumList albums={albums} />
    </>
  );
};

export default Dashboard;
