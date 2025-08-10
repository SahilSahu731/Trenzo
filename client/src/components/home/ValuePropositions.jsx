import React from 'react';
import { Truck, RefreshCw, ShieldCheck, LifeBuoy } from 'lucide-react';

const propositions = [
  {
    icon: Truck,
    title: 'Fast & Free Shipping',
    description: 'Orders over ₹500 ship free, right to your doorstep anywhere in India.',
  },
  {
    icon: RefreshCw,
    title: 'Easy 14-Day Returns',
    description: 'Not a perfect fit? No problem. We offer a hassle-free return policy.',
  },
  {
    icon: ShieldCheck,
    title: 'Secure Payments',
    description: 'Your payments are processed securely with industry-leading encryption.',
  },
  {
    icon: LifeBuoy,
    title: 'Dedicated Support',
    description: 'Our customer support team is always here to help you with any questions.',
  },
];

const ValuePropositions = () => {
  return (
    <section className="bg-slate-50 dark:bg-gray-900 border-y border-slate-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* --- Section Header --- */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Why Shop With Us?
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400">
            We are committed to providing you with the best shopping experience.
          </p>
        </div>

        {/* --- Responsive Grid of Propositions --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {propositions.map((item, index) => (
            // Each item is now a card-like element with hover effects
            <div 
              key={index} 
              // On mobile (single column), text is centered. On larger screens, it's left-aligned.
              className="text-center shadow-2xl  sm:text-left p-6 rounded-lg transition-all duration-300 hover:bg-white dark:hover:bg-gray-800 hover:shadow-lg hover:-translate-y-1"
            >
              <div className="flex justify-center sm:justify-start">
                <div className="flex items-center justify-center h-14 w-14 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300">
                  <item.icon className="h-7 w-7" strokeWidth={2.25} />
                </div>
              </div>
              <h3 className="mt-5 text-lg font-semibold text-gray-900 dark:text-white">{item.title}</h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValuePropositions;