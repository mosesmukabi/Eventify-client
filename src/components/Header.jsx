import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="bg-gray-100 py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="text-2xl font-bold text-blue-600">
          <Link to="/">Eventify</Link>
        </div>
        <nav className="flex items-center gap-4">
          <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>
          <Link to="/signup" className="bg-cyan-950 text-white px-4 py-2 rounded hover:bg-cyan-800">
            Sign Up
          </Link>
          <Link to="/login" className="bg-sky-400 text-white px-4 py-2 rounded hover:bg-sky-500">
            Login
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
