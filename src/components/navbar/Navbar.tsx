import React from "react";
import "../../styles/navbar.scss";
import { useAppSelector } from "../../hooks/hooks";
import { selectUser } from "../../reducers/userReducer";

const Navbar = () => {
  const userName = useAppSelector(selectUser);
  return (
    <nav className='navbar-container'>
      <section className='logo-container'>
        <span className='logo-container__logo'>Spotify</span>
      </section>
      <section className='buttons-container'>
        {userName ? (
          <>
            <span className='buttons-container__username'>{userName}</span>
            <button className='buttons-container__button'>Logout</button>
          </>
        ) : (
          <button className='buttons-container__button'>Login</button>
        )}
      </section>
    </nav>
  );
};

export default Navbar;
