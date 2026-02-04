import { useState } from 'react'
import './Header.css'

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    const navLinks = [
        { href: '#services', label: 'Services' },
        { href: '#work', label: 'Work' },
        { href: '#method', label: 'Method' },
        { href: '#about', label: 'About' },
        { href: '#contact', label: 'Contact' },
    ]

    return (
        <header className="header">
            <nav className="header__nav">
                <a href="/" className="header__logo-link">
                    <img src="/logo.jfif" alt="Thoughtshop Logo" className="header__logo" />
                </a>

                {/* Desktop Navigation */}
                <ul className="header__menu">
                    {navLinks.map((link) => (
                        <li key={link.href}>
                            <a href={link.href} className="header__link">
                                {link.label}
                            </a>
                        </li>
                    ))}
                </ul>

                {/* Mobile Menu Button */}
                <button
                    className="header__mobile-toggle"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle mobile menu"
                >
                    {isMobileMenuOpen ? '✕' : '☰'}
                </button>

                {/* Mobile Navigation */}
                {isMobileMenuOpen && (
                    <div className="header__mobile-menu">
                        <ul>
                            {navLinks.map((link) => (
                                <li key={link.href}>
                                    <a
                                        href={link.href}
                                        className="header__mobile-link"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </nav>
        </header>
    )
}

export default Header
