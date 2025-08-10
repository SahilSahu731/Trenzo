import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-100  dark:bg-gray-800 border-t border-slate-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          © {currentYear} E-Shop. All Rights Reserved.
        </p>
        <div className="flex items-center gap-6">
          <Link to="/privacy-policy" className="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white">
            Privacy Policy
          </Link>
          <Link to="/terms-of-service" className="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;