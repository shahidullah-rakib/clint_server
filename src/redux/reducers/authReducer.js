// redux/reducers/authReducer.js
import {
  USER_LOGIN_FAILED,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTRATION_FAILED,
  USER_REGISTRATION_REQUEST,
  USER_REGISTRATION_SUCCESS,
} from './../constants/userConstant';

// LOGIN/REGISTER REDUCER
const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

// Initial state for login reducer
const initialLoginState = {
  userInfo: userInfoFromStorage,
  loading: false,
  error: null,
};

export const userLoginReducer = (state = initialLoginState, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { ...state, loading: true, error: null }; // Keep previous state and clear error
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload, error: null };
    case USER_LOGIN_FAILED:
      return { loading: false, error: action.payload }; // Preserve previous userInfo if available
    case USER_LOGOUT:
      return initialLoginState; // Reset to initial state on logout
    default:
      return state;
  }
};

// REGISTER REDUCER
const initialRegisterState = {
  loading: false,
  userInfo: null,
  error: null,
};

export const userRegisterReducer = (state = initialRegisterState, action) => {
  switch (action.type) {
    case USER_REGISTRATION_REQUEST:
      return { ...state, loading: true, error: null }; // Keep previous state and clear error
    case USER_REGISTRATION_SUCCESS:
      return { loading: false, userInfo: action.payload, error: null };
    case USER_REGISTRATION_FAILED:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
