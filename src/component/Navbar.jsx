import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ authenticatedUser, handleSignOut }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    handleSignOut();
    navigate('/signup');
  };

  return (
    <nav className="bg-gradient-to-r from-purple-600 to-pink-500 p-5 shadow-lg ">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/dashboard" className="text-white text-4xl font-extrabold hover:text-gray-300 transition duration-300 ease-in-out">
          Dashboard
        </Link>

        <div className="flex space-x-6">
          {authenticatedUser ? (
            <>
              {authenticatedUser.role === 'admin' && (
                <>
                  <Link to="/users" className="bg-blue-600 text-white px-5 py-2 rounded-md text-lg font-medium hover:bg-blue-500 hover:scale-105 transform transition duration-300 ease-in-out">
                    Users
                  </Link>
                  <Link to="/roles" className="bg-blue-600 text-white px-5 py-2 rounded-md text-lg font-medium hover:bg-blue-500 hover:scale-105 transform transition duration-300 ease-in-out">
                    Roles
                  </Link>
                  <Link to="/permissions" className="bg-blue-600 text-white px-5 py-2 rounded-md text-lg font-medium hover:bg-blue-500 hover:scale-105 transform transition duration-300 ease-in-out">
                    Permissions
                  </Link>
                </>
              )}
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-5 py-2 rounded-md text-lg font-medium hover:bg-red-500 hover:scale-105 transform transition duration-300 ease-in-out"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link to="/signup" className="bg-green-600 text-white px-5 py-2 rounded-md text-lg font-medium hover:bg-green-500 hover:scale-105 transform transition duration-300 ease-in-out">
                Signup
              </Link>
              <Link to="/signin" className="bg-blue-600 text-white px-5 py-2 rounded-md text-lg font-medium hover:bg-blue-500 hover:scale-105 transform transition duration-300 ease-in-out">
                Signin
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
