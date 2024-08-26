import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { FreeMode, Pagination } from 'swiper/modules';
import kutaImage from "./../../assets/homeCatergoryDtl/Apartment cover.jpg";
import romeImage from "./../../assets/homeCatergoryDtl/Apartment cover.jpg";
import anjunaImage from "./../../assets/homeCatergoryDtl/Apartment cover.jpg";
import dubaiImage from "./../../assets/homeCatergoryDtl/Apartment cover.jpg";
import './card2.css'

const destinations = [
  {
    image: kutaImage,
    title: "Kuta",
    subtitle: "Indonesia",
  },
  {
    image: romeImage,
    title: "Rome",
    subtitle: "Italy",
  },
  {
    image: anjunaImage,
    title: "Anjuna",
    subtitle: "India",
  },
  {
    image: dubaiImage,
    title: "Dubai",
    subtitle: "United Arab Emirates",
  },
  {
    image: dubaiImage,
    title: "Dubai",
    subtitle: "United Arab Emirates",
  },
  // Add more destinations as needed
];

const Card2 = () => {
  return (
    <div className="w-full px-4 py-6">
      <h2 className="text-xl font-bold mb-4">
        Explore stays in trending destinations
      </h2>
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Pagination]}
        className="mySwiper"
      >
        {destinations.map((destination, index) => (
          <SwiperSlide key={index} className="swiper-slide">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={destination.image}
                alt={destination.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{destination.title}</h3>
                <p className="text-gray-500">{destination.subtitle}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Card2;
