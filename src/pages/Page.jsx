import { useState, useEffect } from "react";
import "../styles/lexicon.css";
import entries from "../data/entries.json";
import EntriesList from "../components/EntriesList";

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

// This logic for word of the day remains the same
const today = new Date();
const daySeed = Number(String(today.getDate()) + String(today.getMonth() + 1));
const index = daySeed % entries.length;
const wordOfTheDay = entries[index];

export default function Page() {
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // 1. Add state for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 1;

  const filteredEntries = entries.filter((entry) => {
    const normalizedQuery = searchQuery.toLowerCase();
    const matchesSearch =
      searchQuery === "" ||
      entry.phrase.toLowerCase().includes(normalizedQuery) ||
      entry.translation.some((t) => t.toLowerCase().includes(normalizedQuery));
    const matchesLetter =
      selectedLetter === null ||
      entry.phrase.charAt(0).toUpperCase() === selectedLetter;
    return matchesSearch && matchesLetter;
  });

  // 2. Add useEffect to reset page to 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedLetter, searchQuery]);

  // 3. Calculate pagination variables
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = filteredEntries.slice(
    indexOfFirstEntry,
    indexOfLastEntry
  );
  const totalPages = Math.ceil(filteredEntries.length / entriesPerPage);

  return (
    <div className="lexicon-container">
      {/* Header */}
      <header className="lexicon-header">
        <div className="header-content">
          <h1 className="site-title">Götzikon</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        <div className="content-grid">
          {/* Left Section - 70% */}
          <div className="left-section">
            {/* Alphabet Navigation and Search */}
            <div className="controls-section">
              {/* Alphabet Timeline... no changes here */}
              <div className="alphabet-timeline">
                <div className="timeline-line"></div>
                <div className="timeline-letters">
                  {alphabet.map((letter) => (
                    <span
                      key={letter}
                      className={`timeline-letter ${selectedLetter === letter ? "active" : ""}`}
                      onClick={() =>
                        setSelectedLetter(
                          selectedLetter === letter ? null : letter
                        )
                      }
                    >
                      {letter}
                    </span>
                  ))}
                </div>
              </div>

              {/* Search Bar... no changes here */}
              <div className="search-container">
                <svg
                  className="search-icon"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  {" "}
                  <circle cx="11" cy="11" r="8"></circle>{" "}
                  <path d="m21 21-4.35-4.35"></path>{" "}
                </svg>
                <input
                  type="text"
                  placeholder="Suche nach Begriffen..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                />
              </div>
            </div>

            {/* Entries List */}
            <div className="entries-list">
              {filteredEntries.length > 0 ? (
                filteredEntries.map((entry) => <EntriesList entry={entry} />)
              ) : (
                <div className="no-results">
                  <p>Keine Einträge gefunden.</p>
                </div>
              )}
            </div>

            {/* 5. Add the pagination controls */}
            {totalPages > 1 && (
              <div className="pagination">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (pageNumber) => (
                    <button
                      key={pageNumber}
                      onClick={() => setCurrentPage(pageNumber)}
                      className={`page-number ${currentPage === pageNumber ? "active" : ""}`}
                    >
                      {pageNumber}
                    </button>
                  )
                )}
              </div>
            )}
          </div>

          {/* Right Section - 30% ... no changes here */}
          <div className="right-section">
            <div className="word-of-day-card">
              <h2 className="word-of-day-title">Spruch des Tages</h2>
              <div className="word-of-day-content">
                <div className="word-header">
                  <h3 className="word-phrase">{wordOfTheDay.phrase}</h3>
                  <p className="word-translation">
                    {wordOfTheDay.translation.join(", ")}
                  </p>
                </div>
                <div className="word-details">
                  <div className="word-section">
                    <h4 className="section-title">Beschreibung</h4>
                    <p className="section-text">{wordOfTheDay.description}</p>
                  </div>
                  <div className="word-section">
                    <h4 className="section-title">Beispiel</h4>
                    <p className="section-text example-text">
                      {wordOfTheDay.example}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="lexicon-footer">
        <div className="footer-content">
          <p className="copyright">© 2025 Goetzikon</p>
        </div>
      </footer>
    </div>
  );
}

