// Modules
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MatchesTab = ({ matches, setChatModalOpen, setRoomId }) => {
  // const matchesMap = matches.map((ele))

  return (
    <div className='matches-tab'>
      {matches.map(match => (
        <div
          className='matches'
          onClick={() => {
            setRoomId(match.roomId);
            setChatModalOpen(true);
          }}
        >
          <p>{match.name}</p>
          <img src={match.imageUrl}></img>
        </div>
      ))}
    </div>
  );
};

export default MatchesTab;
