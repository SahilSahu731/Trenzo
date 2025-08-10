import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { User, Edit, Shield, Settings as SettingsIcon } from 'lucide-react';

const menuItems = [
  { name: 'Profile', to: '/profile', icon: User, end: true },
  { name: 'Edit', to: 'edit', icon: Edit },
  { name: 'Settings', to: 'settings', icon: SettingsIcon },
  { name: 'Security', to: 'security', icon: Shield },
];

const UserLayout = () => {
  const { userInfo } = useSelector((state) => state.auth);

  // --- Styling for the Desktop Sidebar Links ---
  const sidebarLinkClass = ({ isActive }) =>
    `w-full flex items-center gap-3 px-4 py-2.5 rounded-md text-sm font-medium transition-colors ${
      isActive 
      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300' 
      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
    }`;

  // --- Styling for the Mobile Bottom Bar Links ---
  const bottomNavLinkClass = ({ isActive }) =>
    `flex flex-col items-center gap-1 w-full pt-2 pb-1 transition-colors text-xs font-medium ${
      isActive 
      ? 'text-blue-600 dark:text-blue-400' 
      : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
    }`;

  return (
    // 2. ADD BOTTOM PADDING: This prevents content from being hidden behind the fixed bottom bar on mobile.
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-24 lg:pb-12">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        
        {/* --- Profile Sidebar (Desktop) --- */}
        {/* 1. HIDE ON MOBILE: This sidebar will now only be visible on large screens. */}
        <aside className="hidden lg:block w-full lg:w-1/4 lg:flex-shrink-0">
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <div className="text-center mb-6">
              <img 
                className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-gray-200 dark:border-gray-700" 
                src={`https://api.dicebear.com/8.x/initials/svg?seed=${userInfo?.name}`} 
                alt="User avatar"
              />
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">{userInfo?.name}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">{userInfo?.email}</p>
            </div>
            <nav className="space-y-2">
              {menuItems.map(item => (
                <NavLink
                  key={item.name}
                  to={item.to}
                  end={item.end}
                  className={sidebarLinkClass}
                >
                  <item.icon size={20} />
                  <span>{item.name === 'Profile Overview' ? 'Overview' : item.name}</span>
                </NavLink>
              ))}
            </nav>
          </div>
        </aside>

        {/* --- Nested Route Content --- */}
        <main className="w-full lg:w-3/4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md min-h-full">
            <Outlet />
          </div>
        </main>
      </div>

      {/* --- 3. THE NEW BOTTOM NAVIGATION BAR (MOBILE) --- */}
      {/* This nav is fixed to the bottom and is only visible on screens smaller than 'lg'. */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-t-lg">
        <div className="flex justify-around items-center h-16">
          {menuItems.map(item => (
            <NavLink
              key={item.name}
              to={item.to}
              end={item.end}
              className={bottomNavLinkClass}
            >
              <item.icon size={24} strokeWidth={2.25} />
              <span>{item.name === 'Profile Overview' ? 'Profile' : item.name}</span>
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default UserLayout;