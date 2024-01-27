// Modules
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Stylesheet
import "./stylesheet.css";

// Components
import Navbar from "./components/Navbar.js";

// Pages
import Home from "./pages/Home.js";
import Login from "./pages/login.js";
import Signup from "./pages/signup.js";
import CreateAccountAdopter from "./pages/CreateAccountAdopter.js";
import CreateAccountCat from "./pages/CreateAccountCat.js";
import About from "./pages/About.js";
import AdopterCardsPage from "./pages/AdopterCardsPage.js";
import CatCardsPage from "./pages/CatsCardsPage.js";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Navbar />
        <div className="container">
          <Routes>
            <Route className="signup-link" path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<About />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/createAccountAdopter" element={<CreateAccountAdopter />} />
            <Route path="/createAccountCat" element={<CreateAccountCat />} />
            <Route
              path="/AdopterCardsPage"
              element={
                <PrivateRoute>
                  <AdopterCardsPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/CatsCardsPage"
              element={
                <PrivateRoute>
                  <CatCardsPage />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
