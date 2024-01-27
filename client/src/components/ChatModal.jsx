import React, {useRef, useEffect, useState} from "react";
import io from 'socket.io-client';

import MsgBubble from "./MsgBubble.jsx";

const socket = io.connect('http://localhost:8080');

const ChatModal = ({open, onClose})=>{
  if(!open) return null;

  const [allMessages, setAllMessages] = useState([]);

  const testRoom = 5;
  const inputRef = useRef(null);

  function joinRoom (room){
    socket.emit('join_room', room);
  }

  function sendMessage (inputMsg){
    console.log('SendMsg allMessage:\n', allMessages);
    const newSendMsg = inputMsg.current.value;
    allMessages.push(<MsgBubble msg={newSendMsg} />);
    setAllMessages(allMessages);
    socket.emit("send_message", {msg: newSendMsg , testRoom});

    
    console.log(allMessages);
  }

  useEffect(()=>{
    joinRoom(testRoom);
  },[]);

  useEffect(() => {
    socket.on('receive_message', (data)=>{
      allMessages.push(<MsgBubble msg={data.msg} />);
      setAllMessages(data.msg)
    })
  }, [socket])


  return(
    <div className="overlay-chatmodal">
      <div id="chat-container" >
        <button onClick={()=>{socket.off('receive_message');onClose()}}>X</button>
        <div id="message-container">
          {allMessages}
        </div>
        <input type="text" ref={inputRef}/>
        <button type="button" onClick={()=>sendMessage(inputRef)}>Send</button>
      </div>
    </div>
  )



}

export default ChatModal;