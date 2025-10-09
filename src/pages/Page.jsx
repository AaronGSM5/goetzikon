import { useState } from "react"
import "../styles/lexicon.css"
import entries from "../data/entries.json"
import EntriesList from "../components/EntriesList";

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")

const today = new Date();
const daySeed = Number(String(today.getDate()) + String((today.getMonth() + 1)));
const index = daySeed % entries.length;
const wordOfTheDay = entries[index];

export default function Page() {
  const [selectedLetter, setSelectedLetter] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")

  const filteredEntries = entries.filter((entry) => {
    const normalizedQuery = searchQuery.toLowerCase();

    // Check if the search query matches the phrase OR any of the translations
    const matchesSearch =
      searchQuery === "" ||
      entry.phrase.toLowerCase().includes(normalizedQuery) ||
      entry.translation.some((t) => t.toLowerCase().includes(normalizedQuery));

    // This part remains the same
    const matchesLetter =
      selectedLetter === null ||
      entry.phrase.charAt(0).toUpperCase() === selectedLetter;

    return matchesSearch && matchesLetter;
  });

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
              {/* Alphabet Navigation */}
              <div className="alphabet-timeline">
                <div className="timeline-line"></div>
                <div className="timeline-letters">
                  {alphabet.map((letter) => (
                    <span
                      key={letter}
                      className={`timeline-letter ${selectedLetter === letter ? "active" : ""}`}
                      onClick={() => setSelectedLetter(selectedLetter === letter ? null : letter)}
                    >
                      {letter}
                    </span>
                  ))}
                </div>
              </div>

              {/* Search Bar */}
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
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.35-4.35"></path>
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
                filteredEntries.map((entry) => (
                  <EntriesList entry={entry} />
                ))
              ) : (
                <div className="no-results">
                  <p>Keine Einträge gefunden.</p>
                </div>
              )}
            </div>

          </div>

          {/* Right Section - 30% */}
          <div className="right-section">
            <div className="word-of-day-card">
              <h2 className="word-of-day-title">Spruch des Tages</h2>

              <div className="word-of-day-content">
                <div className="word-header">
                  <h3 className="word-phrase">{wordOfTheDay.phrase}</h3>
                  <p className="word-translation">{wordOfTheDay.translation.join(', ')}</p>
                </div>

                <div className="word-details">
                  <div className="word-section">
                    <h4 className="section-title">Beschreibung</h4>
                    <p className="section-text">{wordOfTheDay.description}</p>
                  </div>

                  <div className="word-section">
                    <h4 className="section-title">Beispiel</h4>
                    <p className="section-text example-text">{wordOfTheDay.example}</p>
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
  )
}
