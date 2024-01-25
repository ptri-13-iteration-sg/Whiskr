// Modules
import React, { useEffect, useState } from "react";
import axios from "axios";

const MatchesTab = () => {
  // Mock data
  // const matches = [
  //   { name: 'mock cat 1', imageUrl: 'https://i.imgur.com/Jvh1OQm.jpeg' },
  //   { name: 'mock cat 2', imageUrl: 'https://i.imgur.com/Jvh1OQm.jpeg' },
  //   { name: 'mock cat 3', imageUrl: 'https://i.imgur.com/Jvh1OQm.jpeg' },
  //   { name: 'mock cat 4', imageUrl: 'https://i.imgur.com/Jvh1OQm.jpeg' },
  //   { name: 'mock cat 5', imageUrl: 'https://i.imgur.com/Jvh1OQm.jpeg' },
  //   { name: 'mock cat 6', imageUrl: 'https://i.imgur.com/Jvh1OQm.jpeg' },
  //   { name: 'mock cat 7', imageUrl: 'https://i.imgur.com/Jvh1OQm.jpeg' },
  //   { name: 'mock cat 8', imageUrl: 'https://i.imgur.com/Jvh1OQm.jpeg' },
  //   { name: 'mock cat 9', imageUrl: 'https://i.imgur.com/Jvh1OQm.jpeg' },
  //   { name: 'mock cat 10', imageUrl: 'https://i.imgur.com/Jvh1OQm.jpeg' },
  // ];

  const [matches, setMatches] = useState([]);

  useEffect(() => {
    console.log("* Fetching matches from db...");
    // Use an async function inside useEffect to fetch data
    const fetchMatches = async () => {
      try {
        const matches = await axios.get("/api/matches");
        setMatches(matches.data);
        console.log("* Retrieved matches from db:", matches.data);
      } catch (error) {
        console.error("Error retrieving matches:", error);
      }
    };

    fetchMatches();
  }, []); // Empty dependency array ensures useEffect runs once after initial render

  return (
    <div className="matches-tab">
      {matches.map((match) => (
        <div className="matches">
          <p>{match.name}</p>
          <img src={match.imageUrl}></img>
        </div>
      ))}
    </div>
  );
};

export default MatchesTab;
