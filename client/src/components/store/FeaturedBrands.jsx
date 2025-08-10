import React from 'react';

// --- Placeholder brand data with reliable logo links from logoipsum.com ---
const brands = [
  { name: 'Apex', logoUrl: 'https://www.logoipsum.com/logo/logo-221.svg' },
  { name: 'Meridian', logoUrl: 'https://www.logoipsum.com/logo/logo-225.svg' },
  { name: 'Vertex', logoUrl: 'https://www.logoipsum.com/logo/logo-243.svg' },
  { name: 'Catalyst', logoUrl: 'https://www.logoipsum.com/logo/logo-250.svg' },
  { name: 'Odyssey', logoUrl: 'https://www.logoipsum.com/logo/logo-258.svg' },
  { name: 'Momentum', logoUrl: 'https://www.logoipsum.com/logo/logo-262.svg' },
];

const FeaturedBrands = () => {
  return (
    <section className="bg-white dark:bg-gray-900 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
          
          {/* Left Column: Content */}
          <div className="lg:col-span-1 text-center lg:text-left">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Our Trusted Partners
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              We collaborate with industry-leading brands to bring you a curated selection of the highest quality products.
            </p>
          </div>

          {/* Right Column: Logos Grid */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-10">
              {brands.map((brand) => (
                <div key={brand.name} className="flex justify-center items-center">
                  <img
                    className="max-h-12 w-full object-contain filter grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300 ease-in-out"
                    src={brand.logoUrl}
                    alt={brand.name}
                  />
                </div>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default FeaturedBrands;