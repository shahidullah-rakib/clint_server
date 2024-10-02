import { combineReducers } from 'redux';
import { userRegisterReducer, userLoginReducer } from './userReducer';

const rootReducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
});

export default rootReducer;
