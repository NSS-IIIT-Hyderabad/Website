"use client";
import React, { useEffect, useRef, useState } from "react";
// @ts-ignore
import Link from "next/link";
//@ts-ignore
import { usePathname } from "next/navigation";

const navItems = [
    { label: "Home", href: "/" },
    { label: "Events", href: "/events" },
    { label: "Contact Us", href: "/contact" },
    { label: "Members", href: "/members" },
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
                setShowNav(false); // scrolling down, hide navbar
            } else {
                setShowNav(true); // scrolling up, show navbar
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
            padding: "0.75rem 2rem",
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
                    <Link key={item.href} href={item.href} style={
                        item.href === pathname
                            ? {
                                background: "#ff2d2d",
                                color: "#222",
                                padding: "0.3rem 1rem",
                                borderRadius: "8px",
                                fontWeight: 500,
                                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                                border: "2px solid #ff2d2d"
                            }
                            : { color: "#fff", textDecoration: "none", fontWeight: 500 }
                    }>
                        {item.label}
                    </Link>
                ))}
            </div>
        </nav>
    );
};

export default Navbar;