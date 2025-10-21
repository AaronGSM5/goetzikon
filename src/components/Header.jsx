import { useEffect, useState } from "react";
import icon from "../assets/logo.png";
import { HiGift } from "react-icons/hi";

function Header() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
  }, []);

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
            {windowWidth >= 500 ? (
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
            ) : (
              <></>
            )}
            <a
              href="https://www.paypal.com/pools/c/9irL0ozetM"
              target="_blank"
              rel="noopener noreferrer"
              className="donation-button"
            >
              {windowWidth >= 1024 ? (
                <div className="flip-content-wrapper">
                  <div className="button-text">
                    <span>Hilfe für Obdachlose</span>
                  </div>
                  <div className="button-svg">
                    <HiGift id="giftIcon" />
                  </div>
                </div>
              ) : (
                <div className="button-svg-vis">
                  <HiGift id="giftIconVis" />
                </div>
              )}
            </a>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;

