import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

export default function ChatApp() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [username, setUsername] = useState("");
  const [isNameSet, setIsNameSet] = useState(false);

  useEffect(() => {
    // Load old messages from DB
    socket.on("load_messages", (data) => {
      setMessages(data);
    });

    socket.on("receive_message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off("load_messages");
      socket.off("receive_message");
    };
  }, []);

  const sendMessage = () => {
    if (!input.trim()) return;
    const newMessage = { 
      text: input, 
      sender: username, 
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) 
    };
    socket.emit("send_message", newMessage);
    setInput("");
  };

  if (!isNameSet) {
    return (
      <div className="h-screen flex items-center justify-center bg-green-500">
        <div className="w-full max-w-sm bg-white shadow-xl rounded-2xl p-6">
          <h1 className="text-2xl font-bold text-gray-800 text-center">WhatsApp Clone 💬</h1>
          <p className="text-gray-500 text-center mb-4">Enter your name to join</p>
          <input
            type="text"
            placeholder="Your name..."
            className="w-full border px-3 py-2 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button
            onClick={() => username.trim() && setIsNameSet(true)}
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
          >
            Join Chat
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gray-200">
      <div className="w-full max-w-md h-[650px] bg-white shadow-lg rounded-2xl flex flex-col">
        
        {/* Header */}
        <div className="p-4 bg-green-600 text-white flex justify-between items-center rounded-t-2xl">
          <span className="font-semibold">💬 WhatsApp Clone</span>
          <span className="text-sm opacity-80">{username}</span>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gray-100">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.sender === username ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`px-4 py-2 rounded-xl max-w-[75%] ${
                  msg.sender === username
                    ? "bg-green-500 text-white rounded-br-none"
                    : "bg-white border text-gray-800 rounded-bl-none"
                }`}
              >
                <span className="block text-xs font-semibold opacity-70">
                  {msg.sender} • {msg.time}
                </span>
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="p-3 border-t flex gap-2 bg-white">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            onClick={sendMessage}
            className="bg-green-600 text-white px-5 py-2 rounded-full hover:bg-green-700"
          >
            ➤
          </button>
        </div>
      </div>
    </div>
  );
}


