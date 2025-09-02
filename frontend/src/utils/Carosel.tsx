//generate a carousel component
"use client";
import React, { useState, useEffect, ReactNode } from "react";

interface CarouselProps {
  images: string[];
  interval?: number;
  children?: ReactNode; // For overlay content (e.g., Navbar)
  pageTitle?: string;
}

const Carousel: React.FC<CarouselProps> = ({ images, interval = 3000, children, pageTitle }) => {
  const [current, setCurrent] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTransitioning(true);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % images.length);
        setTransitioning(false);
      }, 400); // transition duration
    }, interval);
    return () => clearInterval(timer);
  }, [images.length, interval]);

  if (images.length === 0) return null;

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "75vh",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#ffffffff",
      }}
    >
      <img
        src={images[current]}
        alt={`carousel-${current}`}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transition: "opacity 0.5s cubic-bezier(0.4,0,0.2,1)",
          opacity: transitioning ? 0.5 : 1,
          borderRadius: "0 0 2rem 2rem",
          boxShadow: "0 8px 32px 0 rgba(0,0,0,0.2)",
          display: "block",
        }}
      />
      {/* Overlay content (e.g., Navbar) */}
      <div style={{ position: "absolute", top: 0, left: 0, width: "100%", zIndex: 2 }}>
        {children}
      </div>
      {/* Page Title Overlay */}
      {pageTitle && (
        <div style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 5,
          color: "#fff",
          fontWeight: 700,
          fontSize: "2rem",
          letterSpacing: "0.2em",
          textAlign: "center",
          textShadow: "0 2px 16px rgba(0, 0, 0, 0)",
          background: "rgba(0, 0, 0, 0)",
          borderRadius: "12px",
          padding: "0.5em 1.5em"
        }}>
          {pageTitle}
        </div>
      )}
      {/* Carousel dots */}
      <div style={{ position: "absolute", bottom: 20, left: 0, right: 0, textAlign: "center", zIndex: 3 }}>
        {images.map((_, idx) => (
          <span
            key={idx}
            style={{
              display: "inline-block",
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: idx === current ? "#ffffffff" : "#ffffffff",
              margin: "0 4px",
              cursor: "pointer",
              transition: "background 0.3s",
              border: "1px solid #333"
            }}
            onClick={() => setCurrent(idx)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;