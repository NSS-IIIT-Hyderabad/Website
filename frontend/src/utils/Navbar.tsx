"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
//@ts-ignore
import { usePathname } from "next/navigation";

const ACTIVE_BG = "#E90000"; // airtel Red

const navItems = [
    { label: "Home", href: "/" },
    { label: "Events", href: "/events" },
    { label: "FAQs", href: "/faqs" },
    { label: "Members", href: "/members" },
    // { label: "About", href: "#" },
	{ label: "Contact Us", href: "/contact" }, 
    { label: "Login", href: "/login" }
];

const Navbar: React.FC = () => {
    const pathname = usePathname();
    const [showNav, setShowNav] = useState(true);
    const lastScrollY = useRef(0);

        // Scroll to footer handler
        const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
            e.preventDefault();
            const footer = document.getElementById("footer");
            if (footer) {
                footer.scrollIntoView({ behavior: "smooth" });
            }
        };

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY.current && currentScrollY > 60) {
                setShowNav(false);
            } else {
                setShowNav(true);
            }
            lastScrollY.current = currentScrollY;
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav style={{
            position: "fixed",
            top: showNav ? 0 : -80,
            left: 0,
            width: "100%",
            maxWidth: "100vw",
            background: "linear-gradient(to bottom, rgba(0,0,0,1) -40%, rgba(0,0,0,0) 100%)", // "transparent"
            color: "#fff",
            padding: "0.60rem 2rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            zIndex: 2000,
            backdropFilter: "blur(4px)",
            WebkitBackdropFilter: "blur(10px)", // added new
            boxSizing: "border-box",
            transition: "top 0.3s, background 0.3s, box-shadow 0.3s",
            overflowX: "hidden"
        }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <img src="/favicon.ico" alt="favicon" style={{ width: 40, height: 40, borderRadius: "50%" }} />
                <span style={{ fontSize: "1.5rem", color: "#fff", letterSpacing: 1, fontFamily: "Merriweather, Georgia, 'Times New Roman', serif", fontWeight: "bold" }}>
                    NSS, IIIT HYDERABAD
                </span>
            </div>
            <div style={{ display: "flex", gap: "2rem" }}>
                {navItems.map((item) => {
                    // Special handling for Contact Us
                    if (item.label === "Contact Us") {
                        return (
                            <a
                                key={item.label}
                                href="#footer"
                                style={{
                                    color: "#fff",
                                    textDecoration: "none",
                                    fontWeight: "bold",
                                    padding: "0.3rem 1rem",
                                    borderRadius: "8px",
                                    border: "2px solid transparent",
                                    transition: "background 0.2s, color 0.2s, box-shadow 0.2s",
                                    cursor: "pointer",
                                    position: "relative"
                                }}
                                onClick={handleContactClick}
                                onMouseEnter={e => {
                                    e.currentTarget.style.background = "rgba(255, 212, 212, 0.19)";
                                    e.currentTarget.style.color = "#fff";
                                    e.currentTarget.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.11)";
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.background = "transparent";
                                    e.currentTarget.style.color = "#fff";
                                    e.currentTarget.style.boxShadow = "none";
                                }}
                            >
                                {item.label}
                            </a>
                        );
                    }
                    // Default link for other items
                    return (
                        <Link
                            key={item.label + item.href}
                            href={item.href}
                            style={{
                                ...(item.href === pathname
                                    ? {
                                        background: ACTIVE_BG,
                                        color: "#fff",
                                        padding: "0.3rem 1rem",
                                        borderRadius: "8px",
                                        fontWeight: "bold",
                                        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                                        border: `2px solid ${ACTIVE_BG}`,
                                        transition: "background 0.2s, color 0.2s, box-shadow 0.2s",
                                        textDecoration: "none",
                                    }
                                    : {
                                        color: "#fff",
                                        textDecoration: "none",
                                        fontWeight: "bold",
                                        padding: "0.3rem 1rem",
                                        borderRadius: "8px",
                                        border: "2px solid transparent",
                                        transition: "background 0.2s, color 0.2s, box-shadow 0.2s",
                                        cursor: "pointer",
                                    }),
                            }}
                            onMouseEnter={e => {
                                if (item.href !== pathname) {
                                    e.currentTarget.style.background = "rgba(255, 212, 212, 0.19)";
                                    e.currentTarget.style.color = "#fff";
                                    e.currentTarget.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.11)";
                                }
                            }}
                            onMouseLeave={e => {
                                if (item.href !== pathname) {
                                    e.currentTarget.style.background = "transparent";
                                    e.currentTarget.style.color = "#fff";
                                    e.currentTarget.style.boxShadow = "none";
                                }
                            }}
                            onClick={e => {
                                // Ripple effect
                                const target = e.currentTarget;
                                const ripple = document.createElement('span');
                                ripple.style.position = 'absolute';
                                ripple.style.left = '50%';
                                ripple.style.top = '50%';
                                ripple.style.transform = 'translate(-50%, -50%)';
                                ripple.style.width = ripple.style.height = '10px';
                                ripple.style.borderRadius = '50%';
                                ripple.style.background = 'rgba(255,255,255,0.25)';
                                ripple.style.pointerEvents = 'none';
                                ripple.style.zIndex = '9999';
                                ripple.style.transition = 'width 0.4s cubic-bezier(0.4,0,0.2,1), height 0.4s cubic-bezier(0.4,0,0.2,1), opacity 0.4s';
                                target.style.position = 'relative';
                                target.appendChild(ripple);
                                setTimeout(() => {
                                    ripple.style.width = ripple.style.height = '180px';
                                    ripple.style.opacity = '0';
                                }, 10);
                                setTimeout(() => {
                                    if (ripple.parentNode) ripple.parentNode.removeChild(ripple);
                                }, 410);
                            }}
                        >
                            {item.label}
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
};

export default Navbar;
