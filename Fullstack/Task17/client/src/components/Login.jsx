import React, { useState } from 'react';

export default function Login({ onLogin }) {
  const [name, setName] = useState('');

  return (
    <div className="login">
      <h2>Join the chat</h2>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your name"
      />
      <button onClick={() => name.trim() && onLogin(name.trim())}>
        Join
      </button>
    </div>
  );
}
