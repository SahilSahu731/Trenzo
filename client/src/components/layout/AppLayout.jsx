import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar'; // Adjust path if necessary
import Footer from './Footer';

const AppLayout = () => {

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar/>
      
      <main className="flex-grow">
        <Outlet />
      </main>
      
      <Footer />
    </div>
  );
};

export default AppLayout;