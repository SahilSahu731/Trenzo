import React from 'react';

const AuthLayout = ({ children, imageUrl, title, subtitle }) => {
  return (
    <div className="h-screen bg-white dark:bg-gray-950">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        
        {/* Left Side: Image & Overlay */}
        <div className="relative hidden lg:block">
          <img
            src={imageUrl || "https://images.unsplash.com/photo-1590439498227-2454a8b75317?q=80&w=1887&auto=format&fit=crop"}
            alt="E-commerce store background"
            className="absolute inset-0 w-full h-full object-cover animate-kenburns"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
          <div className="relative h-full flex flex-col justify-end p-12 text-white">
            <h2 className="text-4xl font-bold leading-tight tracking-tight">
              {title || "Discover a World of Style."}
            </h2>
            <p className="mt-4 text-lg max-w-lg text-gray-200">
              {subtitle || "Your one-stop shop for the latest trends, curated just for you."}
            </p>
          </div>
        </div>

        {/* Right Side: Form Content */}
        <div className="flex items-center justify-center p-6 sm:p-12">
          {children}
        </div>
        
      </div>
    </div>
  );
};

export default AuthLayout;