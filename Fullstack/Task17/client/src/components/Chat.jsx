import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Message from './Message';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function Chat({ socket, username }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [users, setUsers] = useState([]);
  const [typingUser, setTypingUser] = useState('');
  const endRef = useRef(null);

  useEffect(() => {
    // load old messages
    axios.get(`${API_URL}/messages`)
      .then(res => setMessages(res.data))
      .catch(err => console.log(err));

    socket.on('newMessage', (message) => {
      setMessages(prev => [...prev, message]);
    });

    socket.on('users', (list) => setUsers(list));

    socket.on('typing', (user) => {
      setTypingUser(user);
      setTimeout(() => setTypingUser(''), 1200);
    });

    return () => {
      socket.off('newMessage');
      socket.off('users');
      socket.off('typing');
    };
  }, [socket]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    if (!text.trim()) return;
    const payload = { author: username, text: text.trim() };
    socket.emit('sendMessage', payload);
    setText('');
  };

  const handleTyping = () => {
    socket.emit('typing', username);
  };

  return (
    <div className="chat-root">
      <aside className="sidebar">
        <h4>Users</h4>
        <ul>
          {users.map((u, i) => <li key={i}>{u}</li>)}
        </ul>
      </aside>

      <main className="main-chat">
        <div className="messages">
          {messages.map((m) => (
            <Message
              key={m._id || m.createdAt}
              message={m}
              mine={m.author === username}
            />
          ))}
          <div ref={endRef} />
        </div>

        {typingUser && <div className="typing">{typingUser} is typing...</div>}

        <div className="composer">
          <input
            placeholder="Write a message..."
            value={text}
            onChange={(e) => { setText(e.target.value); handleTyping(); }}
            onKeyDown={(e) => { if (e.key === 'Enter') sendMessage(); }}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </main>
    </div>
  );
}
