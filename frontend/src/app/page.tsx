import React from "react";
import Navbar from "@/utils/Navbar";
import Carousel from "@/utils/Carousel";
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';


const images = [
  "/carosel-imgs/1.jpeg",
  "/carosel-imgs/2.jpg",
  "/carosel-imgs/3.jpg"
];

export default function Home() {
  return (
    <div
      style={{
        margin: 0,
        padding: 0,
        boxSizing: "border-box",
        width: "100vw",
        minHeight: "100vh",
        overflowY: "auto",
        overflowX: "hidden",
        position: "relative",
        top: 0,
        left: 0,
        background: "#FAEBE8"
      }}
    >
      <Header />
      <div
        style={{
          margin: 0,
      padding: 0,
      boxSizing: "border-box",
      width: "100vw",
      minHeight: "100vh",
      overflowX: "hidden",
      top: 0,
      left: 0,
      background: "#faf7f7ff"
        }}
      >
        <Carousel images={images} interval={3000} />
      </div>
      <h1 style={{ color: "#0eb33fff", padding: "2rem", textAlign: "center" }}>
        Welcome to the NSS application!
      </h1>
      {/* Add printable data for scroll */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "1rem" }}>
        {[...Array(20)].map((_, i) => (
          <p key={i} style={{ fontSize: "1.1rem", margin: "1.2rem 0" }}>
            This is sample content line #{i + 1}. Scroll down to see more content and test the horizontal padding and scrollbar symmetry.
          </p>
        ))}
      </div>
      <Footer/>
    </div>
  );
}
