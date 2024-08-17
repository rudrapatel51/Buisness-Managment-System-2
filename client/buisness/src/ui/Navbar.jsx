import React, { useState } from 'react';
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
        <div className="flex items-center justify-between w-full">
  <div className="flex items-center">
    {/* <img src="/path-to-logo.svg" alt="Solid" className="h-8 w-auto" /> */}
    <h1 className='h-8 w-auto text-xl font-bold'>Webx</h1>
  </div>
  
  <div className="hidden sm:flex sm:justify-center sm:w-full sm:space-x-8 p-5">
    <Link to="/" className="text-blue-500 px-3 py-2 text-sm font-medium">Home</Link>
    <Link href="#" className="text-gray-500 hover:text-gray-700 px-3 py-2 text-sm font-medium">Features</Link>
    <Link href="#" className="text-gray-500 hover:text-gray-700 px-3 py-2 text-sm font-medium">Blog</Link>
    <Link href="#" className="text-gray-500 hover:text-gray-700 px-3 py-2 text-sm font-medium">Docs</Link>
    <Link href="#" className="text-gray-500 hover:text-gray-700 px-3 py-2 text-sm font-medium">Support</Link>
  </div>
  
  <div className="hidden sm:flex sm:items-center sm:space-x-4">
    <button className="bg-gray-100 p-1 rounded-full text-gray-400 hover:text-gray-500">
      {/* Search icon */}
    </button>
    <button className="bg-gray-100 p-1 rounded-full text-gray-400 hover:text-gray-500">
      {/* Dark mode toggle icon */}
    </button>
    <Link to="/login/admin" className="w-24 text-center text-gray-500 hover:text-gray-700 px-4 py-2 text-sm font-medium">Owner</Link>
    <Link to="/login" className="w-24 text-center bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium">Employee</Link>
  </div>
</div>


          <div className="-mr-2 flex items-center sm:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
              <span className="sr-only">Open main menu</span>
              <GiHamburgerMenu size={30}/>
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="sm:hidden">
          <div className="fixed z-50 pt-2 pb-3 space-y-1 bg-white right-9 p-5">
            <Link href="#" className="block px-3 py-2 text-base font-medium text-blue-500">Home</Link>
            <Link href="#" className="block px-3 py-2 text-base font-medium text-gray-500 hover:text-gray-700">Features</Link>
            <Link href="#" className="block px-3 py-2 text-base font-medium text-gray-500 hover:text-gray-700">Blog</Link>
            <Link href="#" className="block px-3 py-2 text-base font-medium text-gray-500 hover:text-gray-700">Docs</Link>
            <Link href="#" className="block px-3 py-2 text-base font-medium text-gray-500 hover:text-gray-700">Support</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;