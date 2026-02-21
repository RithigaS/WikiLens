import React, { useState, useRef, useEffect } from "react";
import "./Dropdown.css";
import useClickOutside from "../../hooks/useClickOutside";

const languages = [
  { code: "en", name: "English", flag: "https://flagcdn.com/w40/gb.png" },
  { code: "es", name: "Spanish", flag: "https://flagcdn.com/w40/es.png" },
  { code: "fr", name: "French", flag: "https://flagcdn.com/w40/fr.png" },
  { code: "de", name: "German", flag: "https://flagcdn.com/w40/de.png" },
  { code: "ja", name: "Japanese", flag: "https://flagcdn.com/w40/jp.png" },
  { code: "ko", name: "Korean", flag: "https://flagcdn.com/w40/kr.png" },
  { code: "zh", name: "Chinese", flag: "https://flagcdn.com/w40/cn.png" },
  { code: "hi", name: "Hindi", flag: "https://flagcdn.com/w40/in.png" },
  { code: "ar", name: "Arabic", flag: "https://flagcdn.com/w40/sa.png" },
  { code: "pt", name: "Portuguese", flag: "https://flagcdn.com/w40/br.png" },
];

const Dropdown = ({ selected, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useClickOutside(dropdownRef, () => {
    setIsOpen(false);
    setFocusedIndex(-1);
  });

  // Handle Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) {
        if (e.key === "ArrowDown" || e.key === "Enter") {
          setIsOpen(true);
        }
        return;
      }

      switch (e.key) {
        case "Escape":
          setIsOpen(false);
          setFocusedIndex(-1);
          break;
        case "ArrowDown":
          e.preventDefault();
          setFocusedIndex((prev) =>
            prev < languages.length - 1 ? prev + 1 : 0,
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setFocusedIndex((prev) =>
            prev > 0 ? prev - 1 : languages.length - 1,
          );
          break;
        case "Enter":
          if (focusedIndex >= 0) {
            onSelect(languages[focusedIndex]);
            setIsOpen(false);
            setFocusedIndex(-1);
          }
          break;
        default:
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, focusedIndex, onSelect]);

  const handleSelect = (lang) => {
    onSelect(lang);
    setIsOpen(false);
    setFocusedIndex(-1);
  };

  return (
    <div className="dropdown-widget">
      <h2 className="widget-title">🌍 Language Selector</h2>

      <div className="dropdown-container" ref={dropdownRef}>
        <button
          className="dropdown-trigger"
          onClick={() => setIsOpen(!isOpen)}
          onKeyDown={(e) => {
            if (e.key === " ") {
              // Space to toggle
              e.preventDefault();
              setIsOpen(!isOpen);
            }
          }}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
        >
          <span className="selected-val">
            <img
              src={selected.flag}
              alt={`${selected.name} flag`}
              className="flag-img"
            />
            <span className="name">{selected.name}</span>
          </span>
          <span className={`dropdown-arrow ${isOpen ? "open" : ""}`}>▼</span>
        </button>

        {isOpen && (
          <ul
            className="dropdown-menu"
            role="listbox"
            aria-label="Language selection"
          >
            {languages.map((lang, index) => (
              <li
                key={lang.code}
                className={`dropdown-item ${selected.code === lang.code ? "selected" : ""} ${focusedIndex === index ? "focused" : ""}`}
                onClick={() => handleSelect(lang)}
                onMouseEnter={() => setFocusedIndex(index)}
                role="option"
                aria-selected={selected.code === lang.code}
              >
                <img
                  src={lang.flag}
                  alt={`${lang.name} flag`}
                  className="flag-img"
                />
                <span className="name">{lang.name}</span>
                {selected.code === lang.code && (
                  <span className="checkmark">✓</span>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="selection-info">
        <p>
          Selected:{" "}
          <strong>
            <img
              src={selected.flag}
              alt=""
              className="flag-img"
              style={{ verticalAlign: "middle", marginRight: "4px" }}
            />
            {selected.name}
          </strong>
        </p>
      </div>
    </div>
  );
};

export default Dropdown;
