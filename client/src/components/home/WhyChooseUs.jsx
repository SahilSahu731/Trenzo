import React from 'react';
import { Award, Feather, Box } from 'lucide-react';

const features = [
  {
    icon: Award,
    title: 'Unmatched Quality',
    description: 'We source the finest materials and partner with skilled artisans to ensure every product is built to last.'
  },
  {
    icon: Feather,
    title: 'Modern & Timeless Design',
    description: 'Our collections are curated to be both on-trend and classic, creating pieces you’ll wear for years to come.'
  },
  {
    icon: Box,
    title: 'Mindful Packaging',
    description: 'Every order is shipped in eco-friendly packaging, because we care about our planet as much as our products.'
  }
];

const WhyChooseUs = () => {
  return (
    <section className="bg-white dark:bg-gray-900 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image Column */}
          <div className="w-full h-80 lg:h-full rounded-lg overflow-hidden">
            <img 
              src="https://images.pexels.com/photos/3756879/pexels-photo-3756879.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Person thoughtfully choosing fabric"
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Content Column */}
          <div className="text-left">
            <p className="text-base font-semibold text-blue-600 dark:text-blue-400 uppercase">Our Commitment</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Designed for the Modern Wardrobe
            </h2>
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-400">
              We believe in more than just fashion; we believe in style with substance. Our mission is to provide you with pieces that are not only beautiful but are also crafted with integrity and care.
            </p>
            <div className="mt-8 space-y-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{feature.title}</h3>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;