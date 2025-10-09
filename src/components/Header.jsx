function Header() {
  return (
    <>
      <header className="lexicon-header">
        <div className="header-content">
          <h1 className="site-title">Götzikon</h1>

          {/* Container for the donation section */}
          <div className="donation-section">
            <p className="donation-info">
              Donations are forwarded to{" "}
              <a
                href="https://twitter.com/vivianradke" // Example link to a social profile
                target="_blank"
                rel="noopener noreferrer"
                className="info-link"
              >
                @Vivian Radke
              </a>
              .
            </p>
            <a
              href="https://www.paypal.com/donate" // Example link to a donation page
              target="_blank"
              rel="noopener noreferrer"
              className="donation-button"
            >
              Support the Project
            </a>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
