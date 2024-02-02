import React from 'react';

const MsgBubble = ({ msg }) => {
  if (!msg) return null;
  return <div className='msgBubble'>{msg}</div>;
};

export default MsgBubble;
