import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Stock', href: '/stock' },
  { name: 'History', href: '/history' },
  { name: 'Clients', href: '/clients' },
  
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const getButtonClasses = (href) => {
    const baseClasses = "px-3 py-2 rounded transition-colors duration-200";
    return location.pathname === href 
      ? `${baseClasses} bg-blue-500 text-white` 
      : `${baseClasses} hover:bg-gray-200`;
  };

  return (
    <nav className="bg-gray-100 py-4 px-6 flex items-center justify-between">
      <div className="flex items-center">
        <img 
          src="./Assets/Logo.png?height=40&width=40" 
          alt="Shree Balaji Logo" 
          className="h-10 w-10 mr-3" 
        />
        <div>
        <span className="text-xl font-semibold">Shree Balaji</span>
        <div className="text-lg ">Balaji Fruits & Vegetables</div>
        </div>
      </div>
      
      {/* Desktop Navigation */}
      <div className="hidden md:flex space-x-4">
        {navItems.map((item) => (
          <Link 
            key={item.name}
            to={item.href}
            className={getButtonClasses(item.href)}
          >
            {item.name}
          </Link>
        ))}
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <button 
          onClick={toggleMobileMenu}
          className="p-2 focus:outline-none"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M4 6h16M4 12h16M4 18h16" 
            />
          </svg>
        </button>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
            <div className="fixed top-0 right-0 w-64 h-full bg-white shadow-lg p-6">
              <button 
                onClick={toggleMobileMenu}
                className="absolute top-4 right-4 text-2xl"
              >
                &times;
              </button>
              <div className="flex flex-col space-y-4 mt-12">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`${getButtonClasses(item.href)} block w-full text-left`}
                    onClick={toggleMobileMenu}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}