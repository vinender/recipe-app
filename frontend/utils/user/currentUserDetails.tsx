// useCurrentUserDetails.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import http from '../api/http';
 
const useCurrentUserDetails = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCurrentUserDetails = async () => {
      try {
        setLoading(true);
        const response = await http.get('/current-user'); 
        setUserDetails(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchCurrentUserDetails();

    return () => {
      setUserDetails(null);
      setLoading(true);
      setError(null);
    };
  }, []);

  return { userDetails, loading, error };
};

export default useCurrentUserDetails;
