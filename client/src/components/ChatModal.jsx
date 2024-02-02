import React, { useRef, useEffect, useState, useReducer } from 'react';
import io from 'socket.io-client';

import MsgBubble from './MsgBubble.jsx';

const socket = io.connect('http://localhost:3000');

const ChatModal = ({ open, onClose, roomId }) => {
  if (!open) return null;

  const [allMessages, setAllMessages] = useState([]);

  const testRoom = roomId;
  const inputRef = useRef(null);

  function joinRoom(room) {
    socket.emit('join_room', room);
  }

  function sendMessage(inputMsg) {
    console.log('SendMsg allMessage:\n', allMessages);

    const newSendMsg = inputMsg.current.value;
    const newAllMessages = [...allMessages];
    newAllMessages.push(newSendMsg);

    socket.emit('send_message', { msg: newSendMsg, testRoom });
    setAllMessages(newAllMessages);
    inputMsg.current.value = '';

    console.log('Message after everything\n', newAllMessages);
  }

  useEffect(() => {
    console.log('Join triggered');
    joinRoom(testRoom);
  }, []);
  useEffect(() => {
    console.log('Mounting');
  }, []);

  useEffect(() => {
    socket.on('receive_message', data => {
      console.log('All message on the Recieve side\n', allMessages);
      console.log('Reciece side Data:\n', data.msg);
      const newAllMessages = [...allMessages];
      newAllMessages.push(data.msg);
      setAllMessages(newAllMessages);
      console.log('Reciece side after set arr:\n', allMessages);
    });
  }, [socket, allMessages]);

  let allMessagesComponent = allMessages.map((ele, i) => {
    return <MsgBubble key={'Msg' + i} msg={ele} className='msgBubble' />;
  });
  return (
    <div className='overlay-chatmodal'>
      <div id='chat-container'>
        <button
          onClick={() => {
            socket.off('receive_message');
            onClose();
          }}
        >
          X
        </button>
        <div id='message-container'>{allMessagesComponent}</div>
        <input type='text' ref={inputRef} />
        <button type='button' onClick={() => sendMessage(inputRef)}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatModal;
