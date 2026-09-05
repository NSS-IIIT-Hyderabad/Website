"use client";
import React from "react";
import { ThemeProvider } from "./ThemeProvider";
import { AuthProvider } from "@/components/loginNlognout/first";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import AdminGuard from "@/components/common/AdminGuard";
import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from "@apollo/client";

const apolloClient = new ApolloClient({
  link: new HttpLink({
    uri: `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/graphql`,
    credentials: "include",
  }),
  cache: new InMemoryCache(),
});

// Root providers wrapper - Client Component
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider>
        <AuthProvider>
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
            <AdminGuard>{children}</AdminGuard>
          </main>
          <Footer />
        </div>
        </AuthProvider>
      </ThemeProvider>
    </ApolloProvider>
  );
}