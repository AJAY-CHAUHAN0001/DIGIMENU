import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Use Link for navigation
import '../components/Navbar2.css'
export const Navbar2 = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
      setIsOpen(!isOpen);
    };
  return (
    <>
    <div className='navlink'>
    <nav className="fixed top-0 left-0 w-full text-white shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 ">
            <Link to="/menugroup" className="text-white- text-4xl hover:text-orange-400 font-bold border-none outline-none">
            Admin
            </Link>
          </div>
          <div className="block lg:hidden">
            <button
              onClick={toggleMenu}
              className="text-white focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
                />
              </svg>
            </button>
          </div>
          {/* Links */}
          <div className={`lg:flex ${isOpen ? 'block' : 'hidden'} lg:block`}>
            <div className="flex space-x-4 ">
              <Link
                to="/menugroup"
                className="text-white- hover:text-orange-400 px-3 py-2  rounded-md text-sm font-medium"
            
              >
                MenuGroup
              </Link>
              <Link
                to="/food"
                className="text-white- hover:text-orange-400 px-3 py-2 rounded-md text-sm font-medium"
              >
                FoodGroup
              </Link>
              <Link
                to="/qty"
                className="text-white- hover:text-orange-400 px-3 py-2 rounded-md text-sm font-medium"
              >
                QtyGroup
              </Link>
              <Link
                to="/contact"
                className="text-white- hover:text-orange-400 px-3 py-2 rounded-md text-sm font-medium"
              >
                Contact
              </Link>
              <Link
                to="/tablebook"
                className="text-white- hover:text-orange-400 px-3 py-2 rounded-md text-sm font-medium"
              >
                BookAtable
              </Link>

            </div>
          </div>
        </div>
      </div>
    </nav>
    </div>
    </>
  )
}
