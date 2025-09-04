"use client";
import { useEffect, useState } from "react";
import styles from "./Header.module.css";
import React from "react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const MENU = [
    { title: "About", link: "#" },
    { title: "Events", link: "#" },
    { title: "Team", link: "#" },
    { title: "FAQs", link: "#" },
    { title: "Constitution", link: "#" },
    { title: "Magazine 24-25", link: "#" },

  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleHamburgerClick = () => {
    setIsMobileMenuOpen((open) => !open);
  };

  const handleMenuLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.logo}>
        <img src="/favicon.ico" alt="Logo" />
        <span>NSS, IIIT HYDERABAD</span>
      </div>

      <nav className={styles.navDesktop}>
        {MENU.map((menuItem) => (
          <a key={menuItem.title} href={menuItem.link}>
            {menuItem.title}
          </a>
        ))}
      </nav>

      {/* Hamburger (visible on tablet/mobile only) */}
      <button
        className={styles.hamburger}
        aria-label="Toggle mobile menu"
        aria-expanded={isMobileMenuOpen}
        onClick={handleHamburgerClick}
        type="button"
      >
        {isMobileMenuOpen ? "✕" : "☰"}
      </button>

      {/* Mobile menu overlay */}
      <nav
        className={`${styles.navMobile} ${
          isMobileMenuOpen ? styles.show : ""
        }`}
        aria-label="Mobile navigation"
      >
        {MENU.map((menuItem) => (
          <a
            key={menuItem.title}
            href={menuItem.link}
            onClick={handleMenuLinkClick}
          >
            {menuItem.title}
          </a>
        ))}
      </nav>
    </header>
  );
}
