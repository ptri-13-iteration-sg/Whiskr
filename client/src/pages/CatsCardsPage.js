// Modules
import React, { useState, useEffect } from "react";
import axios from "axios";

// Components
import TinderCard from "react-tinder-card";
import SideBar from "../components/SideBar.js";

import ChatModal from "../components/ChatModal.jsx";
import "../stylesheets/chatModal.scss";

const CatDashboard = () => {
  const [characters, setCharacters] = useState([]);
  const [lastDirection, setLastDirection] = useState();

  const [chatModalOpen, setChatModalOpen] = useState(false);

  // Function to grab stored cookies
  function getCookie(name) {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(name + "=")) {
        return cookie.substring(name.length + 1);
      }
    }
    return null;
  }

  const swiped = async (direction, swipedProfileId) => {
    console.log(`* Swiped ${direction} on ${swipedProfileId}`);
    // If the user swipes right or up...
    if (direction === "right" || direction === "up") {
      // Create the data object we want to send to the backend
      const swipeData = {
        idSender: getCookie("id"),
        idRecipient: swipedProfileId,
      };
      console.log("  - data obj to be sent to backend: ", swipeData);

      const swipedRes = await axios.patch("api/swipedRight", swipeData);

      console.log("  - matches: ", swipedRes.data);
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
        const response = await axios.get("api/getCards/cats");
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
      <ChatModal open={chatModalOpen} onClose={() => setChatModalOpen(false)} />

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

      <SideBar className="side-bar" setChatModalOpen={setChatModalOpen} />
    </div>
  );
};

export default CatDashboard;
