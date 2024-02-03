import React from 'react';

const MsgBubble = ({msg, id}) => {
  if(!msg) return null;
    return(
      <div className="msgBubble" id={id}>
        {msg}
      </div>
    )
}

export default MsgBubble;
