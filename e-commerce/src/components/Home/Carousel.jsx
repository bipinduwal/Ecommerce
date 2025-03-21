import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "../../index.css";

// import required modules
import { Pagination, Navigation, Autoplay } from "swiper/modules";

const Carousel = () => {
  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 3000, // Delay between slides in milliseconds
          disableOnInteraction: false, // Keep autoplay running after user interaction
        }}
        speed={2000}
        navigation={true}
        modules={[Pagination, Navigation, Autoplay]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src="/src/assets/photos/product1.jpg" alt="Pasa" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/sign.png" alt="Pasa" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/sign.png" alt="Pasa" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/logo1.png" alt="Pasa" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/sign.png" alt="Pasa" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/sign.png" alt="Pasa" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/sign.png" alt="Pasa" />
        </SwiperSlide>
        <SwiperSlide>Slide 8</SwiperSlide>
        <SwiperSlide>Slide 9</SwiperSlide>
      </Swiper>
    </>
  );
};

export default Carousel;
