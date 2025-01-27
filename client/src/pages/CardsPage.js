// Modules
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie'; // Import js-cookie library

// Components
import TinderCard from 'react-tinder-card';
import SideBar from '../components/SideBar.js';

import ChatModal from '../components/ChatModal.jsx';
import '../stylesheets/chatModal.scss';

const CardsDashboard = () => {
  // State
  const [characters, setCharacters] = useState([]);
  const [lastDirection, setLastDirection] = useState();
  const [chatModalOpen, setChatModalOpen] = useState(false);
  const [matches, setMatches] = useState([]);
  const [roomId, setRoomId] = useState('1');

  // Helper function to grab stored cookie by name using js-cookie
  const getCookie = name => Cookies.get(name);

  // Swiping functionality
  const swiped = async (direction, swipedProfileId) => {
    console.log(`* Swiped ${direction} on ${swipedProfileId}`);
    // If the user swipes right or up...
    if (direction === 'right' || direction === 'up') {
      // Create the data object we want to send to the backend
      const swipeData = {
        idSender: getCookie('id'),
        idRecipient: swipedProfileId,
      };
      console.log('  - data obj to be sent to backend: ', swipeData);
      // Send data object to backend with a PATCH req and grab res
      const swipedRes = await axios.patch('api/swipedRight', swipeData);
      console.log('  - matches: ', swipedRes.data);
      // Update state of matches with res
      setMatches(swipedRes.data);
    }
    setLastDirection(direction);
  };

  // Fetch matches and card data everytime the page renders
  useEffect(() => {
    const fetchMatches = async () => {
      console.log('* Fetching Matches...');
      try {
        // make GET request to /api/getData/matches to fetch matches
        const currentUserId = getCookie('id');
        console.log('  - Curren user id: ', currentUserId);
        const matchesFromDb = await axios.get(
          `api/getData/matches?currentUserId=${currentUserId}`
        );

        console.log('  - Matches fetched from db: ', matchesFromDb.data);
        setMatches(matchesFromDb.data);
      } catch (error) {
        console.error('Error retrieving matches:', error);
      }
    };
    const fetchData = async () => {
      console.log('* Fetching Cards...');
      try {
        const profileType = getCookie('accountType');
        console.log('  - Account type of user from cookies: ', profileType);

        // Get account type of user
        const getCardsInput = {
          accountType: profileType,
        };

        // Make GET req to 'api/getData/cards', sending your account type to the server
        const cardsData = await axios.post('api/getData/cards', getCardsInput);
        console.log('  - Cards fetched from db:', cardsData.data);

        // Update state of characters to be the array of objects received from the server
        setCharacters(cardsData.data);
      } catch (error) {
        console.error('Error retrieving cats:', error);
      }
    };
    fetchMatches();
    fetchData();
  }, []); // Empty dependency array ensures useEffect runs once after initial render

  // Return component
  return (
    <div className='cards-page'>
      <ChatModal
        open={chatModalOpen}
        onClose={() => setChatModalOpen(false)}
        roomId={roomId}
      />

      <div className='card-container'>
        {characters.map(character => (
          <TinderCard
            className='swipe'
            key={character.name}
            onSwipe={dir => swiped(dir, character._id)}
          >
            <div className='card-contents'>
              <div
                style={{
                  backgroundImage: 'url(' + character.imageUrl + ')',
                  padding: '10px',
                  boxSizing: 'border-box',
                }}
                className='card'
              >
                <h2 className='card-name'>{character.name + ', ' + character.age}</h2>
              </div>
              <div className='more-info-block'>
                <label>breed</label>
                <p className='card-fetched-data'>{character.breed}</p>
                <label>contact</label>
                <p className='card-fetched-data'>{character.email}</p>
                <label>about me</label>
                <p className='card-fetched-data'>{character.aboutMe}</p>
              </div>
            </div>
          </TinderCard>
        ))}
      </div>

      <SideBar
        className='side-bar'
        setChatModalOpen={setChatModalOpen}
        matches={matches}
        setRoomId={setRoomId}
      />
    </div>
  );
};

export default CardsDashboard;
