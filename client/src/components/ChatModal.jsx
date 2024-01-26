import React, {useRef, useEffect} from "react";
import io from 'socket.io-client'

const socket = io.connect('http://localhost:8080');

const ChatModal = ({open, onClose})=>{
  if(!open) return null;

  const testRoom = 5;
  const inputRef = useRef(null);

  function joinRoom (room){
    socket.emit('join_room', room);
  }

  function sendMessage (inputMsg){
    socket.emit("send_message", {msg: inputMsg.current.value, testRoom});
  }

  useEffect(()=>{
    joinRoom(testRoom);
  },[]);

  useEffect(() => {
    socket.on('receive_message', (data)=>{
      alert(data.msg);
    })
  }, [socket])


  return(
    <div className="overlay-chatmodal">
      <div id="chat-container" >
        <button onClick={()=>{socket.off('receive_message');onClose()}}>X</button>
        <div id="message-container"></div>
        <input type="text" ref={inputRef}/>
        <button type="button" onClick={()=>sendMessage(inputRef)}>Send</button>
      </div>
    </div>
  )



}

export default ChatModal;