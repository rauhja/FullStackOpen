import {createSlice} from '@reduxjs/toolkit';
import {createNotification} from './notificationReducer';

import userService from '../services/user';
import loginService from '../services/login';

const loginSlice = createSlice({
  name: 'login',
  initialState: null,
  reducers: {
    login(state, action) {
      return action.payload;
    },
    logout(state, action) {
      return null;
    },
  },
});

export const {login, logout} = loginSlice.actions;

export const logUser = credentials => {
  return async dispatch => {
    try {
      const user = await loginService.login(credentials);
      userService.setUser(user);
      dispatch(login(user));
      dispatch(createNotification({message: `${user.name} logged in!`, type: 'success'}, 5));
    } catch (error) {
      dispatch(createNotification({message: 'wrong username/password', type: 'error'}, 5));
    }
  };
};

export const logoutUser = () => {
  return async dispatch => {
    userService.clearUser();
    dispatch(logout());
    dispatch(createNotification({message: 'good bye!', type: 'success'}, 5));
  };
};

export default loginSlice.reducer;
