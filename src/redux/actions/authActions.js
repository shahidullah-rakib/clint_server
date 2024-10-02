import axios from 'axios';
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_LOGOUT,
} from '../constants/userConstant';

// Login Action
export const login = (username, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      'http://127.0.0.1:8000/api/users/login/',
      { username, password },
      config
    );

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    // Save JWT to localStorage
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    // Log the error to understand its structure
    console.log('Error object:', error);

    // Check if error has response and response.data before accessing detail
    const message =
      error.response && error.response.data
        ? error.response.data.detail ||
          error.response.data.error ||
          'An error occurred'
        : error.message || 'Network Error';

    dispatch({
      type: USER_LOGIN_FAIL,
      payload: message,
    });
  }
};

// Register Action
export const register = (username, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      'http://127.0.0.1:8000/api/users/register/',
      { username, password },
      config
    );

    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });

    // Automatically log in after registration
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    // Save JWT to localStorage
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    // Log the error to understand its structure
    console.log('Error object:', error);

    // Check if error has response and response.data before accessing detail
    const message =
      error.response && error.response.data
        ? error.response.data.detail ||
          error.response.data.error ||
          'An error occurred'
        : error.message || 'Network Error';

    dispatch({
      type: USER_REGISTER_FAIL,
      payload: message,
    });
  }
};
