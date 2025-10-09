import { useState } from "react"
import "../styles/lexicon.css"

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")

const mockEntries = [
  {
    id: 1,
    phrase: "Götz von Berlichingen",
    translation: "Famous German knight",
    description: "A historical figure known for his iron prosthetic hand and colorful language.",
    example: "Götz von Berlichingen lebte im 16. Jahrhundert.",
  },
  {
    id: 2,
    phrase: "Gemütlichkeit",
    translation: "Coziness, comfort",
    description: "A German concept describing a state of warmth, friendliness, and good cheer.",
    example: "Die Gemütlichkeit in diesem Café ist unübertroffen.",
  },
  {
    id: 3,
    phrase: "Geborgenheit",
    translation: "Security, safety",
    description: "A feeling of being protected and safe, often in a warm and caring environment.",
    example: "Kinder brauchen Geborgenheit in der Familie.",
  },
  {
    id: 4,
    phrase: "Götterdämmerung",
    translation: "Twilight of the gods",
    description: "A dramatic or catastrophic end, originally from Norse mythology.",
    example: "Die Götterdämmerung markiert das Ende einer Ära.",
  },
  {
    id: 5,
    phrase: "Gesundheit",
    translation: "Health, bless you",
    description: 'Commonly said after someone sneezes, literally meaning "health".',
    example: "Gesundheit! Hast du dich erkältet?",
  },
]

const wordOfTheDay = {
  phrase: "Fernweh",
  translation: "Wanderlust",
  description:
    "A strong desire to travel and explore distant places. The opposite of homesickness (Heimweh), it describes the longing to be somewhere else.",
  example: "Ihr Fernweh trieb sie dazu, die Welt zu bereisen und neue Kulturen kennenzulernen.",
}

export default function Page() {
  const [selectedLetter, setSelectedLetter] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")

  const filteredEntries = mockEntries.filter((entry) => {
    const matchesSearch =
      searchQuery === "" ||
      entry.phrase.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.translation.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesLetter = selectedLetter === null || entry.phrase.charAt(0).toUpperCase() === selectedLetter

    return matchesSearch && matchesLetter
  })

  return (
    <div className="lexicon-container">
      {/* Header */}
      <header className="lexicon-header">
        <div className="header-content">
          <h1 className="site-title">Goetzikon</h1>
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
                  <div key={entry.id} className="entry-card">
                    <div className="entry-header">
                      <h3 className="entry-phrase">{entry.phrase}</h3>
                      <p className="entry-translation">{entry.translation}</p>
                    </div>
                    <p className="entry-description">{entry.description}</p>
                    <div className="entry-example-section">
                      <p className="entry-example">
                        <span className="example-label">Beispiel:</span> {entry.example}
                      </p>
                    </div>
                  </div>
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
              <h2 className="word-of-day-title">Wort des Tages</h2>

              <div className="word-of-day-content">
                <div className="word-header">
                  <h3 className="word-phrase">{wordOfTheDay.phrase}</h3>
                  <p className="word-translation">{wordOfTheDay.translation}</p>
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
