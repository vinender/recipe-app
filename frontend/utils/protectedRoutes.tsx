// components/ProtectedRoute.tsx
// components/ProtectedRoute.tsx

import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  const authToken = useSelector(state => state.auth.token);

  useEffect(() => {
    // This code runs only on the client side
    // Check for the presence of authentication token
    const storedToken = localStorage.getItem('token');
    if (!authToken && !storedToken) {
      // Redirect to login page if authentication token is missing
      router.replace('/login');
    }
  }, [authToken, router]);

  // Render children if authenticated
  return authToken ? <div>{children}</div> : null;
};

export default ProtectedRoute;
