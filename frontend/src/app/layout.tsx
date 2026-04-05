import type { Metadata } from "next";
import { Playfair_Display, Inter, Merriweather } from "next/font/google";
import "@/app/global.css";
import React from "react";
import ScrollThumbEffect from "../utils/Scrollbar";
import { Providers } from "@/providers/Providers";
import AuthRedirect from "@/components/common/AuthRedirect";
import KeyboardShortcuts from "@/components/common/KeyboardShortcuts";

const playfairDisplay = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const merriweather = Merriweather({ 
  weight: ["300", "400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-merriweather"
});

export const metadata: Metadata = {
  title: "NSS IIIT-H | National Service Scheme - IIIT Hyderabad",
  description: "Official website of National Service Scheme (NSS) at IIIT Hyderabad. Join us in community service, social responsibility, and making a positive impact.",
  keywords: "NSS, National Service Scheme, IIIT Hyderabad, community service, volunteering, social responsibility",
  authors: [{ name: "NSS IIIT Hyderabad" }],
  creator: "NSS IIIT Hyderabad",
  publisher: "NSS IIIT Hyderabad",
  robots: "index, follow",
  openGraph: {
    title: "NSS IIIT-H | National Service Scheme",
    description: "Join NSS IIIT Hyderabad in community service and social responsibility initiatives.",
    type: "website",
    locale: "en_IN",
    siteName: "NSS IIIT Hyderabad",
  },
  twitter: {
    card: "summary_large_image",
    title: "NSS IIIT-H | National Service Scheme",
    description: "Join NSS IIIT Hyderabad in community service and social responsibility initiatives.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfairDisplay.variable} ${inter.variable} ${merriweather.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#332a67" />
        {/* CSP for development - allows unsafe-eval for Next.js dev mode */}
        <meta 
          httpEquiv="Content-Security-Policy" 
          content="default-src 'self' http: https: data: blob: 'unsafe-inline' 'unsafe-eval'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://fonts.googleapis.com https://fonts.gstatic.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: https:; connect-src 'self' ws: wss:;" 
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon.ico" />
      </head>
      <body 
        style={{ 
          margin: 0, 
          padding: 0, 
          overflowX: "hidden", 
          fontFamily: "'Inter', 'Roboto', Arial, sans-serif",
          backgroundColor: "#FAEBE8",
          minHeight: "100vh"
        }}
      >
        <ScrollThumbEffect />
        <KeyboardShortcuts />
        <AuthRedirect />
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
