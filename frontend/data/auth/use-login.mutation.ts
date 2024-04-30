import { useMutation } from 'react-query';
  import { useRouter } from 'next/router';
// import { setUser } from '@redux/slices/userSlice';
import { useDispatch } from 'react-redux';
import { API_ENDPOINTS } from '../../utils/api/endpoints';
import http from '../../utils/api/http';
import { login, updateUser } from '../../utils/api/redux/reducers/authActions';
 
export const useLoginMutation = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const loginUser = async (userData: { email: string; password: string }) => {
    const response = await http.post(API_ENDPOINTS.LOGIN, userData);
    return response.data;
  };

  return useMutation(loginUser, {
    onSuccess: (data) => {
      
      dispatch(login(data.user));
      console.log(data);
      dispatch(updateUser(data.user));
      // router.push('/');

      // Redirect based on the user's role
         router.push('/recipe');
     },
    onError: (error) => {
      console.log('Login failed:', error.response ? error.response.data : error);
    }
  });
};

