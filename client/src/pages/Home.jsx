import React from 'react';
import HeroSection from '../components/home/HeroSection';
import FeaturedProducts from '../components/home/FeaturedProducts';
import CategoryShowcase from '../components/home/CategoryShowcase';
import NewsletterSignup from '../components/home/NewsLetterSignup';
import ValuePropositions from '../components/home/ValuePropositions';
import Testimonials from '../components/home/Testimonials';
import WhyChooseUs from '../components/home/WhyChooseUs';
import InstagramFeed from '../components/home/InstagramFeed';
import FeaturedBrands from '../components/store/FeaturedBrands';
import BlogPreview from '../components/home/BlogPreview';

const Home = () => {
  return (
    <div>
      <HeroSection />
      <FeaturedProducts />
      <CategoryShowcase />
      <WhyChooseUs />
      <Testimonials />     
      <InstagramFeed />
      <BlogPreview />
      <ValuePropositions /> 
      <NewsletterSignup />
    </div>
  );
};

export default Home;