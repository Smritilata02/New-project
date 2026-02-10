import { useState } from "react";
import "./Header.css";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); 

  const centerLinks = [
    { href: "#services", label: "Services" },
    { href: "#work", label: "Work" },
    { href: "#method", label: "Method" },
    { href: "#about", label: "About" },
  ];

  return (
    <header className="header">
      <nav className="header__nav">
        {/* LEFT: Logo */}
        <a href="/" className="header__logo-link">
          <img src="/logo.jfif" alt="Thoughtshop Logo" className="header__logo" />
        </a>

        {/* CENTER: Menu */}
        <ul className="header__menu">
          {centerLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="header__link">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* RIGHT: Contact + Menu */}
        <div className="header__actions">
          <a href="#contact" className="header__contact">
            Contact
          </a>

          {/* MENU BUTTON */}
          <div className="header__menu-wrapper">
            <button
              className="header__menu-btn"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              Menu {isMenuOpen ?  "✕" : "☰"}
            </button>

            {/* MENU DROPDOWN */}
            {isMenuOpen && (
              <ul className="menu-dropdown">
                <li><a href="#careers">Careers</a></li>
                <li><a href="#blog">Blog</a></li>
                <li><a href="#case-studies">Case Studies</a></li>
              </ul>
            )}
          </div>
        </div>

        {/* Mobile Toggle */}
        <button
          className="header__mobile-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? "✕" : "☰"}
        </button>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="header__mobile-menu">
            <ul>
              {[...centerLinks, { href: "#contact", label: "Contact" }].map(
                (link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="header__mobile-link"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.label}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
