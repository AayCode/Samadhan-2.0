import React from "react";
import ReactDOM from "react-dom/client";
import ChatApp from "./ChatApp.jsx";
import "./index.css";   // ✅ This must point to Tailwind CSS

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChatApp />
  </React.StrictMode>
);

