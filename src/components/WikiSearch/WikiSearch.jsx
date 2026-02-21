import React, { useState, useEffect } from "react";
import "./WikiSearch.css";
import useDebounce from "../../hooks/useDebounce";
import useLocalStorage from "../../hooks/useLocalStorage";

const WikiSearch = ({ language = "en" }) => {
  const [term, setTerm] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Requirement: Show last 5 searches as clickable chips
  const [history, setHistory] = useLocalStorage("wiki_history", []);

  // Use the custom debounce hook (500ms)
  const debouncedTerm = useDebounce(term, 500);

  useEffect(() => {
    // Return early if no term to search
    if (!debouncedTerm) {
      setResults([]);
      return;
    }

    const abortController = new AbortController();

    const searchWiki = async () => {
      setLoading(true);
      setError(null);

      try {
        // Use the passed language code for localized search
        const url = `https://${language}.wikipedia.org/w/api.php?action=query&list=search&srsearch=${debouncedTerm}&format=json&origin=*&srlimit=10`;
        const response = await fetch(url, { signal: abortController.signal });

        if (!response.ok) {
          throw new Error("API request failed");
        }

        const data = await response.json();

        if (data.error) {
          throw new Error(data.error.info);
        }

        setResults(data.query.search);

        // Add to history if searching and not already there
        if (debouncedTerm.trim()) {
          setHistory((prev) => {
            const newHistory = [
              debouncedTerm,
              ...prev.filter((h) => h !== debouncedTerm),
            ];
            return newHistory.slice(0, 5); // Keep only last 5
          });
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Something went wrong. Please try again.");
        }
      } finally {
        if (!abortController.signal.aborted) {
          setLoading(false);
        }
      }
    };

    searchWiki();

    return () => {
      abortController.abort();
    };
  }, [debouncedTerm, language]); // Re-run if language changes (Connected widget logic)

  return (
    <div className="wiki-search">
      <h2 className="widget-title">🌐 Wikipedia Search</h2>

      <div className="search-input-wrapper">
        <input
          type="text"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder="Search Wikipedia articles..."
          className="search-input"
        />
        {loading && <div className="spinner"></div>}
      </div>

      {/* Search History Chips */}
      {history.length > 0 && (
        <div className="search-history">
          {history.map((item, i) => (
            <button
              key={i}
              className="history-chip"
              onClick={() => setTerm(item)}
            >
              {item}
            </button>
          ))}
        </div>
      )}

      <div className="results-container">
        {!term && (
          <div className="empty-state">
            <span className="icon">🔍</span>
            <p>Type something to search...</p>
          </div>
        )}
        ...
        {term && !loading && results.length === 0 && !error && (
          <div className="empty-state">
            <p>No articles found for "{term}"</p>
          </div>
        )}
        {error && (
          <div className="error-state">
            <p>{error}</p>
            <button onClick={() => setTerm(term)}>Retry</button>
          </div>
        )}
        <div className="results-list">
          {results.map((result) => (
            <div key={result.pageid} className="result-item">
              <h3>{result.title}</h3>
              <p
                dangerouslySetInnerHTML={{ __html: result.snippet + "..." }}
                className="snippet"
              />
              <a
                href={`https://en.wikipedia.org/wiki/${result.title}`}
                target="_blank"
                rel="noreferrer"
                className="read-more"
              >
                Read full article →
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WikiSearch;
