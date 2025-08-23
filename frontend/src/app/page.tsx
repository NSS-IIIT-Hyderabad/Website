import React from "react";
import Navbar from "@components/home/Navbar";
import Slideshow from "@components/home/Slideshow";
import AboutUs from "@components/home/AboutUs";
import FlagshipEvents from "@components/home/Navbar";
import Testimonials from "@components/home/Navbar";
import VolunteerReg from "@components/home/Navbar";
import Footer from "@components/home/Footer";

export default function Home() {
  return (
    <div>
      <h1>Welcome to the NSS application!</h1>
      <Navbar></Navbar>
      <Slideshow></Slideshow>
      <AboutUs></AboutUs>
      <FlagshipEvents></FlagshipEvents>
      <Testimonials></Testimonials>
      <VolunteerReg></VolunteerReg>
      <Footer></Footer>
    </div>
  );
}
