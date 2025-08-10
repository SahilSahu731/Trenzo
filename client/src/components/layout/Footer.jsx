import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

// --- Data for the footer links ---
const shopLinks = [
  { name: 'Apparel', href: '/store/apparel' },
  { name: 'Footwear', href: '/store/footwear' },
  { name: 'Accessories', href: '/store/accessories' },
  { name: 'New Arrivals', href: '/new-arrivals' },
];
const supportLinks = [
  { name: 'Contact Us', href: '/contact' },
  { name: 'FAQs', href: '/faq' },
  { name: 'Shipping & Returns', href: '/shipping-policy' },
  { name: 'Order Tracking', href: '/track-order' },
];
const companyLinks = [
  { name: 'About Us', href: '/about' },
  { name: 'Careers', href: '/careers' },
  { name: 'Privacy Policy', href: '/privacy-policy' },
  { name: 'Terms of Service', href: '/terms-of-service' },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    // STEP 1: This <footer> tag is the main container. 
    // Its background color will stretch the full width of the screen.
    <footer className="bg-gray-200 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      
      {/* STEP 2: This <div> inside has a max-width and is centered with `mx-auto`. 
          It holds all your content and prevents it from becoming too wide on large screens. */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">

          {/* Column 1: Brand & Social */}
          <div className="col-span-2 lg:col-span-2">
            <Link to="/" className="text-2xl font-bold text-gray-900 dark:text-white">E-Shop</Link>
            <p className="mt-4 max-w-xs text-sm text-gray-600 dark:text-gray-400">
              Your one-stop shop for curated fashion and accessories. Quality and style delivered from the heart of India.
            </p>
            <div className="mt-6 flex space-x-5">
              <a href="#" className="text-gray-400 hover:text-gray-500"><Facebook /></a>
              <a href="#" className="text-gray-400 hover:text-gray-500"><Instagram /></a>
              <a href="#" className="text-gray-400 hover:text-gray-500"><Twitter /></a>
              <a href="#" className="text-gray-400 hover:text-gray-500"><Linkedin /></a>
            </div>
          </div>

          {/* Column 2, 3, 4: Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-800 dark:text-gray-200">Shop</h3>
            <ul className="mt-4 space-y-3">
              {shopLinks.map(link => (
                <li key={link.name}><Link to={link.href} className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">{link.name}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-800 dark:text-gray-200">Support</h3>
            <ul className="mt-4 space-y-3">
              {supportLinks.map(link => (
                <li key={link.name}><Link to={link.href} className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">{link.name}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-800 dark:text-gray-200">Company</h3>
            <ul className="mt-4 space-y-3">
              {companyLinks.map(link => (
                <li key={link.name}><Link to={link.href} className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">{link.name}</Link></li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar with copyright and payment icons */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-gray-500 dark:text-gray-400 order-2 sm:order-1 mt-4 sm:mt-0">
            &copy; {currentYear} E-Shop, Inc. All rights reserved.
          </p>
          <div className="flex space-x-4 order-1 sm:order-2">
            <img src="https://js.stripe.com/v3/fingerprinted/img/visa-729c05c240c49b6b75957a07c7293c36.svg" alt="Visa" className="h-6"/>
            <img src="https://js.stripe.com/v3/fingerprinted/img/mastercard-4d8844094130711885b5e41b28c9848f.svg" alt="Mastercard" className="h-6"/>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;