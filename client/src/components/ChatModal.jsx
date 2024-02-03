import React, { useRef, useEffect, useState, useReducer } from "react";
import io from "socket.io-client";

import MsgBubble from "./MsgBubble.jsx";

const socket = io.connect("http://localhost:3000");

const ChatModal = ({ open, onClose, roomId, profile }) => {
  if (!open) return null;
  const card = document.querySelector('.card-container');
  card.style.zIndex =-1;

  const [allMessages, setAllMessages] = useState([]);

  // const testRoom = roomId;
  const testRoom = roomId.roomId;
  const inputRef = useRef(null);

  function joinRoom(room) {
    socket.emit("join_room", room);
  }

  function sendMessage(inputMsg) {
    console.log("SendMsg allMessage:\n", allMessages);

    const newSendMsg = {msg:inputMsg.current.value, side:'s'};
    const newAllMessages = [...allMessages];
    newAllMessages.push(newSendMsg);

    socket.emit("send_message", { msg: inputMsg.current.value, testRoom });
    setAllMessages(newAllMessages);
    inputMsg.current.value = "";

    console.log("Message after everything\n", newAllMessages);
  }

  useEffect(() => {
    console.log("Join triggered");
    joinRoom(testRoom);
  }, []);
  useEffect(() => {
    console.log("Mounting");
  }, []);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log("All message on the Recieve side\n", allMessages);
      console.log("Reciece side Data:\n", data.msg);
      const newAllMessages = [...allMessages];
      newAllMessages.push({msg:data.msg, side:"r"});
      setAllMessages(newAllMessages);
      console.log("Reciece side after set arr:\n", newAllMessages);
    });
  }, [socket, allMessages]);

  let allMessagesComponent = allMessages.map((ele, i) => {
      return <div className={ele.side}><MsgBubble key={"Msg" + i} msg={ele.msg} className="msgBubble" id={ele.side} /></div>;
  });
  return (
    <div className="overlay-chatmodal">
      <div id="chat-container">
        <div className="chat-header">
          <div >
            {roomId.name}
          </div>
          <button
            onClick={() => {
              socket.off("receive_message");
              card.style.zIndex = 0;
              onClose();
            }}
          >
            X
          </button>
          
        </div>
        <div id="message-container">{allMessagesComponent}</div>
        <div id="chat-footer">
          <input type="text" ref={inputRef} />
          <button type="button" onClick={() => sendMessage(inputRef)}>
            Send
          </button>
        </div>
        
      </div>
    </div>
  );
};

export default ChatModal;
