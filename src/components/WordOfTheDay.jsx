import entries from "../data/entries.json";

const today = new Date();
const daySeed = Number(String(today.getDate()) + String(today.getMonth() + 1));
const index = daySeed % entries.length;
const wordOfTheDay = entries[index];

const WordOfTheDay = () => {
  return (
    <div className="word-of-day-card">
      <h2 className="word-of-day-title">Spruch des Tages</h2>
      <div className="word-of-day-content">
        <div className="word-header">
          <h3 className="word-phrase">{wordOfTheDay.phrase}</h3>
          {wordOfTheDay.translation && <p className="word-translation">
            {wordOfTheDay.translation.join(", ")}
          </p>}
        </div>
        <div className="word-details">
          <div className="word-section">
            {wordOfTheDay.description && <><h4 className="section-title">Beschreibung</h4>
              <p className="section-text">{wordOfTheDay.description}</p></>}
          </div>
          <div className="word-section">
            {wordOfTheDay.example && <><h4 className="section-title">Beispiel</h4>
              <p className="section-text example-text">{wordOfTheDay.example}</p></>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WordOfTheDay;

