"use client";
import React from "react";
import { ThemeProvider } from "./ThemeProvider";
import { AuthProvider } from "@/components/auth/AuthProvider";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";

// Root providers wrapper - Client Component
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <AuthProvider user={{}}>
        <div className="app-container" style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
          <Navbar />
          <main 
            className="main-content" 
            style={{ 
              flex: 1, 
              paddingTop: "80px", /* Account for fixed navbar */
              minHeight: "calc(100vh - 80px)"
            }}
          >
            {children}
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}