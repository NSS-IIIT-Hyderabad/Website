"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Calendar, Info, Users, Phone, Rocket, Menu, X } from "lucide-react";

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
    const [userAuthenticated, setUserAuthenticated] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        
        // Check authentication status
        const uid = document.cookie.match(/(?:^|; )uid=([^;]*)/);
        setUserAuthenticated(!!uid);
        
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const footer = document.getElementById("footer");
        if (footer) {
            footer.scrollIntoView({ behavior: "smooth" });
        }
        setIsMobileMenuOpen(false);
    };

    const handleLogin = () => {
        window.location.replace("/login");
    };

    const handleProfile = () => {
        const uid = document.cookie.match(/(?:^|; )uid=([^;]*)/);
        if (uid) {
            window.location.replace(`/me/profile/?uid=${decodeURIComponent(uid[1])}`);
        }
    };

    return (
        <>
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
                                <img 
                                    src="/favicon.ico" 
                                    alt="NSS Logo" 
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
                                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                                            isActive
                                                ? 'text-white shadow-lg'
                                                : 'text-gray-700 hover:text-green-600 hover:bg-green-50'
                                        }`}
                                    >
                                        <IconComponent className="w-4 h-4" />
                                        <span>{item.label}</span>
                                    </Link>
                                );
                            })}
                        </div>

                        {/* Auth & Mobile Menu */}
                        <div className="flex items-center space-x-3">
                            {/* Auth Button */}
                            {!userAuthenticated ? (
                                <button
                                    // onClick={handleLogin}
                                    style={{
                                        background: '#332a67',
                                        opacity: 0.3,
                                    }}
                                    className="hidden sm:flex items-center space-x-2 px-4 py-2 bg-blue-800 text-white rounded-lg font-medium hover:bg-blue-900 transition-all duration-200 cursor-not-allowed"
                                >
                                    <Rocket className="w-4 h-4" />
                                    <span>Login</span>
                                </button>
                            ) : (
                                <button
                                    onClick={handleProfile}
                                    className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-blue-800 p-0.5 hover:scale-105 transition-all duration-200 cursor-pointer"
                                    title="Profile"
                                >
                                    <img 
                                        src="/favicon.ico" 
                                        alt="Profile" 
                                        className="w-full h-full rounded-full object-cover bg-white"
                                    />
                                </button>
                            )}

                            {/* Mobile Menu Button */}
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
                                <img src="/favicon.ico" alt="NSS Logo" className="w-full h-full rounded-full object-cover bg-white" />
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
                                        className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-all duration-200"
                                    >
                                        <IconComponent className="w-5 h-5 text-gray-600" />
                                        <span className="font-medium text-gray-700">{item.label}</span>
                                    </a>
                                );
                            }
                            
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
                                        isActive
                                            ? 'bg-blue-800 text-white shadow-lg'
                                            : 'hover:bg-gray-50 text-gray-700'
                                    }`}
                                >
                                    <IconComponent className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-600'}`} />
                                    <span className="font-medium">{item.label}</span>
                                    {isActive && (
                                        <div className="ml-auto w-2 h-2 bg-white rounded-full" />
                                    )}
                                </Link>
                            );
                        })}
                    </div>

                    {/* Mobile Auth Section */}
                    <div className="mt-8 pt-6 border-t border-gray-200">
                        {!userAuthenticated ? (
                            <button
                                // onClick={handleLogin}
                                className="w-full flex items-center justify-center space-x-2 p-3 bg-blue-800 text-white rounded-lg font-medium hover:bg-blue-900 transition-all duration-200 opacity-20 cursor-not-allowed"
                            >
                                <Rocket className="w-5 h-5" />
                                <span>Login to NSS Portal</span>
                            </button>
                        ) : (
                            <button
                                onClick={handleProfile}
                                className="w-full flex items-center justify-center space-x-2 p-3 rounded-lg bg-gradient-to-r from-green-500 to-blue-800 text-white font-medium transition-all duration-200"
                            >
                                <img src="/favicon.ico" alt="Profile" className="w-6 h-6 rounded-full" />
                                <span>View Profile</span>
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
