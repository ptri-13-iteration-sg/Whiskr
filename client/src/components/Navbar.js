// Modules
import React, {useState} from "react";
import { Link } from "react-router-dom";
import Logout from "./Logout";


const Navbar = () => {

  return (
    <header className="navbar">
      <Link to="/">
        <h1>Whiskr</h1>
      </Link>
      
      <div className='navbar-right'>
        <h4>Safety</h4>
        <h4>Support</h4>

        <Link to="/about">
          <h4>About</h4>
        </Link>
      </div>
      <Logout />
    </header>
  );
};

export default Navbar;

// NOTE: Safety and Support h3 elements are just there for aesthetic
