import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import  Link  from 'next/link';
import { logout } from '../../utils/api/redux/reducers/authActions';


const Navbar = () => {
  const dispatch = useDispatch();
  const [authStatus, setAuthStatus]  = useState(false)

  const isLoggedIn = useSelector(state => state?.auth?.token);

  useEffect(()=>{
    isLoggedIn.length && setAuthStatus(true)
  },[])
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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

  return (
    <div className="flex items-center justify-between w-full p-4 bg-gray-800 text-white">
      <div className="flex items-center">
        <div className="text-xl font-bold">Logo</div>
      </div>

      <div className="flex items-center">
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
          <div className="absolute right-0 p-2 mt-2 bg-white rounded shadow">
            <button
              className="block w-full px-4 py-2 text-sm text-gray-800 hover:bg-gray-200"
              onClick={handleLogout}
            >
              Logout
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
