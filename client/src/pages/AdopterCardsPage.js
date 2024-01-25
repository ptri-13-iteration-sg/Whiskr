// Modules
import React, { useState, useEffect } from "react";
import axios from "axios";

// Components
import TinderCard from "react-tinder-card";
import SideBar from "../components/SideBar.js";

const AdopterDashboard = () => {
  //GET request to /api/adopters
  const [characters, setCharacters] = useState([]);
  const [lastDirection, setLastDirection] = useState();

  const swiped = (direction, nameToDelete) => {
    console.log("* Removing: " + nameToDelete);
    console.log("* Direction swiped: ", direction);
    setLastDirection(direction);
  };

  const outOfFrame = (name) => {
    console.log(name + " left the screen!");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/adopters");
        setCharacters(response.data);
        console.log("* Adopters loaded from Adopters db:", response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="cards-page">
      <div className="card-container">
        {characters.map((character) => (
          <TinderCard
            className="swipe"
            key={character.name}
            onSwipe={(dir) => swiped(dir, character.name)}
            onCardLeftScreen={() => outOfFrame(character.name)}
          >
            <div
              style={{ backgroundImage: "url(" + character.imageUrl + ")" }}
              className="card"
            >
              <h3>{character.name}</h3>
            </div>
          </TinderCard>
        ))}
      </div>

      <SideBar className="side-bar" />
    </div>
  );
};

export default AdopterDashboard;
