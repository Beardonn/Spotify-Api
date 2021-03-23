import React from "react";
import Search from "./Search";
import AlbumList from "./AlbumsList";
import { useAppSelector } from "../hooks/hooks";
import { selectUser } from "../reducers/userReducer";
import { getUserData } from "../service/LoginService";
import { getUserTopTracks } from "../service/UserTracksService";
import { Redirect } from "react-router";

const Dashboard = () => {
  const [albums, setAlbums] = React.useState<Array<any>>([]);
  const userName = useAppSelector(selectUser);
  React.useEffect(() => {
    const getUser = async () => {
      await getUserData();
    };
    getUser();
  }, []);
  if (!userName) {
    return <Redirect to='/' />;
  }
  return (
    <>
      <h1>Dashboard</h1>
      <Search setAlbums={setAlbums} />
      <AlbumList albums={albums} />
    </>
  );
};

export default Dashboard;
