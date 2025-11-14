import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { FaBars, FaUserCircle, FaGlobe } from 'react-icons/fa'; // Import icons

const Header = () => {
  const { user, logout, userType } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate('/login');
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuRef]);

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-indigo-600">
          h-rent
        </Link>
        
        {/* User Menu */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center space-x-2 border border-gray-300 rounded-full py-2 px-3 hover:shadow-md transition"
          >
            <FaBars className="text-gray-600" />
            <FaUserCircle className="text-gray-600 text-2xl" />
          </button>
          
          {/* Dropdown Menu */}
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-60 bg-white rounded-xl shadow-lg border py-2 z-50">
              {user ? (
                <>
                  <Link to="/dashboard" onClick={() => setMenuOpen(false)} className="block px-4 py-2 text-gray-800 hover:bg-gray-100 font-medium">
                    Dashboard
                  </Link>
                  <Link to="/profile" onClick={() => setMenuOpen(false)} className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                    Profile
                  </Link>
                  <Link to="/chat" onClick={() => setMenuOpen(false)} className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                    Messages
                  </Link>
                  {userType === 'owner' ? (
                    <Link to="/create-property" onClick={() => setMenuOpen(false)} className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                      List your property
                    </Link>
                  ) : (
                     <Link to="/my-requests" onClick={() => setMenuOpen(false)} className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                      My Requests
                    </Link>
                  )}
                  <hr className="my-2" />
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    Log out
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setMenuOpen(false)} className="block px-4 py-2 text-gray-800 hover:bg-gray-100 font-medium">
                    Log in
                  </Link>
                  <Link to="/register" onClick={() => setMenuOpen(false)} className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                    Sign up
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;