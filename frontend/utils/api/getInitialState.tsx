// utils/getInitialState.js

// Helper function to get the token from localStorage
const getTokenFromStorage = () => {
    // Check if the window object is available (client-side)
    if (typeof window !== 'undefined') {
      return window.localStorage.getItem('token');
    }
    // If it's server-side, return null or any other default value
    return null;
  };
  
  // Initialize the token only if we're on the client-side
  const token = typeof window !== 'undefined' ? getTokenFromStorage() : null;
  
  export const getInitialState = () => ({
    isLoggedIn: !!token,
    token: token || null,
  });