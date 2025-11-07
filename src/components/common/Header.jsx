import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Header = () => {
  const { user, logout, userType } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-indigo-600">
          H-RENT
        </Link>
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              {userType === 'owner' && (
                <Link to="/my-properties" className="text-gray-600 hover:text-indigo-600">
                  My Properties
                </Link>
              )}
              <Link to="/dashboard" className="text-gray-600 hover:text-indigo-600">
                Dashboard
              </Link>
              <Link to="/profile" className="text-gray-600 hover:text-indigo-600">
                Hi, {user.firstName}
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-600 hover:text-indigo-600">
                Login
              </Link>
              <Link
                to="/register"
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;