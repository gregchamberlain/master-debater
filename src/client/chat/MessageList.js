import React from 'react';

const MessageList = ({ messages }) => (
  <div>
    { messages.map((message, idx) => (
      <div key={`message-${idx}`}>{message.text}</div>
    ))}
  </div>
);

export default MessageList;
