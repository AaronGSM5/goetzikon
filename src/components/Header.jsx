import icon from "../../public/webicon.png";

function Header() {
  return (
    <>
      <header className="lexicon-header">
        <div className="header-content">
          {/* New container to group the icon and title */}
          <div className="site-title-container">
            <img src={icon} alt="Götzikon website icon" className="site-icon" />
            <h1 className="site-title">Götzikon</h1>
          </div>

          <div className="donation-section">
            <p className="donation-info">
              Spenden gehen an{" "}
              <a
                href="https://www.instagram.com/vivianradtke_/#"
                target="_blank"
                rel="noopener noreferrer"
                className="info-link"
              >
                @Vivian Radke
              </a>
              .
            </p>
            <a
              href="https://www.paypal.com/pools/c/9irL0ozetM"
              target="_blank"
              rel="noopener noreferrer"
              className="donation-button"
            >
              Hilfe für Obdachlose
            </a>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;

