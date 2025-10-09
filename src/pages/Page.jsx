import { useState, useEffect } from "react";
import "../styles/lexicon.css";
import "../styles/header.css";
import entries from "../data/entries.json";

import Header from "../components/Header";
import EntriesList from "../components/EntriesList";

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const today = new Date();
const daySeed = Number(String(today.getDate()) + String(today.getMonth() + 1));
console.log(daySeed);
const index = daySeed % entries.length;
console.log(index);
const wordOfTheDay = entries[index];

export default function Page() {
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 3;

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

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedLetter, searchQuery]);

  // Pagination variables
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = filteredEntries.slice(
    indexOfFirstEntry,
    indexOfLastEntry
  );
  const totalPages = Math.ceil(filteredEntries.length / entriesPerPage);

  // 4. NEW: Calculate the pages to display in the pagination bar
  const maxVisiblePages = 5;
  let startPage, endPage;

  if (totalPages <= maxVisiblePages) {
    // Less than 5 total pages, so show all
    startPage = 1;
    endPage = totalPages;
  } else {
    // More than 5 total pages, so calculate the window
    const halfWindow = Math.floor(maxVisiblePages / 2);
    if (currentPage <= halfWindow + 1) {
      // Near the start
      startPage = 1;
      endPage = maxVisiblePages;
    } else if (currentPage >= totalPages - halfWindow) {
      // Near the end
      startPage = totalPages - maxVisiblePages + 1;
      endPage = totalPages;
    } else {
      // In the middle
      startPage = currentPage - halfWindow;
      endPage = currentPage + halfWindow;
    }
  }

  const pagesToDisplay = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  return (
    <div className="lexicon-container">
      {/* Header */}
      <Header />
      {/* Main Content */}
      <main className="main-content">
        <div className="content-grid">
          {/* Left Section */}
          <div className="left-section">
            {/* Controls Section... no changes here */}
            <div className="controls-section">
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
              {currentEntries.length > 0 ? (
                currentEntries.map((entry) => <EntriesList entry={entry} />)
              ) : (
                <div className="no-results">
                  <p>Keine Einträge gefunden.</p>
                </div>
              )}
            </div>

            {/* UPDATED: Pagination controls now map over `pagesToDisplay` */}
            {totalPages > 1 && (
              <div className="pagination">
                {pagesToDisplay.map((pageNumber) => (
                  <button
                    key={pageNumber}
                    onClick={() => setCurrentPage(pageNumber)}
                    className={`page-number ${
                      currentPage === pageNumber ? "active" : ""
                    }`}
                  >
                    {pageNumber}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Section... no changes here */}
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

