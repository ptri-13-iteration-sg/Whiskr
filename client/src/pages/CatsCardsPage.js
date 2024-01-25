// Modules
import React, { useState, useEffect } from "react";
import axios from "axios";

// Components
import TinderCard from "react-tinder-card";
import SideBar from "../components/SideBar.js";

const CatDashboard = () => {
  const [characters, setCharacters] = useState([]);
  const [lastDirection, setLastDirection] = useState();

  const updateMatches = async () => {};

  const swiped = (direction, swipedProfileId) => {
    console.log(`* Swiped ${direction} on ${nameToDelete}`);

    if (direction === "right") {
      updateMatches(swipedProfileId);
    }

    setLastDirection(direction);
  };

  const outOfFrame = (name) => {
    console.log(`* ${name} left the screen!`);
  };

  useEffect(() => {
    // Use an async function inside useEffect to fetch data
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/cats");
        setCharacters(response.data);
        console.log("* Retrieved cats from db:", response.data);
      } catch (error) {
        console.error("Error retrieving cats:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures useEffect runs once after initial render

  return (
    <div className="cards-page">
      <div className="card-container">
        {characters.map((character) => (
          <TinderCard
            className="swipe"
            key={character.name}
            onSwipe={(dir) => swiped(dir, character._id)}
            onCardLeftScreen={() => outOfFrame(character.name)}
          >
            <div className="card-contents">
              <div
                style={{
                  backgroundImage: "url(" + character.imageUrl + ")",
                  padding: "10px",
                  boxSizing: "border-box",
                }}
                className="card"
              >
                <h2 className="card-name">{character.name + ", " + character.age}</h2>
              </div>
              <div className="more-info-block">
                <label>breed</label>
                <p className="card-fetched-data">{character.breed}</p>
                <label>contact</label>
                <p className="card-fetched-data">{character.email}</p>
                <label>about me</label>
                <p className="card-fetched-data">{character.aboutMe}</p>
              </div>
            </div>
          </TinderCard>
        ))}
      </div>

      <SideBar className="side-bar" />
    </div>
  );
};

export default CatDashboard;
