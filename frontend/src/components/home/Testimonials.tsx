"use client";

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import { testimonials, Testimonial } from "@/data/testimonials"; // ✅ alias import

const Testimonials = () => {
  const [current, setCurrent] = useState(0);

  return (
    <section
      style={{
        padding: "4rem 2rem",
        width: "66%",
        margin: "0 auto",
        background: "#FAEBE8",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          marginBottom: "2rem",
          color: "#6095E3",
          fontSize: "2rem",
          fontWeight: "bold",
        }}
      >
        Testimonials
      </h2>

      <Swiper
        modules={[Autoplay]}
        loop={true}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        slidesPerView={"auto"}
        centeredSlides
        onSlideChange={(swiper) => setCurrent(swiper.realIndex)} // track current
        style={{ overflow: "visible" }}
      >
        {testimonials.map((t: Testimonial, index: number) => {
          const isActive = index === current;
          const isNext = index === (current + 1) % testimonials.length; // card to the right
          const isPrev =
            index === (current - 1 + testimonials.length) % testimonials.length; // card to the left

          let transform = "scale(0.9)";
          if (isActive) {
            transform = "scale(1)";
          } else if (isNext) {
            transform = "translateX(60px) scale(0.9)"; // push right
          } else if (isPrev) {
            transform = "translateX(-60px) scale(0.9)"; // push left
          }

          return (
            <SwiperSlide
              key={index}
              style={{
                background: "white",
                borderRadius: "16px",
                boxShadow: isActive
                  ? "0 6px 16px rgba(0,0,0,0.2)"
                  : "0 2px 8px rgba(0,0,0,0.1)",
                width: isActive ? "600px" : "500px",
                minHeight: "320px",
                display: "flex",
                flexDirection: "row",
                overflow: "hidden",
                position: "relative",
                transform,
                opacity: isActive ? 1 : 0.7,
                zIndex: isActive ? 2 : 1,
                transition: "all 0.6s ease-in-out",
              }}
            >
              {/* Left side: avatar + background block */}
              <div
                style={{
                  flex: "5 0 0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  background: "#FEF8E0",
                }}
              >
                <div
                  style={{
                    width: isActive ? "140px" : "110px",
                    height: isActive ? "140px" : "110px",
                    borderRadius: "50%",
                    background: "gray",
                    transition: "all 0.4s ease-in-out",
                  }}
                />
              </div>

              {/* Right side: text */}
              <div
                style={{
                  flex: "7 0 0",
                  padding: "2rem",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <h3
                  style={{
                    margin: 0,
                    fontSize: "1.2rem",
                    fontWeight: "600",
                  }}
                >
                  {t.name} – {t.title}
                </h3>
                <p
                  style={{
                    marginTop: "1rem",
                    fontSize: "1.15rem",
                    color: "#000",
                    lineHeight: 1.6,
                    textAlign: "left",
                  }}
                >
                  “{t.quote}”
                </p>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
};

export default Testimonials;
