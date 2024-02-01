// Modules
import React, { useState } from "react";

// Components
import MatchesTab from "./MatchesTab.js";
import MessagesTab from "./MessagesTab.js";

const SideBar = ({ setChatModalOpen, matches }) => {
  // track state of matches tab and messages tab
  const [showMatchesTab, setShowMatchesTab] = useState(true);
  const [showMessagesTab, setShowMessagesTab] = useState(false);

  return (
    <div className="side-bar">
      <div className="match-msg-buttons">
        <button
          onClick={() => {
            setShowMatchesTab(true);
            setShowMessagesTab(false);
          }}
        >
          Matches
        </button>
        <button
          onClick={() => {
            setShowMessagesTab(true);
            setShowMatchesTab(false);
          }}
        >
          Messages
        </button>
      </div>
      {showMatchesTab && <MatchesTab matches={matches} />}
      {showMessagesTab && <MessagesTab setChatModalOpen={setChatModalOpen} />}
    </div>
  );
};

export default SideBar;
