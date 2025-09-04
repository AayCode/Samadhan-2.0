import React from 'react';

export default function Message({ message, mine }) {
  const time = new Date(message.createdAt).toLocaleTimeString();
  return (
    <div className={`message ${mine ? 'mine' : ''}`}>
      <div className="meta">
        <strong>{message.author}</strong>
        <span className="time">{time}</span>
      </div>
      <div className="text">{message.text}</div>
    </div>
  );
}
