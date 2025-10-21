import { useState } from "react";
import entries from "../data/entries.json";
import { IoShuffle } from "react-icons/io5";

const requiredProps = ["phrase", "translation"];

const hasValue = (value) => {
  if (value === undefined || value === null) return false;

  if (typeof value === "string") {
    return value.trim() !== "";
  }

  if (Array.isArray(value)) {
    return value.some(
      (v) =>
        v !== undefined &&
        v !== null &&
        (typeof v !== "string" || v.trim() !== "")
    );
  }

  return true;
};

const normalizePhrase = (p) =>
  p === undefined || p === null ? null : String(p).trim();

const getRandomEntry = (excludePhrase) => {
  if (!entries || entries.length === 0) {
    return { phrase: "Kein Eintrag" };
  }

  const exclude = normalizePhrase(excludePhrase);

  // If there's only one entry, return it regardless
  if (entries.length === 1) {
    return entries[0];
  }

  const tried = new Set();
  while (tried.size < entries.length) {
    const idx = Math.floor(Math.random() * entries.length);
    if (tried.has(idx)) continue;
    tried.add(idx);

    const entry = entries[idx];
    const valid = requiredProps.every((p) => entry && hasValue(entry[p]));
    const phrase = entry ? normalizePhrase(entry.phrase) : null;

    if (valid && (!exclude || phrase !== exclude)) return entry;
  }

  const fallbackDifferent = entries.find(
    (e) =>
      e &&
      requiredProps.every((p) => hasValue(e[p])) &&
      normalizePhrase(e.phrase) !== exclude
  ) ||
    entries.find((e) => e && requiredProps.every((p) => hasValue(e[p]))) ||
    entries[0] || { phrase: "Kein Eintrag" };

  return fallbackDifferent;
};

const RandomCard = () => {
  const [randomCard, setRandomCard] = useState(() => getRandomEntry());

  const handleRandomize = () => {
    setRandomCard((prev) => getRandomEntry(prev?.phrase));
  };

  if (!randomCard) return null;

  const renderTranslation = () => {
    const t = randomCard.translation;
    if (t === undefined || t === null) return null;

    if (Array.isArray(t)) {
      const parts = t.filter(
        (v) =>
          v !== undefined &&
          v !== null &&
          (typeof v !== "string" || v.trim() !== "")
      );
      if (parts.length === 0) return null;
      return parts.join(", ");
    }

    if (typeof t === "string") {
      if (t.trim() === "") return null;
      return t;
    }

    return String(t);
  };

  const translationText = renderTranslation();

  return (
    <div className="word-of-day-card">
      <div className="card-header">
        <h2 className="word-of-day-title">Zufälliger Spruch</h2>
        <button
          className="random-icon-button"
          onClick={handleRandomize}
          aria-label="Nächster Spruch"
        >
          <IoShuffle size={24} />
        </button>
      </div>

      <div className="word-of-day-content">
        <div className="word-header">
          <h3 className="word-phrase">{randomCard.phrase}</h3>
          {translationText && (
            <p className="word-translation">{translationText}</p>
          )}
        </div>
        <div className="word-details">
          <div className="word-section">
            {randomCard.description && (
              <>
                <h4 className="section-title">Beschreibung</h4>
                <p className="section-text">{randomCard.description}</p>
              </>
            )}
          </div>
          <div className="word-section">
            {randomCard.example && (
              <>
                <h4 className="section-title">Beispiel</h4>
                <p className="section-text example-text">
                  {randomCard.example}
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RandomCard;

