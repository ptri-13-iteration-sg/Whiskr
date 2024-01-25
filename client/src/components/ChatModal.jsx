import React from "react";


const ChatModal = ()=>{
   return(
    <div className="modal-container">
      <div className="overlay-chatmodal">
        <div id="chat-container" >
          <button onClick={()=>{alert('Closing Modal')}}>X</button>
          <div id="message-container"></div>
          <input type="text" />
          <button type="button">Send</button>
        </div>
      </div>
    </div>
   )



}

export default ChatModal;