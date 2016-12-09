import React from 'react';

const MessageList = ({ messages }) => (
  <div>
    { messages.map((message, idx) => (
      <div key={`message-${idx}`}>
        <div>{message.timestamp}</div>
        <div>{message.text}</div>
      </div>
    ))}
  </div>
);

export default MessageList;
