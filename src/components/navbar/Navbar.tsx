import React from "react";
import "../../styles/navbar.scss";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { clearUserData, selectUser } from "../../reducers/userReducer";
import { Link } from "react-router-dom";

const Navbar = () => {
  const userName = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    sessionStorage.clear();
    dispatch(clearUserData());
  };
  return (
    <nav className='navbar-container'>
      <Link to={userName ? "/dashboard" : "/"} style={{ display: "contents" }}>
        <section className='logo-container'>
          <span className='logo-container__logo'>Spotify</span>
        </section>
      </Link>
      <section className='buttons-container'>
        {userName ? (
          <>
            <Link to='/top-tracks' style={{ display: "contents" }}>
              <button className='buttons-container__button'>TopTracks</button>
            </Link>
            <Link to='/user' style={{ display: "contents" }}>
              <span className='buttons-container__username'>{userName}</span>
            </Link>
            <Link to='/' style={{ display: "contents" }} onClick={handleLogout}>
              <button className='buttons-container__button'>Logout</button>
            </Link>
          </>
        ) : (
          <button className='buttons-container__button'>Login</button>
        )}
      </section>
    </nav>
  );
};

export default Navbar;
