const AlphabetSelect = ({ alphabet, selectedLetter, setSelectedLetter }) => {
  return (
    <div className="alphabet-timeline">
      <div className="timeline-line"></div>
      <div className="timeline-letters">
        {alphabet.map((letter) => (
          <span
            key={letter}
            className={`timeline-letter ${selectedLetter === letter ? "active" : ""}`}
            onClick={() =>
              setSelectedLetter(selectedLetter === letter ? null : letter)
            }
          >
            {letter}
          </span>
        ))}
      </div>
    </div>
  );
};

export default AlphabetSelect;

