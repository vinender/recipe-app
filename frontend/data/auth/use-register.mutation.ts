import { useMutation } from 'react-query';
import { useRouter } from 'next/router';
// import { setUser } from '@redux/slices/userSlice';
// import { useDispatch } from 'react-redux';
import { API_ENDPOINTS } from '../../utils/api/endpoints';
import http from '../../utils/api/http';
 

export const usRegisterMutation = () => {
  const router = useRouter();

  const registerUser = async (userData) => {
    const response = await http.post(API_ENDPOINTS.REGISTER, userData);
    return response.data;
  };

  return useMutation(registerUser, {
    onSuccess: (data) => {
      // Dispatch setUser action with user data
      // setUser(data);

      // Redirect to the tracker page
      router.push('/tracker');
    },
    onError: (error) => {
      console.log('Registration failed:', error.response ? error.response.data : error);
    },
  });
};

