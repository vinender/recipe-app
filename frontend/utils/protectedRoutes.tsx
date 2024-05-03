// components/ProtectedRoute.tsx
// components/ProtectedRoute.tsx

import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    // This code runs only on the client side
    if (typeof window !== 'undefined') {
      const authToken = localStorage.getItem('token');
      if (!authToken) {
        // Redirect to login page if authentication token is missing
        router.replace('/login');
      }
    }
  }, [router]);

  // Render children if authenticated
  return <div>{children}</div>;
};

export default ProtectedRoute;

