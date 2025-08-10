import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { Star } from 'lucide-react';

// Placeholder data for testimonials
const testimonials = [
  {
    quote: "The quality of the leather jacket I bought is outstanding! Truly feels like premium Kanpur craftsmanship. The delivery was surprisingly fast too.",
    author: "Rohan Gupta",
    location: "Kanpur, UP",
    rating: 5,
    avatar: `https://api.dicebear.com/8.x/initials/svg?seed=Rohan`
  },
  {
    quote: "I'm so impressed with the collection. I found the perfect dress for a wedding and received so many compliments. E-Shop is my new favorite!",
    author: "Priya Singh",
    location: "Lucknow, UP",
    rating: 5,
    avatar: `https://api.dicebear.com/8.x/initials/svg?seed=Priya`
  },
  {
    quote: "Customer service was incredibly helpful when I had a question about sizing. The support is top-notch and the products are great value.",
    author: "Amit Sharma",
    location: "Delhi",
    rating: 4,
    avatar: `https://api.dicebear.com/8.x/initials/svg?seed=Amit`
  },
  {
    quote: "Finally, an online store that delivers on its promises. The sneakers I ordered were exactly as described and fit perfectly. Highly recommended.",
    author: "Sneha Verma",
    location: "Prayagraj, UP",
    rating: 5,
    avatar: `https://api.dicebear.com/8.x/initials/svg?seed=Sneha`
  },
];

const StarRating = ({ rating }) => (
  <div className="flex items-center gap-0.5">
    {[...Array(5)].map((_, i) => (
      <Star key={i} className={`w-5 h-5 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 dark:text-gray-600'}`} />
    ))}
  </div>
);

const Testimonials = () => {
  return (
    <section className="py-16 sm:py-24 bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">What Our Customers Say</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400">
            We are proud to have a community of happy shoppers.
          </p>
        </div>
        
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={30}
          loop={true}
          autoplay={{ delay: 6000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index} className="pb-12">
              <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md h-full flex flex-col">
                <StarRating rating={testimonial.rating} />
                <blockquote className="mt-4 text-gray-600 dark:text-gray-300 flex-grow">
                  <p>"{testimonial.quote}"</p>
                </blockquote>
                <footer className="mt-6 flex items-center gap-4">
                  <img src={testimonial.avatar} alt={testimonial.author} className="w-12 h-12 rounded-full bg-gray-200" />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">{testimonial.author}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.location}</p>
                  </div>
                </footer>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;