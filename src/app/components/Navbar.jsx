"use client";
import { useContext, useState, useEffect, useRef } from 'react';
import UserContext from '@/app/context/userContent';
import Link from 'next/link';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);
  const mobileButtonRef = useRef(null);
  const { user, loading } = useContext(UserContext);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMobileMenuOpen &&
        mobileMenuRef.current &&
        mobileButtonRef.current &&
        !mobileMenuRef.current.contains(event.target) &&
        !mobileButtonRef.current.contains(event.target)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileMenuOpen]);

  if (loading) {
    return <div className="h-16 bg-gray-900"></div>;
  }

  return (
    <nav className="sticky top-0 z-50 shadow-md bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Left side - Logo and Desktop Menu */}
          <div className="flex items-center">
            {/* Mobile menu button */}
            <button
              ref={mobileButtonRef}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-800 sm:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span className="sr-only">Toggle menu</span>
              <i className={`text-xl ${isMobileMenuOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars'}`}></i>
            </button>

            {/* Logo */}
            <Link href="/">
              <div className="flex-shrink-0 flex items-center ml-4 sm:ml-0">
                <i className="fa-solid fa-tasks text-teal-400 text-2xl mr-2"></i>
                <span className="text-xl font-bold">WorkManager</span>
              </div>
            </Link>

            {/* Desktop menu */}
            <div className="hidden sm:ml-6 sm:flex sm:space-x-4">
              <Link href="/" className="inline-flex items-center px-3 py-2 text-sm font-medium rounded-md bg-gray-800 text-white hover:bg-teal-600">
                <i className="fa-solid fa-house mr-2"></i> Home
              </Link>
              <Link href="/add-task" className="inline-flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-300 hover:text-white hover:bg-gray-800">
                <i className="fa-solid fa-plus-circle mr-2"></i> Add Task
              </Link>
              <Link href="/showTask" className="inline-flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-300 hover:text-white hover:bg-gray-800">
                <i className="fa-solid fa-list-alt mr-2"></i> Show All Tasks
              </Link>
            </div>
          </div>

          {/* Right side - User Actions */}
          <div className="hidden sm:flex sm:items-center sm:space-x-4">
            {user ? (
              <div className="ml-3 relative">
                <div className="flex items-center space-x-2 cursor-pointer group">
                  <span className="text-sm font-medium text-white">{user.name}</span>
                  <i className="fa-solid fa-chevron-down text-xs text-gray-400 group-hover:rotate-180 transition-transform"></i>
                </div>
              </div>
            ) : (
              <>
                <Link href="/login" className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800">
                  <i className="fa-solid fa-sign-in-alt mr-1"></i> Login
                </Link>
                <Link href="/signup" className="bg-teal-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-teal-500 transition">
                  <i className="fa-solid fa-user-plus mr-1"></i> Sign Up
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile menu */}
        <div
          ref={mobileMenuRef}
          className={`sm:hidden ${isMobileMenuOpen ? 'block' : 'hidden'} bg-gray-900 border-t border-gray-700`}
        >
          <div className="pt-2 pb-3 space-y-1">
            <Link href="/" className="inline-flex items-center px-3 py-2 text-sm font-medium rounded-md bg-gray-800 text-white hover:bg-teal-600">
              <i className="fa-solid fa-house mr-2"></i> Home
            </Link>
            <Link href="/add-task" className="block px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-800">
              <i className="fa-solid fa-plus-circle mr-2"></i> Add Task
            </Link>
            <Link href="/showTask" className="block px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-800">
              <i className="fa-solid fa-list-alt mr-2"></i> Show All Tasks
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-700">
            {user ? (
              <div className="px-4">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-teal-600 flex items-center justify-center text-white font-semibold">
                    {user.name?.[0]?.toUpperCase() || "U"}
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-white">{user.name}</div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="px-2 space-y-1">
                <Link href="/login">
                  <span className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-800">
                    <i className="fa-solid fa-sign-in-alt mr-2"></i> Login
                  </span>
                </Link>
                <Link href="/signup">
                  <span className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-800">
                    <i className="fa-solid fa-user-plus mr-2"></i> Sign Up
                  </span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;