"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
//@ts-ignore
import { usePathname } from "next/navigation";

const ACTIVE_BG = "#E90000"; // Use this color everywhere for active state

const navItems = [
    { label: "Home", href: "/" },
    { label: "Events", href: "/events" },
    { label: "Members", href: "/members" },
	{ label: "Contact Us", href: "/contact" }, 
    { label: "Login", href: "/login" }
];

const Navbar: React.FC = () => {
    const pathname = usePathname();
    const [showNav, setShowNav] = useState(true);
    const lastScrollY = useRef(0);

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
            background: "transparent",
            color: "#fff",
            padding: "0.60rem 2rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            zIndex: 10,

            backdropFilter: "blur(4px)",
            boxSizing: "border-box",
            transition: "top 0.3s"
        }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <img src="/favicon.ico" alt="favicon" style={{ width: 40, height: 40, borderRadius: "50%" }} />
                <span style={{ fontSize: "1.5rem", color: "#fff", letterSpacing: 1 }}>
                    NSS, IIIT HYDERABAD
                </span>
            </div>
            <div style={{ display: "flex", gap: "2rem" }}>
                {navItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        style={{
                            ...(item.href === pathname
                                ? {
                                        background: ACTIVE_BG,
                                        color: "#222",
                                        padding: "0.3rem 1rem",
                                        borderRadius: "8px",
                                        fontWeight: 500,
                                        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                                        border: `2px solid ${ACTIVE_BG}`,
                                        transition: "background 0.2s, color 0.2s, box-shadow 0.2s",
                                  }
                                : {
                                        color: "#fff",
                                        textDecoration: "none",
                                        fontWeight: 500,
                                        padding: "0.3rem 1rem",
                                        borderRadius: "8px",
                                        transition: "background 0.2s, color 0.2s, box-shadow 0.2s",
                                        cursor: "pointer",
                                  }),
                        }}
                        onMouseEnter={e => {
                            if (item.href !== pathname) {
                                e.currentTarget.style.background = "rgba(46, 37, 37, 0.2)";
                                e.currentTarget.style.color = "#fff";
                                e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.08)";
                            }
                        }}
                        onMouseLeave={e => {
                            if (item.href !== pathname) {
                                e.currentTarget.style.background = "transparent";
                                e.currentTarget.style.color = "#fff";
                                e.currentTarget.style.boxShadow = "none";
                            }
                        }}
                    >
                        {item.label}
                    </Link>
                ))}
            </div>
        </nav>
    );
};

export default Navbar;
