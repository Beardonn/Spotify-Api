import React from "react";
import "../../styles/navbar.scss";

const Navbar = () => {
  return (
    <nav className='navbar-container'>
      <section className='logo-container'>
        <span className='logo-container__logo'>Spotify</span>
      </section>
      <section className='buttons-container'>
        <button className='buttons-container__button'>Login</button>
      </section>
    </nav>
  );
};

export default Navbar;
