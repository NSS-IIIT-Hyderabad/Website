"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";

const ACTIVE_BG = "#E90000"; // Airtel Red
const NSS_BLUE = "#1e3a8a"; // NSS Blue theme

const navItems = [
    { label: "Home", href: "/" },
    { label: "Events", href: "/events" },
    { label: "FAQs", href: "/faqs" },
    { label: "Members", href: "/members" },
    { label: "Contact Us", href: "/contact" }, 
    { label: "Login", href: "/login" }
];

const Navbar = () => {
    const [activeItem, setActiveItem] = useState("/");
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
    
    // Floating particles animation data
    const particles = Array.from({ length: 8 }, (_, i) => ({
        id: i,
        delay: i * 0.5,
        duration: 3 + (i % 3),
    }));

    // Track scroll position for background effect
    const [scrolled, setScrolled] = useState(false);
    
    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        const onResize = () => {
            setWindowWidth(window.innerWidth);
            // Close mobile menu on desktop resize
            if (window.innerWidth > 768) {
                setIsMobileMenuOpen(false);
            }
        };
        
        window.addEventListener("scroll", onScroll);
        window.addEventListener("resize", onResize);
        
        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onResize);
        };
    }, []);

    // Close mobile menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Element | null;
            if (
                isMobileMenuOpen &&
                target &&
                !target.closest('.mobile-menu') &&
                !target.closest('.hamburger-menu')
            ) {
                setIsMobileMenuOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [isMobileMenuOpen]);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMobileMenuOpen]);

    const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const footer = document.getElementById("footer");
        if (footer) {
            footer.scrollIntoView({ behavior: "smooth" });
        }
        setIsMobileMenuOpen(false);
    };

    const createRipple = (e: React.MouseEvent<HTMLElement>) => {
        const button = e.currentTarget;
        const rect = button.getBoundingClientRect();
        const ripple = document.createElement('div');
        
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            left: ${x}px;
            top: ${y}px;
            width: ${size}px;
            height: ${size}px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.4);
            pointer-events: none;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
        `;
        
        button.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    };

    const toggleMobileMenu = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const handleNavItemClick = (href: string, e: React.MouseEvent<HTMLElement>) => {
        setActiveItem(href);
        createRipple(e);
        if (isMobileMenuOpen) {
            setIsMobileMenuOpen(false);
        }
    };

    const isMobile = windowWidth <= 1000;

    return (
        <>
            <style>{`
                @keyframes ripple {
                    to {
                        transform: scale(2);
                        opacity: 0;
                    }
                }
                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    25% { transform: translateY(-10px) rotate(90deg); }
                    50% { transform: translateY(-15px) rotate(180deg); }
                    75% { transform: translateY(-5px) rotate(270deg); }
                }
                @keyframes pulse {
                    0%, 100% { opacity: 0.3; transform: scale(1); }
                    50% { opacity: 0.8; transform: scale(1.1); }
                }
                @keyframes slideDown {
                    from { transform: translateY(-100%); }
                    to { transform: translateY(0); }
                }
                @keyframes slideInRight {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                .navbar-enter {
                    animation: slideDown 0.5s ease-out;
                }
                .floating-particle {
                    position: absolute;
                    width: 4px;
                    height: 4px;
                    background: rgba(255, 255, 255, 0.6);
                    border-radius: 50%;
                    animation: float 3s ease-in-out infinite;
                }
                .nav-item {
                    position: relative;
                    overflow: hidden;
                }
                .nav-item::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
                    transition: left 0.5s;
                }
                .nav-item:hover::before {
                    left: 100%;
                }
                .logo-container {
                    position: relative;
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                }
                .logo-glow {
                    position: absolute;
                    top: 50%;
                    left: 20px;
                    width: 60px;
                    height: 60px;
                    background: radial-gradient(circle, rgba(233, 0, 0, 0.3) 0%, transparent 70%);
                    border-radius: 50%;
                    transform: translateY(-50%);
                    animation: pulse 2s ease-in-out infinite;
                    pointer-events: none;
                }
                
                .hamburger-menu {
                    display: ${isMobile ? 'flex' : 'none'};
                    flex-direction: column;
                    cursor: pointer;
                    padding: 0.5rem;
                    z-index: 3000;
                    transition: all 0.3s ease;
                    background: rgba(30,58,138,0.85);
                    border-radius: 8px;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.2);
                }
                .hamburger-line {
                    width: 28px;
                    height: 4px;
                    background-color: #fff;
                    margin: 4px 0;
                    transition: all 0.3s ease;
                    border-radius: 2px;
                    box-shadow: 0 1px 4px rgba(0,0,0,0.15);
                }
                .hamburger-menu.open .hamburger-line:nth-child(1) {
                    transform: rotate(45deg) translate(6px, 6px);
                }
                .hamburger-menu.open .hamburger-line:nth-child(2) {
                    opacity: 0;
                }
                .hamburger-menu.open .hamburger-line:nth-child(3) {
                    transform: rotate(-45deg) translate(6px, -6px);
                }
                
                .mobile-menu-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100vw;
                    height: 100vh;
                    background: rgba(0, 0, 0, 0.5);
                    z-index: 1999;
                    opacity: ${isMobileMenuOpen ? '1' : '0'};
                    visibility: ${isMobileMenuOpen ? 'visible' : 'hidden'};
                    transition: all 0.3s ease;
                }
                
                .mobile-menu {
                    position: fixed;
                    top: 0;
                    right: 0;
                    width: ${windowWidth <= 480 ? '100vw' : '280px'};
                    height: 100vh;
                    background: linear-gradient(135deg, rgba(30, 58, 138, 0.98) 0%, rgba(15, 30, 80, 0.99) 100%);
                    backdrop-filter: blur(10px);
                    display: flex;
                    flex-direction: column;
                    padding: 5rem 2rem 2rem;
                    transform: translateX(${isMobileMenuOpen ? '0' : '100%'});
                    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                    z-index: 2000;
                    box-shadow: -5px 0 25px rgba(0, 0, 0, 0.3);
                }
                
                .mobile-nav-item {
                    margin: 0.5rem 0;
                    opacity: ${isMobileMenuOpen ? '1' : '0'};
                    transform: translateX(${isMobileMenuOpen ? '0' : '50px'});
                    transition: all 0.3s ease;
                    transition-delay: calc(0.1s * var(--delay));
                }
                
                .desktop-nav {
                    display: ${isMobile ? 'none' : 'flex'};
                    gap: 0.5rem;
                    align-items: center;
                    flex-wrap: wrap;
                    overflow: hidden;
                }
            `}</style>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="mobile-menu-overlay" onClick={() => setIsMobileMenuOpen(false)} />
            )}

            <nav 
                className="navbar-enter"
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    background: scrolled
                        ? "linear-gradient(135deg, rgba(30, 58, 138, 0.95) 0%, rgba(15, 30, 80, 0.98) 100%)"
                        : "linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 70%, transparent 100%)",
                    color: "#fff",
                    padding: "0.8rem 2rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    zIndex: 2000,
                    backdropFilter: "blur(10px)",
                    WebkitBackdropFilter: "blur(10px)",
                    boxSizing: "border-box",
                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                    borderBottom: scrolled ? "1px solid rgba(255, 255, 255, 0.1)" : "none",
                    boxShadow: scrolled ? "0 8px 32px rgba(0, 0, 0, 0.3)" : "none",
                }}
            >
                {/* Floating particles - hidden on mobile */}
                {!isMobile && particles.map(particle => (
                    <div
                        key={particle.id}
                        className="floating-particle"
                        style={{
                            left: `${10 + particle.id * 12}%`,
                            top: `${20 + (particle.id % 3) * 20}px`,
                            animationDelay: `${particle.delay}s`,
                            animationDuration: `${particle.duration}s`,
                        }}
                    />
                ))}

                {/* Logo Section */}
                <div className="logo-container">
                    <div className="logo-glow" />
                    <a
                        href="https://nss.iiit.ac.in"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            width: 40,
                            height: 40,
                            borderRadius: "50%",
                            overflow: "hidden",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            marginRight: "0.7rem",
                            boxShadow: "0 2px 8px rgba(30,58,138,0.15)",
                            background: "white",
                            cursor: "pointer"
                        }}
                    >
                        <img
                            src="/favicon.ico"
                            alt="favicon"
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover"
                            }}
                        />
                    </a>
                    <div style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: "0.5rem",
                    }}>
                        <span style={{
                            fontSize: isMobile ? "1rem" : "1.2rem",
                            color: "#fff",
                            letterSpacing: "2px",
                            fontFamily: "Merriweather, Georgia, serif",
                            fontWeight: "bold",
                            textShadow: "2px 2px 4px rgba(0,0,0,0.5)"
                        }}>
                            NSS,
                        </span>
                        {(!isMobile || windowWidth > 480) && (
                            <span style={{
                                fontSize: isMobile ? "1rem" : "1.2rem",
                                color: "rgba(255, 255, 255, 0.85)",
                                letterSpacing: "1px",
                                fontFamily: "Merriweather, Georgia, serif",
                                fontWeight: "bold",
                                textShadow: "1px 1px 2px rgba(0,0,0,0.3)"
                            }}>
                                IIIT HYDERABAD
                            </span>
                        )}
                    </div>
                </div>

                {/* Desktop Navigation Items */}
                <div className="desktop-nav">
                    {navItems.map((item) => {
                        const isActive = item.href === activeItem;
                        
                        if (item.label === "Contact Us") {
                            return (
                                <a
                                    key={item.label}
                                    href="#footer"
                                    className="nav-item"
                                    style={{
                                        color: "#fff",
                                        textDecoration: "none",
                                        fontWeight: "600",
                                        padding: "0.5rem 1.2rem",
                                        borderRadius: "12px",
                                        border: "2px solid transparent",
                                        background: "rgba(255, 255, 255, 0.1)",
                                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                                        cursor: "pointer",
                                        fontSize: "0.9rem",
                                        letterSpacing: "0.5px",
                                    }}
                                    onClick={(e) => {
                                        handleContactClick(e);
                                        createRipple(e);
                                    }}
                                    onMouseEnter={e => {
                                        e.currentTarget.style.background = "rgba(255, 255, 255, 0.2)";
                                        e.currentTarget.style.transform = "translateY(-2px)";
                                        e.currentTarget.style.boxShadow = "0 8px 25px rgba(0, 0, 0, 0.2)";
                                    }}
                                    onMouseLeave={e => {
                                        e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
                                        e.currentTarget.style.transform = "translateY(0)";
                                        e.currentTarget.style.boxShadow = "none";
                                    }}
                                >
                                    {item.label}
                                </a>
                            );
                        }

                        return (
                            <Link 
                                key={item.label + item.href}
                                href={item.href}
                                className="nav-item"
                                style={{
                                    color: "#fff",
                                    textDecoration: "none",
                                    fontWeight: "600",
                                    padding: "0.5rem 1.2rem",
                                    borderRadius: "12px",
                                    border: isActive ? `2px solid ${ACTIVE_BG}` : "2px solid transparent",
                                    background: isActive 
                                        ? `linear-gradient(135deg, ${ACTIVE_BG} 0%, #ff4444 100%)`
                                        : "transparent",
                                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                                    cursor: "pointer",
                                    fontSize: "0.9rem",
                                    letterSpacing: "0.5px",
                                    boxShadow: isActive ? "0 4px 15px rgba(233, 0, 0, 0.4)" : "none",
                                    transform: isActive ? "translateY(-1px)" : "translateY(0)",
                                    display: "inline-block"
                                }}
                                onClick={(e) => handleNavItemClick(item.href, e)}
                                onMouseEnter={e => {
                                    if (!isActive) {
                                        e.currentTarget.style.background = "rgba(255, 255, 255, 0.15)";
                                        e.currentTarget.style.transform = "translateY(-2px)";
                                        e.currentTarget.style.boxShadow = "0 8px 25px rgba(0, 0, 0, 0.2)";
                                    }
                                }}
                                onMouseLeave={e => {
                                    if (!isActive) {
                                        e.currentTarget.style.background = "transparent";
                                        e.currentTarget.style.transform = "translateY(0)";
                                        e.currentTarget.style.boxShadow = "none";
                                    }
                                }}
                            >
                                {item.label}
                            </Link>
                        );
                    })}
                </div>

                {/* Hamburger Menu Button */}
                <div 
                    className={`hamburger-menu ${isMobileMenuOpen ? 'open' : ''}`}
                    onClick={toggleMobileMenu}
                >
                    <div className="hamburger-line"></div>
                    <div className="hamburger-line"></div>
                    <div className="hamburger-line"></div>
                </div>
            </nav>

            {/* Mobile Menu */}
            <div className="mobile-menu">
                {navItems.map((item, index) => {
                    const isActive = item.href === activeItem;
                    
                    if (item.label === "Contact Us") {
                        return (
                            <a
                                key={item.label}
                                href="#footer"
                                className="mobile-nav-item"
                                style={{
                                    // @ts-ignore
                                    '--delay': index,
                                    color: "#fff",
                                    textDecoration: "none",
                                    fontWeight: "600",
                                    padding: "1rem 0",
                                    borderRadius: "12px",
                                    fontSize: "1.1rem",
                                    letterSpacing: "0.5px",
                                    borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                                    transition: "all 0.3s ease",
                                    display: "block",
                                    cursor: "pointer"
                                } as React.CSSProperties}
                                onClick={handleContactClick}
                            >
                                {item.label}
                            </a>
                        );
                    }

                    return (
                        <Link 
                            key={item.label + item.href}
                            href={item.href}
                            className="mobile-nav-item"
                            style={{
                                // @ts-ignore
                                '--delay': index,
                                color: isActive ? ACTIVE_BG : "#fff",
                                textDecoration: "none",
                                fontWeight: isActive ? "700" : "600",
                                padding: "1rem 0",
                                borderRadius: "12px",
                                fontSize: "1.1rem",
                                letterSpacing: "0.5px",
                                borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                                transition: "all 0.3s ease",
                                display: "block",
                                cursor: "pointer"
                            } as React.CSSProperties}
                            onClick={(e) => handleNavItemClick(item.href, e)}
                        >
                            {item.label}
                        </Link>
                    );
                })}
            </div>
        </>
    );
};

export default Navbar;