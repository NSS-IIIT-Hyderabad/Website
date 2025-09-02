import React from "react";
import Carousel from "@/utils/Carousel";
import Navbar from "@/utils/Navbar";

const images = [
  "carosel-imgs/0.jpg",
  "carosel-imgs/2.jpg",
  "carosel-imgs/3.jpg"
];

export default function EventsPage() {
  return (
    <div
      style={{
        margin: 0,
        padding: "0 1.5rem", // <-- add horizontal padding to parent
        boxSizing: "border-box",
        width: "100%",
        minHeight: "100vh",
        overflowX: "hidden",
        background: "#FAEBE8"
      }}
    >
      <Navbar />
      <div
        style={{
          margin: "0.5rem auto",
          padding: "0.7rem",
          width: "100%",
          maxWidth: 1500, // <-- use px, matches Members page
          borderRadius: "1rem",
          background: "#fff",
          boxShadow: "0 2px 12px 0 rgba(0,0,0,0.04)",
        }}
      >
        <Carousel images={images} interval={3000} />
      </div>
      <div style={{ position: "relative", zIndex: 2 }}>
        <h1 style={{ color: '#050101ff', padding: '2rem' }}>Events</h1>
        {/* <Calendar /> */}
      </div>
    </div>
  );
}
