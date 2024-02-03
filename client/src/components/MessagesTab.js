// Modules
import React from 'react';

const MessagesTab = ({ setChatModalOpen }) => {
  return (
    <div className='messages-tab'>
      <ol>
        <button type='button' onClick={() => setChatModalOpen(true)}>
          Open chat
        </button>
        <li>cat-owner1@gmail.com: hi!</li>
        <li>cat-owner2@gmail.com: hello!</li>
        <li>cat-owner3@gmail.com: still interested?</li>
        <li>cat-owner4@gmail.com: eh maybe next time</li>
        <li>cat-owner5@gmail.com: he loves other cats!</li>
      </ol>
    </div>
  );
};

export default MessagesTab;
