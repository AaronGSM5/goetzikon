import { useState, useEffect } from "react";
import "../styles/lexicon.css";
import "../styles/header.css";
import "../styles/responsive.css";
import entries from "../data/entries.json";

import Header from "../components/Header";
import Entry from "../components/Entry";
import AlphabetSelect from "../components/AlphabetSelect";
import WordOfTheDay from "../components/WordOfTheDay";

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

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
            <div className="controls-section">
              <AlphabetSelect
                alphabet={alphabet}
                selectedLetter={selectedLetter}
                setSelectedLetter={setSelectedLetter}
              />
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

            {/* Entries List */}
            <div className="entries-list">
              {currentEntries.length > 0 ? (
                currentEntries.map((entry) => <Entry entry={entry} />)
              ) : (
                <div className="no-results">
                  <p>Keine Einträge gefunden.</p>
                </div>
              )}
            </div>

            {totalPages > 1 && (
              <div className="pagination">
                {pagesToDisplay.map((pageNumber) => (
                  <button
                    key={pageNumber}
                    onClick={() => setCurrentPage(pageNumber)}
                    className={`page-number ${currentPage === pageNumber ? "active" : ""
                      }`}
                  >
                    {pageNumber}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="right-section">
            <WordOfTheDay />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="lexicon-footer">
        <div className="footer-content">
          <p className="copyright">&copy; 2025 Götzikon</p>
        </div>
      </footer>
    </div>
  );
}

