import { useState } from "react";
import { HiChevronLeft, HiChevronDown } from "react-icons/hi";

function EntriesList({ entry }) {

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div key={entry.id} className="entry-card">

        {!isOpen && <div className="entry-card-closed">
          <div className="entry-header">
            <h3 className="entry-phrase">{entry.phrase} {entry.numerus} {entry.genus}</h3>
            <p className="entry-translation">{entry.translation.join(", ")}</p>
          </div>
          <button className="entry-toggle-button" onClick={() => setIsOpen(!isOpen)}><HiChevronLeft /></button>
        </div>}

        {isOpen && <div className="entry-card-open">
          <div className="entry-header">
            <h3 className="entry-phrase">{entry.phrase}</h3>
            <p className="entry-translation">{entry.translation.join(", ")}</p>
          </div>
          <p className="entry-description">{entry.description}</p>
          <div className="entry-example-section">
            <p className="entry-example">
              <span className="example-label">Beispiel:</span> {entry.example}
            </p>
          </div>
          <button className="entry-toggle-button" onClick={() => setIsOpen(!isOpen)}><HiChevronDown /></button>
        </div>}

      </div>
    </>
  );
}

export default EntriesList;
