import { useEffect, useState } from 'react'
import academyLogo from '../assets/saa logo.png'

const navigationLinks = [
  { label: 'Home', href: '/#home' },
  { label: 'About', href: '/about/' },
  { label: 'Programs', href: '/courses/' },
  { label: 'Resources', href: '/resources/' },
  { label: 'Community', href: '/community/' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const updateScrollState = () => setIsScrolled(window.scrollY > 8)

    updateScrollState()
    window.addEventListener('scroll', updateScrollState, { passive: true })
    return () => window.removeEventListener('scroll', updateScrollState)
  }, [])

  useEffect(() => {
    const favicon = document.querySelector('link[rel="icon"]')
    if (favicon) {
      favicon.href = academyLogo
      favicon.type = 'image/png'
    }
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header
      className={`site-header${isScrolled ? ' site-header--scrolled' : ''}`}
      onKeyDown={(event) => {
        if (event.key === 'Escape') closeMenu()
      }}
    >
      <div className="navbar">
        <a className="navbar__brand" href="/#home" onClick={closeMenu}>
          <img
            className="navbar__logo"
            src={academyLogo}
            alt="Science Scholar Academy"
          />
        </a>

        <button
          className="navbar__toggle"
          type="button"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>

        <div
          className={`navbar__menu${menuOpen ? ' navbar__menu--open' : ''}`}
          id="primary-navigation"
        >
          <nav className="navbar__links" aria-label="Main navigation">
            {navigationLinks.map(({ label, href }) => (
              <a key={label} href={href} onClick={closeMenu}>
                {label}
              </a>
            ))}
          </nav>

          <div className="navbar__actions">
            <a className="navbar__login" href="/#contact" onClick={closeMenu}>
              Contact Us
            </a>
            <a
              className="navbar__student-login"
              href="/dashboard"
              onClick={closeMenu}
            >
              Student Login
            </a>
            <a
              className="navbar__cta"
              href="/#get-started"
              onClick={closeMenu}
            >
              Get Started
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}