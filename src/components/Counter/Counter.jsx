import React, { useState, useEffect, useRef } from "react";
import "./Counter.css";

const Counter = () => {
  const [count, setCount] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(1000); // ms
  const [step, setStep] = useState(1);

  // Track last 20 values for the bar chart
  const [history, setHistory] = useState([]);

  // Interval ID TO BE stored in useRef
  const intervalRef = useRef(null);

  // Update history when count changes
  useEffect(() => {
    setHistory((prev) => {
      const newHistory = [...prev, count];
      return newHistory.slice(-20); // Keep last 20
    });
  }, [count]);

  //  to handle the auto-increment interval
  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setCount((prev) => prev + step);
      }, speed);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, speed, step]);

  const handleReset = () => {
    setIsRunning(false);
    setCount(0);
  };

  const manualChange = (val) => {
    setCount((prev) => prev + val);
  };

  return (
    <div className="counter-widget">
      <h2 className="widget-title">⏲️Real-Time Counter</h2>

      <div className="counter-display">
        <h1 className={`count-number ${isRunning ? "running" : ""}`}>
          {count}
        </h1>
        {isRunning && <span className="status-label">● Running</span>}
      </div>

      {/* Counter History Bar Chart */}
      <div className="counter-history">
        {history.map((val, i) => {
          const maxVal = Math.max(...history) || 1;
          const height = (val / maxVal) * 40; // Max height 40px
          return (
            <div
              key={i}
              className="history-bar"
              style={{ height: `${Math.abs(height)}px` }}
              title={`Value: ${val}`}
            ></div>
          );
        })}
      </div>

      <div className="counter-controls">
        <div className="main-buttons">
          <button onClick={() => manualChange(-step)} className="btn-secondary">
            − {step}
          </button>

          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`btn-primary ${isRunning ? "stop" : "start"}`}
          >
            {isRunning ? "⏸ Stop" : "▶ Start"}
          </button>

          <button onClick={() => manualChange(step)} className="btn-secondary">
            + {step}
          </button>
        </div>

        <button onClick={handleReset} className="btn-reset">
          ↺ Reset
        </button>
      </div>

      <div className="settings-grid">
        <div className="setting-group">
          <label>Speed</label>
          <select
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
          >
            <option value={2000}>Slow (2s)</option>
            <option value={1000}>Normal (1s)</option>
            <option value={500}>Fast (0.5s)</option>
            <option value={100}>Turbo (0.1s)</option>
          </select>
        </div>

        <div className="setting-group">
          <label>Step</label>
          <select
            value={step}
            onChange={(e) => setStep(Number(e.target.value))}
          >
            <option value={1}>+1</option>
            <option value={5}>+5</option>
            <option value={10}>+10</option>
            <option value={100}>+100</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Counter;
