import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/slices/authSlices"; // Ensure path is correct
import {
  User,
  ShoppingCart,
  Search,
  Menu as MenuIcon,
  X,
  LogOut,
  Settings,
  LayoutDashboard,
  Sparkles,
  Star,
  Home,
} from "lucide-react";
import ThemeToggle from "../ThemeToggle"; // Ensure path is correct

const navLinks = [
  { name: "Home", href: "/", icon: Home },
  { name: "Explore", href: "/explore", icon: Sparkles },
  { name: "Best Sellers", href: "/best-sellers", icon: Star },
  { name: "Store", href: "/store", icon: ShoppingCart },
];

const Navbar = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, userInfo } = useSelector((state) => state.auth);

  const { cartItems } = useSelector((state) => state.cart);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const userMenuRef = useRef(null);
  const BOLD_ICON_STROKE = 2.25;

  const handleLogout = () => {
    dispatch(logout());
    setIsUserMenuOpen(false);
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "auto";
  }, [isMobileMenuOpen]);

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ease-in-out ${
      isActive
        ? "bg-blue-100 dark:bg-gray-800 text-blue-600 dark:text-blue-400"
        : "text-gray-600 dark:text-gray-300 hover:bg-gray-100/50 dark:hover:bg-gray-800/50"
    }`;

  return (
    <>
      <div className="sticky top-0 z-50 w-full py-4 flex justify-center">
        <header className="w-full max-w-6xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-full shadow-lg border border-gray-200 dark:border-gray-800">
          <nav className="px-4 sm:px-6">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-6">
                <Link
                  to="/"
                  className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight"
                >
                  E-Shop
                </Link>
              </div>
              <div className="hidden md:flex items-center gap-1.5">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.name}
                    to={link.href}
                    className={navLinkClass}
                  >
                    <link.icon size={16} strokeWidth={BOLD_ICON_STROKE} />{" "}
                    {link.name}
                  </NavLink>
                ))}
              </div>

              <div className="flex items-center gap-2 sm:gap-3">
                <div className="hidden sm:flex items-center gap-2">
                  <button className="p-2.5 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                    <Search size={20} strokeWidth={BOLD_ICON_STROKE} />
                  </button>
                  <ThemeToggle />
                </div>

                {isAuthenticated && (
                  <Link
                    to="/cart"
                    className="relative mr-3 p-2.5 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <ShoppingCart size={20} strokeWidth={BOLD_ICON_STROKE} />
                    {cartItems.length > 0 && (
                      <span className="absolute top-0 right-0 block h-5 w-5 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center ring-2 ring-white dark:ring-gray-900">
                        {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                      </span>
                    )}
                  </Link>
                )}

                {isAuthenticated ? (
                  <div ref={userMenuRef} className="relative">
                    <button
                      onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                      className="flex text-sm bg-gray-200 dark:bg-gray-700 rounded-full focus:outline-none ring-2 ring-offset-2 ring-offset-gray-100 dark:ring-offset-gray-900 ring-transparent focus:ring-blue-500 transition-shadow"
                    >
                      <img
                        className="h-9 w-9 rounded-full"
                        src={`https://api.dicebear.com/8.x/initials/svg?seed=${userInfo?.name}`}
                        alt="User avatar"
                      />
                    </button>
                    <div
                      className={`origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg py-1 bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none transition-all duration-200 ease-out ${
                        isUserMenuOpen
                          ? "opacity-100 scale-100"
                          : "opacity-0 scale-95 pointer-events-none"
                      }`}
                    >
                      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                        <p className="text-sm text-gray-900 dark:text-white">
                          Welcome back,
                        </p>
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {userInfo?.name}
                        </p>
                      </div>
                      <Link
                        to="/profile"
                        className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        <LayoutDashboard
                          size={18}
                          strokeWidth={BOLD_ICON_STROKE}
                        />{" "}
                        Profile
                      </Link>
                      <Link
                        to="/profile/settings"
                        className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        <Settings size={18} strokeWidth={BOLD_ICON_STROKE} />{" "}
                        Settings
                      </Link>
                      <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left flex items-center gap-3 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        <LogOut size={18} strokeWidth={BOLD_ICON_STROKE} />{" "}
                        Logout
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="hidden md:flex items-center gap-2">
                    <Link
                      to="/login"
                      className="px-5 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      className="px-5 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-indigo-600 rounded-md shadow-md hover:shadow-lg hover:scale-105 transition-all"
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
                <div className="flex items-center md:hidden">
                  <button
                    onClick={() => setIsMobileMenuOpen(true)}
                    className="p-2 -mr-2 rounded-md text-gray-500 dark:text-gray-400"
                  >
                    <MenuIcon size={28} strokeWidth={BOLD_ICON_STROKE} />
                  </button>
                </div>
              </div>
            </div>
          </nav>
        </header>
      </div>

      <div
        className={`fixed inset-0 z-50 transition-opacity duration-300 ease-in-out ${
          isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
        <div
          className={`absolute top-0 right-0 h-full w-full max-w-sm bg-white dark:bg-gray-900 shadow-xl transition-transform duration-300 ease-in-out ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
            <h2 className="font-bold text-xl text-gray-800 dark:text-white">
              E-Shop Menu
            </h2>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 -mr-2 rounded-md text-gray-500 dark:text-gray-400"
            >
              <X size={28} strokeWidth={BOLD_ICON_STROKE} />
            </button>
          </div>
          <div className="p-4 flex flex-col h-full">
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.href}
                  className={({ isActive }) =>
                    `flex items-center gap-4 px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                      isActive
                        ? "bg-blue-100 dark:bg-gray-800 text-blue-600 dark:text-blue-400"
                        : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`
                  }
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <link.icon size={22} strokeWidth={BOLD_ICON_STROKE} />{" "}
                  {link.name}
                </NavLink>
              ))}
            </nav>
            <div className="mt-auto pt-6 mb-20">
              {isAuthenticated ? (
                <div className="space-y-4">
                  <div className="px-4 text-center">
                    <img
                      className="h-16 w-16 rounded-full mx-auto mb-2"
                      src={`https://api.dicebear.com/8.x/initials/svg?seed=${userInfo?.name}`}
                      alt="User avatar"
                    />
                    <p className="font-semibold text-gray-800 dark:text-white">
                      {userInfo?.name}
                    </p>
                    <p className="text-sm text-gray-500">{userInfo?.email}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      to="/profile"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex flex-col items-center justify-center gap-1 p-3 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    >
                      <LayoutDashboard strokeWidth={BOLD_ICON_STROKE} />
                      <span className="text-xs font-medium">Profile</span>
                    </Link>
                    <Link
                      to="/cart"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex flex-col items-center justify-center gap-1 p-3 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    >
                      <ShoppingCart strokeWidth={BOLD_ICON_STROKE} />
                      <span className="text-xs font-medium">My Cart</span>
                    </Link>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-base font-medium text-white bg-red-600 rounded-md shadow-sm hover:bg-red-700 transition-colors"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <Link
                    to="/login"
                    className="w-full text-center px-4 py-2.5 text-base font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="w-full text-center px-4 py-2.5 text-base font-medium text-white bg-gradient-to-r from-blue-500 to-indigo-600 rounded-md shadow-lg hover:shadow-indigo-500/50 transition-shadow"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
