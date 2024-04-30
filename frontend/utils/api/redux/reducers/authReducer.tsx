// authReducer.tsx

import { getInitialState } from "../../getInitialState";
 
const initialState = getInitialState();

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
      case 'UPDATE_USER':
        return {
          ...state,
          user: action.payload,
        };
      case 'GET_CURRENT_USER':
        // Check if the user data is already available in the state
        if (state.user) {
          return state;
        }
        // If not, make an API call to fetch the user data
        return {
          ...state,
          isLoading: true, // You can add a loading state if needed
        };
      case 'GET_CURRENT_USER_SUCCESS':
        return {
          ...state,
          isLoading: false,
          user: action.payload,
        };
      case 'GET_CURRENT_USER_FAILURE':
        return {
          ...state,
          isLoading: false,
          error: action.payload, // You can store the error in the state if needed
        };
    default:
      return state;
  }
};

export default authReducer;