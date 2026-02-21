import React, { useState } from "react";
import "./Accordion.css";

const faqData = [
  {
    id: 1,
    question: "What is React?",
    answer:
      "React is a JavaScript library for building user interfaces. It lets you create reusable UI components that update efficiently when your data changes. Created by Facebook, it's maintained by Meta and a large community.",
  },
  {
    id: 2,
    question: "What are React Hooks?",
    answer:
      "Hooks are functions that let you use state and other React features in functional components. The most common are useState (for state), useEffect (for side effects), and useRef (for DOM references). Introduced in React 16.8.",
  },
  {
    id: 3,
    question: "What's the difference between state and props?",
    answer:
      "Props are data passed FROM a parent TO a child component — they are read-only. State is data managed WITHIN a component — it can be changed using useState. When state changes, the component re-renders.",
  },
  {
    id: 4,
    question: "What is JSX?",
    answer:
      "JSX stands for JavaScript XML. It lets you write HTML-like code inside JavaScript. Behind the scenes, JSX is converted to React.createElement() calls by the bundler.",
  },
  {
    id: 5,
    question: "Why do lists need keys?",
    answer:
      "Keys help React identify which items changed, were added, or removed. Without keys, React re-renders every item. With unique keys, React only updates what actually changed — making the app faster.",
  },
];

const Accordion = () => {
  // Requirement: Track active indices (array for multi-open, single value for single-open)
  const [activeIndices, setActiveIndices] = useState([]);
  const [multiOpen, setMultiOpen] = useState(false);

  const toggleItem = (index) => {
    if (multiOpen) {
      setActiveIndices((prev) =>
        prev.includes(index)
          ? prev.filter((i) => i !== index)
          : [...prev, index],
      );
    } else {
      setActiveIndices((prev) => (prev.includes(index) ? [] : [index]));
    }
  };

  return (
    <div className="accordion-widget">
      <div className="widget-header-flex">
        <h2 className="widget-title">❓ React FAQ</h2>
        <div className="toggle-container">
          <label className="toggle-label">
            Multi-open
            <input
              type="checkbox"
              checked={multiOpen}
              onChange={() => {
                setMultiOpen(!multiOpen);
                setActiveIndices([]); // Clear all if switching modes
              }}
            />
            <span className="slider"></span>
          </label>
        </div>
      </div>

      <div className="accordion-container">
        {faqData.map((item, index) => {
          const isActive = activeIndices.includes(index);

          return (
            <div
              key={item.id}
              className={`accordion-item ${isActive ? "active" : ""}`}
            >
              <button
                className="accordion-header"
                onClick={() => toggleItem(index)}
              >
                <span className="question-text">{item.question}</span>
                <span className={`arrow-icon ${isActive ? "rotated" : ""}`}>
                  ▼
                </span>
              </button>

              <div
                className="accordion-content-wrapper"
                style={{
                  maxHeight: isActive ? "200px" : "0",
                }}
              >
                <div className="accordion-content">
                  <p>{item.answer}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Accordion;
