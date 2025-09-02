import React from "react";
import Slideshow from "@components/home/Slideshow";
import AboutUs from "@components/home/AboutUs";
import Testimonials from "@components/home/Navbar";
import VolunteerReg from "@components/home/Navbar";
import Footer from "@components/home/Footer";
import Carousel from "@/utils/Carosel";
import Navbar from "@/utils/Navbar";

const images = [
  "/carosel-imgs/1.jpeg",
  "/carosel-imgs/2.jpg",
  "/carosel-imgs/3.jpg"
];

export default function Home() {
  return (
    <div style={{
      margin: 0,
      padding: 0,
      boxSizing: "border-box",
      width: "100vw",
      minHeight: "100vh",
      overflowY: "auto",
      overflowX: "hidden",
      position: "relative",
      top: 0,
      left: 0
    }}>
      <Carousel images={images} interval={3000}>
        <Navbar />
      </Carousel>
      <h1>Welcome to the NSS application!</h1>
      <Slideshow />
      <AboutUs />
      <Testimonials />
      <VolunteerReg />
      <Footer />
    </div>
  );
}
