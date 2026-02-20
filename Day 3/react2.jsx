import "./react2.css";
import { useState } from "react";

function React2() {
  const [count, setCount] = useState(0);

  return (
    <div className="screen">
      <div className="card">
        <h1>Clicker</h1>
        <p>Clicks: {count}</p>

        <button
          className="glow-btn"
          onClick={() => setCount(count + 1)}
        >
          CLICK ME
        </button>
      </div>
    </div>
  );
}

export default React2;
