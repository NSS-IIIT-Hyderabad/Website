"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Calendar, Info, Users, Phone, Menu, X, Shield } from "lucide-react";
import LoginButton from "../auth/LoginButton";
import { isCurrentUserAdmin } from "@/services/graphql/admin";

const navigationItems = [
    { label: "Home", href: "/", icon: Home },
    { label: "Events", href: "/events", icon: Calendar },
    { label: "Team", href: "/members", icon: Users },
    { label: "About", href: "/about", icon: Info },
    { label: "Contact", href: "/contact", icon: Phone }
];

export default function Navbar() {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [checkedAdmin, setCheckedAdmin] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        let active = true;

        const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

        const checkAdminWithRetry = async (attempts = 3): Promise<boolean> => {
            let lastError: unknown = null;
            for (let attempt = 1; attempt <= attempts; attempt += 1) {
                try {
                    const status = await isCurrentUserAdmin();
                    return status;
                } catch (err) {
                    lastError = err;
                    if (attempt < attempts) {
                        await delay(150 * attempt);
                    }
                }
            }
            throw lastError;
        };

        const checkAdminStatus = async () => {
            try {
                const admin = await checkAdminWithRetry();
                if (active) {
                    setIsAdmin(admin);
                }
            } catch (err) {
                console.error("Failed to check admin status:", err);
                if (active) {
                    setIsAdmin(false);
                }
            } finally {
                if (active) {
                    setCheckedAdmin(true);
                }
            }
        };

        const handleWindowFocus = () => {
            checkAdminStatus();
        };

        const handleVisibilityChange = () => {
            if (document.visibilityState === "visible") {
                checkAdminStatus();
            }
        };

        checkAdminStatus();
        window.addEventListener("focus", handleWindowFocus);
        document.addEventListener("visibilitychange", handleVisibilityChange);

        return () => {
            active = false;
            window.removeEventListener("focus", handleWindowFocus);
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, [pathname]);

    const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const footer = document.getElementById("footer");
        if (footer) {
            footer.scrollIntoView({ behavior: "smooth" });
        }
        setIsMobileMenuOpen(false);
    };

    // Login/Profile actions removed

    return (
        <div>
            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Main Navigation */}
            <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
                isScrolled 
                    ? 'bg-white/95 backdrop-blur-md shadow-nss-card border-b border-gray-200/20' 
                    : 'bg-white/80 backdrop-blur-sm'
            }`}>
                {/* Indian Flag Border */}
                <div className="h-1 bg-gradient-to-r from-saffron via-white to-india-green" />
                
                <div className="container mx-auto px-4 py-3">
                    <div className="flex items-center justify-between">
                        {/* Logo Section */}
                        <Link href="/" className="flex items-center space-x-3 group">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 via-white to-green-500 p-0.5 group-hover:scale-105 transition-all duration-300">
                                <Image 
                                    src="/favicon.ico" 
                                    alt="NSS Logo"
                                    width={48}
                                    height={48}
                                    priority
                                    className="w-full h-full rounded-full object-cover bg-white"
                                />
                            </div>
                            <div className="hidden sm:block">
                                <div className="font-bold text-xl text-blue-800">
                                    NSS
                                </div>
                                <div className="text-sm text-gray-600 font-medium -mt-1">
                                    IIIT Hyderabad
                                </div>
                            </div>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center space-x-1">
                            {navigationItems.map((item) => {
                                const IconComponent = item.icon;
                                const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
                                
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        style={{
                                            background: isActive ? '#332a67' : 'transparent',
                                        }}
                                        className={`group flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                                            isActive
                                                ? 'text-white shadow-lg'
                                                : 'text-gray-700 hover:text-green-600 hover:bg-green-50'
                                        }`}
                                    >
                                        <IconComponent className={`w-4 h-4 ${isActive ? 'text-white' : 'text-current group-hover:text-green-600'}`} />
                                        <span>{item.label}</span>
                                    </Link>
                                );
                            })}
                            
                            {/* Admin Link - Only show if user is admin */}
                            {checkedAdmin && isAdmin && (
                                <Link
                                    href="/admin"
                                    style={{
                                        background: pathname.startsWith('/admin') ? '#fef2f2' : 'transparent',
                                    }}
                                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                                        pathname.startsWith('/admin')
                                            ? 'text-red-700 shadow-sm border border-red-200'
                                            : 'text-red-600 hover:text-red-700 hover:bg-red-50'
                                    }`}
                                    title="Admin Dashboard"
                                >
                                    <Shield className="w-4 h-4 text-current" />
                                    <span>Admin</span>
                                </Link>
                            )}
                        </div>

                        {/* Login Button - Desktop */}
                        <div className="hidden lg:flex items-center ml-4">
                            <LoginButton />
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="flex items-center gap-3 lg:hidden">
                            <button
                                className="lg:hidden p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-all duration-200"
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                aria-label="Toggle menu"
                            >
                                {isMobileMenuOpen ? (
                                    <X className="w-6 h-6 text-gray-600" />
                                ) : (
                                    <Menu className="w-6 h-6 text-gray-600" />
                                )}
                            </button>
                        </div>
                        </div>
                    </div>
            </nav>

            {/* Mobile Menu */}
            <div className={`fixed top-0 right-0 h-full w-80 max-w-[90vw] bg-white z-50 lg:hidden transform transition-transform duration-300 ease-in-out ${
                isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
            } shadow-2xl border-l border-gray-100`}>
                <div className="p-6">
                    {/* Mobile Menu Header */}
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 via-white to-green-500 p-0.5">
                                <Image src="/favicon.ico" alt="NSS Logo" width={40} height={40} className="w-full h-full rounded-full object-cover bg-white" />
                            </div>
                            <div>
                                <div className="font-bold text-lg text-blue-800">NSS</div>
                                <div className="text-sm text-gray-600 -mt-1">IIIT Hyderabad</div>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-all duration-200"
                        >
                            <X className="w-5 h-5 text-gray-600" />
                        </button>
                    </div>

                    {/* Mobile Navigation Items */}
                    <div className="space-y-2">
                        {navigationItems.map((item) => {
                            const IconComponent = item.icon;
                            const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
                            
                            if (item.label === "Contact") {
                                return (
                                    <a
                                        key={item.label}
                                        href="#footer"
                                        onClick={handleContactClick}
                                        className="group flex items-center space-x-3 p-3 rounded-lg hover:bg-green-50 transition-all duration-200"
                                    >
                                        <IconComponent className="w-5 h-5 text-gray-600 group-hover:text-green-600" />
                                        <span className="font-medium text-gray-700 group-hover:text-green-700">{item.label}</span>
                                    </a>
                                );
                            }
                            
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`group flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
                                        isActive
                                            ? 'bg-blue-800 text-white shadow-lg'
                                            : 'hover:bg-green-50 text-gray-700'
                                    }`}
                                >
                                    <IconComponent className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-600 group-hover:text-green-600'}`} />
                                    <span className={`font-medium ${isActive ? 'text-white' : 'group-hover:text-green-700'}`}>{item.label}</span>
                                    {isActive && (
                                        <div className="ml-auto w-2 h-2 bg-white rounded-full" />
                                    )}
                                </Link>
                            );
                        })}
                        
                        {/* Mobile Admin Link - Only show if user is admin */}
                        {checkedAdmin && isAdmin && (
                            <Link
                                href="/admin"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
                                    pathname.startsWith('/admin')
                                        ? 'bg-red-50 text-red-700 shadow-sm border border-red-200'
                                        : 'hover:bg-red-50 text-red-600'
                                }`}
                            >
                                <Shield className={`w-5 h-5 ${pathname.startsWith('/admin') ? 'text-red-700' : 'text-red-600'}`} />
                                <span className="font-medium">Admin Dashboard</span>
                                {pathname.startsWith('/admin') && (
                                    <div className="ml-auto w-2 h-2 bg-red-700 rounded-full" />
                                )}
                            </Link>
                        )}
                    </div>

                    {/* Mobile Login Button */}
                    <div className="mt-6 pt-6 border-t border-gray-200">
                        <LoginButton />
                    </div>
                </div>
            </div>
        </div>
    );
}
