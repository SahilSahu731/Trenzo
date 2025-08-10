import React from 'react';
import { Link } from 'react-router-dom';

// Import Swiper React components and modules
import { Swiper, SwiperSlide } from 'swiper/react';
// 1. REMOVED 'Lazy' from the import list
import { Autoplay, Pagination, Navigation, Parallax } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// --- Data for our carousel slides ---
const slidesData = [
  {
    image: "https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    supertitle: "New Season Arrivals",
    title: "Check Out The New Collection",
    subtitle: "Discover the latest trends in fashion and refresh your style with our stunning new arrivals.",
    buttonText: "Shop Now",
    buttonLink: "/store"
  },
  {
    image: "https://images.pexels.com/photos/375880/pexels-photo-375880.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    supertitle: "Limited Time Sale",
    title: "Up to 50% Off Select Styles",
    subtitle: "Don't miss out on incredible deals. Your favorite styles at prices you'll love.",
    buttonText: "View Deals",
    buttonLink: "/deals"
  },
  {
    image: "https://images.pexels.com/photos/322207/pexels-photo-322207.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    supertitle: "Timeless Accessories",
    title: "Elevate Your Look",
    subtitle: "From minimalist watches to statement pieces, find the perfect accessory to complete your outfit.",
    buttonText: "Explore Accessories",
    buttonLink: "/store/accessories"
  },
];

const HeroSection = () => {
  return (
    <section className="relative -top-24 h-screen w-full bg-black">
      <Swiper
        // 1. REMOVED 'Lazy' from the modules array
        modules={[Autoplay, Pagination, Navigation, Parallax]}
        speed={1000}
        parallax={true}
        // 2. REMOVED the lazy={true} prop
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          renderBullet: (index, className) => {
            return `<span class="${className} w-3 h-3 bg-white/50 backdrop-blur-sm transition-all duration-300"></span>`;
          },
        }}
        navigation={{
          nextEl: '.swiper-button-next-custom',
          prevEl: '.swiper-button-prev-custom',
        }}
        className="h-full w-full"
      >
        <div
          slot="container-start"
          className="parallax-bg"
          style={{
            'background-image':
              'url(https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)',
          }}
          data-swiper-parallax="-23%"
        ></div>

        {slidesData.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="absolute top-0 inset-0 z-10 flex flex-col justify-center items-center text-center text-white ">
                <p data-swiper-parallax="-300" className="text-lg font-semibold tracking-widest uppercase mb-2 opacity-80">{slide.supertitle}</p>
                <h1 data-swiper-parallax="-400" className="text-4xl md:text-6xl font-bold tracking-tight mb-4">{slide.title}</h1>
                <p data-swiper-parallax="-500" className="max-w-2xl text-base md:text-lg text-gray-200 mb-8 opacity-90">{slide.subtitle}</p>
                <div data-swiper-parallax="-600">
                    <Link 
                        to={slide.buttonLink}
                        className="bg-white text-gray-900 font-bold py-3 px-8 rounded-full text-sm uppercase hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                        {slide.buttonText}
                    </Link>
                </div>
            </div>
            {/* 3. UPDATED IMAGE HANDLING: Switched back to a standard img tag */}
            <div className="absolute inset-0 bg-black">
              {/* Changed 'data-src' back to 'src' and removed 'swiper-lazy' class */}
              <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
              {/* Removed the swiper-lazy-preloader div */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="swiper-button-prev-custom absolute top-1/2 left-4 z-10 p-3 bg-white/20 backdrop-blur-sm rounded-full cursor-pointer hover:bg-white/40 transition-colors">
        <ChevronLeft className="text-white" />
      </div>
      <div className="swiper-button-next-custom absolute top-1/2 right-4 z-10 p-3 bg-white/20 backdrop-blur-sm rounded-full cursor-pointer hover:bg-white/40 transition-colors">
        <ChevronRight className="text-white" />
      </div>
    </section>
  );
};

export default HeroSection;