"use client";

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import { testimonials, Testimonial } from "@/data/testimonials";

const Testimonials = () => {
  const [current, setCurrent] = useState(0);
  
  return (
    <section className="w-full min-h-[calc(100vh-5rem)] h-auto flex flex-col justify-center py-4 sm:py-6 lg:py-8">
      <div className="text-center mb-4 sm:mb-6 lg:mb-8 px-4">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-blue-800 mb-2 sm:mb-3 lg:mb-4">
          Voices of Change
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-gray-700 max-w-xl lg:max-w-2xl mx-auto mb-2 sm:mb-3 lg:mb-4">
          Stories from volunteers making a real difference.
        </p>
        <div className="w-16 sm:w-20 lg:w-24 h-0.5 sm:h-1 bg-gradient-to-r from-orange-500 via-blue-800 to-green-600 mx-auto rounded-full"></div>
      </div>

      <div className="flex-1 flex items-center justify-center px-2 sm:px-2 py-3 sm:py-4 lg:py-6">
        <Swiper
          modules={[Autoplay]}
          loop={true}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          slidesPerView={1}
          spaceBetween={8}
          centeredSlides
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 16,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 24,
            },
          }}
          onSlideChange={(swiper) => setCurrent(swiper.realIndex)}
          className="w-full h-[24rem] sm:h-[28rem] lg:h-[36rem] max-w-full px-2 sm:px-0"
        >
        {testimonials.map((t: Testimonial, index: number) => {
          const isActive = index === current;
          const isNext = index === (current + 1) % testimonials.length;
          const isPrev = index === (current - 1 + testimonials.length) % testimonials.length;
          const isVisible = isActive || isNext || isPrev;

          return (
            <SwiperSlide
              key={index}
              className={`transition-all duration-500 ease-in-out p-1 sm:p-2 lg:p-3 ${
                !isVisible ? 'opacity-0 pointer-events-none' : ''
              }`}
            >
              <div className={`bg-white rounded-lg sm:rounded-xl lg:rounded-2xl h-[20rem] sm:h-[26rem] lg:h-[30rem] flex flex-col overflow-hidden relative transition-all duration-500 border-2 ${
                isActive 
                  ? 'shadow-lg sm:shadow-xl lg:shadow-2xl opacity-100 scale-102 sm:scale-103 lg:scale-105 border-blue-300 z-10' 
                  : 'shadow-md lg:shadow-lg opacity-60 scale-98 sm:scale-97 lg:scale-95 border-gray-200 z-0'
              }`}>
                <div className="flex-shrink-0 h-24 sm:h-32 lg:h-40 flex items-center justify-center bg-gradient-to-br from-blue-50 to-orange-50 rounded-t-xl lg:rounded-t-2xl">
                  <img
                    src="/favicon.ico"
                    alt="avatar"
                    className={`rounded-full object-cover transition-all duration-500 border-2 sm:border-3 lg:border-4 border-white shadow-md lg:shadow-lg ${
                      isActive 
                        ? 'w-16 h-16 sm:w-20 sm:h-20 lg:w-28 lg:h-28' 
                        : 'w-12 h-12 sm:w-16 sm:h-16 lg:w-24 lg:h-24'
                    }`}
                  />
                </div>

                <div className="flex-1 p-4 sm:p-6 lg:p-10 flex flex-col justify-center text-center">
                  <h3 className={`font-bold text-blue-800 mb-2 sm:mb-3 lg:mb-4 ${
                    isActive ? 'text-lg sm:text-xl lg:text-2xl' : 'text-base sm:text-lg lg:text-xl'
                  }`}>
                    {t.name}
                  </h3>
                  <p className={`text-gray-600 mb-2 sm:mb-4 lg:mb-6 font-medium ${
                    isActive ? 'text-sm sm:text-base lg:text-lg' : 'text-xs sm:text-sm lg:text-base'
                  }`}>
                    {t.title}
                  </p>
                  <p className={`text-gray-700 leading-relaxed italic ${
                    isActive ? 'text-sm sm:text-lg lg:text-xl line-clamp-3 sm:line-clamp-6 lg:line-clamp-8' : 'text-xs sm:text-base lg:text-lg line-clamp-2 sm:line-clamp-4 lg:line-clamp-6'
                  }`}>
                    "{t.quote}"
                  </p>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;
