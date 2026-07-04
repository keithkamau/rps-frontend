import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className='bg-gray-900 border-b border-gray-800'>
      <div className='max-w-7xl mx-auto px-4 h-16 flex items-center justify-between'>
        <Link to='/' className='text-xl font-bold text-white'>
          🎮 RPS Tournament
        </Link>

        <div className='flex items-center gap-4'>
          {isAuthenticated ? (
            <>
              <Link to='/tournament' className='text-gray-300 hover:text-white'>
                Tournament
              </Link>
              <Link
                to='/leaderboard'
                className='text-gray-300 hover:text-white'
              >
                Leaderboard
              </Link>
              <Link to='/profile' className='text-gray-300 hover:text-white'>
                {user?.username}
              </Link>
              <button
                onClick={() => {
                  logout();
                  navigate("/login");
                }}
                className='bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded'
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to='/login' className='text-gray-300 hover:text-white'>
                Login
              </Link>
              <Link
                to='/signup'
                className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded'
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
