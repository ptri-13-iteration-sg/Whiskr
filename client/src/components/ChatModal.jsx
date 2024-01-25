import React from "react";


const ChatModal = ({open, onClose})=>{

  if(!open) return null;

  return(
    <div className="overlay-chatmodal">
      <div id="chat-container" >
        <button onClick={()=>onClose()}>X</button>
        <div id="message-container"></div>
        <input type="text" />
        <button type="button">Send</button>
      </div>
    </div>
  )



}

export default ChatModal;