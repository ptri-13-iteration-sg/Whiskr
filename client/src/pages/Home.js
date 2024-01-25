// Modules
import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div className="slogan-signup-login-container">
        <h1 style={{ fontSize: 80 }}>Find the purrfect companion®</h1>

        <div className="signup-login-buttons">
          <div>
            <Link to="/signup">
              <button variant="contained">Sign up</button>
            </Link>
          </div>

          <div>
            <Link to="/login">
              <button variant="contained">Log in</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
