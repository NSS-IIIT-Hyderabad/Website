"use client";
import React from "react";

// Indian Flag Theme with Modern Design System
interface IndianTheme {
  name: string;
  colors: {
    // Indian Flag Colors
    saffron: string;
    white: string;
    green: string;
    navy: string;
    
    // Modern Color Palette
    primary: string;
    primaryLight: string;
    primaryDark: string;
    secondary: string;
    secondaryLight: string;
    accent: string;
    
    // Status Colors
    success: string;
    warning: string;
    error: string;
    info: string;
    
    // Surface Colors
    background: string;
    backgroundSecondary: string;
    surface: string;
    surfaceElevated: string;
    
    // Text Colors
    textPrimary: string;
    textSecondary: string;
    textMuted: string;
    textOnDark: string;
    
    // Border & Shadow
    border: string;
    borderLight: string;
    shadow: string;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    xxl: string;
  };
  borderRadius: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
    full: string;
  };
  shadows: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  transitions: {
    fast: string;
    medium: string;
    slow: string;
  };
}

const indianTheme: IndianTheme = {
  name: 'Indian Flag Modern',
  colors: {
    // Indian Flag Colors (Official)
    saffron: '#FF9933',    // Kesari/Saffron
    white: '#FFFFFF',      // Safed/White  
    green: '#138808',      // Hara/Green
    navy: '#000080',       // Navy Blue (Ashoka Chakra)
    
    // Modern Primary Palette
    primary: '#138808',        // Green as primary
    primaryLight: '#22c55e',   // Lighter green
    primaryDark: '#0f5a02',    // Darker green
    secondary: '#FF9933',      // Saffron as secondary
    secondaryLight: '#ffb366', // Lighter saffron
    accent: '#000080',         // Navy as accent
    
    // Status Colors
    success: '#22c55e',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
    
    // Surface Colors
    background: 'linear-gradient(135deg, #fff7ed 0%, #fef3c7 100%)',
    backgroundSecondary: '#fef7ed',
    surface: '#ffffff',
    surfaceElevated: '#fefefe',
    
    // Text Colors
    textPrimary: '#1f2937',
    textSecondary: '#4b5563',
    textMuted: '#9ca3af',
    textOnDark: '#ffffff',
    
    // Border & Shadow
    border: '#e5e7eb',
    borderLight: '#f3f4f6',
    shadow: 'rgba(0, 0, 0, 0.1)',
  },
  spacing: {
    xs: '0.25rem',   // 4px
    sm: '0.5rem',    // 8px
    md: '1rem',      // 16px
    lg: '1.5rem',    // 24px
    xl: '2rem',      // 32px
    xxl: '3rem',     // 48px
  },
  borderRadius: {
    sm: '0.375rem',  // 6px
    md: '0.5rem',    // 8px
    lg: '0.75rem',   // 12px
    xl: '1rem',      // 16px
    full: '9999px',  // Full circle
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  },
  transitions: {
    fast: '0.15s ease-in-out',
    medium: '0.3s ease-in-out',
    slow: '0.5s ease-in-out',
  },
};

const ThemeContext = React.createContext<IndianTheme>(indianTheme);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeContext.Provider value={indianTheme}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => React.useContext(ThemeContext);
export type { IndianTheme };