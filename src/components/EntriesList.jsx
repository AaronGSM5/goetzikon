function EntriesList({ entry }) {
  return (
    <>
      <div key={entry.id} className="entry-card">
        <div className="entry-header">
          <h3 className="entry-phrase">{entry.phrase}</h3>
          <p className="entry-translation">{entry.translation.join(', ')}</p>
        </div>
        <p className="entry-description">{entry.description}</p>
        <div className="entry-example-section">
          <p className="entry-example">
            <span className="example-label">Beispiel:</span> {entry.example}
          </p>
        </div>
      </div>
    </>
  );
}

export default EntriesList;