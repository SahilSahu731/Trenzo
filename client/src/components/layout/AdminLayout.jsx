import React, { useState } from 'react';
import { NavLink, Outlet, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/slices/authSlices';
import { 
  LayoutDashboard, Package, ShoppingCart, Users, BarChart, 
  ChevronLeft, ChevronRight, LogOut, Menu, X 
} from 'lucide-react';

const menuItems = [
  { name: 'Dashboard', to: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Products', to: '/admin/products', icon: Package },
  { name: 'Orders', to: '/admin/orders', icon: ShoppingCart },
  { name: 'Users', to: '/admin/users', icon: Users },
  { name: 'Analytics', to: '/admin/analytics', icon: BarChart },
];

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    // Navigate to admin login will be handled by AdminProtectedRoute
  };

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
      isActive 
      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300' 
      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
    }`;
  
  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <Link to="/admin/dashboard" className="text-xl  font-bold text-gray-900 dark:text-white">
          {isSidebarOpen && "QuickCart Admin"}
        </Link>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="hidden lg:block p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
          {isSidebarOpen ? <ChevronLeft size={20}/> : <ChevronRight size={20}/>}
        </button>
      </div>
      <nav className="flex-grow p-4 space-y-2">
        {menuItems.map(item => <NavLink key={item.name} to={item.to} className={navLinkClass}>
          <item.icon size={20} /> {isSidebarOpen && <span>{item.name}</span>}
        </NavLink>)}
      </nav>
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
          <LogOut size={20}/> {isSidebarOpen && <span>Logout</span>}
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* --- Desktop Sidebar --- */}
      <aside className={`hidden lg:flex flex-col bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-20'}`}>
        <SidebarContent />
      </aside>

      {/* --- Mobile Sidebar (Overlay) --- */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsMobileMenuOpen(false)}></div>
          <aside className="absolute top-0 left-0 h-full w-64 bg-white dark:bg-gray-800 shadow-xl">
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* --- Main Content Area --- */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        <header className="flex items-center justify-between lg:justify-end h-16 px-6 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden p-2 -ml-2 rounded-md">
            <Menu size={24}/>
          </button>
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium hidden sm:block">Welcome, {userInfo?.name}</span>
            <img className="h-9 w-9 rounded-full" src={`https://api.dicebear.com/8.x/initials/svg?seed=${userInfo?.name}`} alt="Admin avatar"/>
          </div>
        </header>
        <main className="flex-1 p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;