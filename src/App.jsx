import React, { useState, useEffect } from "react";
import "./App.css";
import WikiSearch from "./components/WikiSearch/WikiSearch";
import Accordion from "./components/Accordion/Accordion";
import Dropdown from "./components/Dropdown/Dropdown";
import Counter from "./components/Counter/Counter";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  // Shared state for language (Connected widgets requirement)
  const [language, setLanguage] = useState({
    code: "en",
    name: "English",
    flag: "https://flagcdn.com/w40/gb.png",
  });

  // Theme state (Dark mode requirement)
  const [theme, setTheme] = useLocalStorage("theme", "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className="app-container">
      <header className="header">
        <div className="header-top">
          <h1>WikiLens</h1>
          <button className="theme-toggle" onClick={toggleTheme}>
            {theme === "light" ? "Dark" : "Light"}
          </button>
        </div>
        <p>Explore Wikipedia with Modern React Widgets</p>
      </header>

      <main className="dashboard-grid">
        <section className="widget-card">
          <WikiSearch language={language.code} />
        </section>

        <section className="widget-card">
          <Accordion />
        </section>

        <section className="widget-card">
          <Dropdown selected={language} onSelect={setLanguage} />
        </section>

        <section className="widget-card">
          <Counter />
        </section>
      </main>

      <footer className="footer">
        <p>&copy; 2026 WikiLens Dashboard. Built with React Hooks.</p>
      </footer>
    </div>
  );
}

export default App;
