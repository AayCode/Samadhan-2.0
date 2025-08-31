import { useState } from "react";
import "./App.css"; // styling

export default function CounterLivePreview() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  return (
    <div className="container">
      <h1>Counter + Live Text Preview</h1>

      {/* Counter Section */}
      <div className="counter-box">
        <button onClick={() => setCount(count - 1)}>-</button>
        <span className="count">{count}</span>
        <button onClick={() => setCount(count + 1)}>+</button>
        <button className="reset" onClick={() => setCount(0)}>Reset</button>
      </div>

      {/* Input Section */}
      <div className="input-box">
        <label>Type something:</label>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write here..."
        />
        <p className="preview-label">Live preview:</p>
        <div className="preview">
          {text ? text : <span className="placeholder">Nothing yet...</span>}
        </div>
      </div>
    </div>
  );
}