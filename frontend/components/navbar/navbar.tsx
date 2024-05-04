import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import  Link  from 'next/link';
import { logout } from '../../utils/api/redux/reducers/authActions';

import { FaSearch } from 'react-icons/fa'; // Import search icon

const Navbar = () => {
  const dispatch = useDispatch();
  const [authStatus, setAuthStatus] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const isLoggedIn = useSelector(state => state?.auth?.token);
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    isLoggedIn?.length && setAuthStatus(true);
  }, [isLoggedIn]);

  console.log('is lopgged in',isLoggedIn)

  const handleLogout = () => {
    dispatch(logout());
    router.push('/login');
  };

  const handleLogin = () => {
    router.push('/login');
  };

  const handleProfileIconClick = () => {
    setIsDropdownOpen(prevState => !prevState);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Perform search action using the searchQuery
    console.log('Search query:', searchQuery);
  };

  return (
    <div className="flex items-center  fixed top-0 z-50  w-full p-4 bg-gray-800 text-white">
      <div className="flex items-center">
        <div onClick={()=>router.push('/recipe')} className=" cursor-pointer text-xl font-bold">Tech_Inject</div>
      </div>
      <div className="flex-grow  "></div> 
  
      <div className="flex items-center flex-grow"> {/* Add flex-grow class */}
        <form onSubmit={handleSearchSubmit} className="   mr-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={handleSearchChange}
              className="py-3 pl-8 pr-4 text-sm w-96 bg-gray-700 text-white rounded focus:outline-none focus:bg-gray-600"
            />
            <FaSearch className="absolute top-0 left-2 bottom-0 my-auto text-gray-500" />
          </div>
        </form>
        <div className="flex-grow  "></div>  
        <div>
          {authStatus && (
            <button
              className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-500"
              onClick={handleProfileIconClick}
            >
              <span className="text-xl">Profile</span>
            </button>
          )}
          {isDropdownOpen && authStatus && (
            <div className="flex flex-col absolute transition-transform duration-500 right-0 p-2 mt-2 bg-white rounded shadow">
              <button
                className="block w-full px-4 py-2 text-sm text-gray-800 hover:bg-gray-200"
                onClick={handleLogout}
              >
                Logout
              </button>
              <button onClick={()=>router.push('/create-recipe')} className='block w-full px-4 py-2 text-sm text-gray-800 hover:bg-gray-200'>
                Add Recipe
              </button>
            </div>
          )}
        </div>
  
        <div>
          {!authStatus && (
            <button
              className="px-4 py-2 text-sm font-semibold text-white bg-blue-500 rounded hover:bg-blue-600"
              onClick={handleLogin}
            >
              Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
  
};

export default Navbar;