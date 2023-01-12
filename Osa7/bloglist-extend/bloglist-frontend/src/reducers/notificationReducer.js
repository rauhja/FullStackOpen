import {createSlice} from '@reduxjs/toolkit';

let timeoutID = null;

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setNotification(state, action) {
      return action.payload;
    },
  },
});
export const {setNotification} = notificationSlice.actions;

export const createNotification = (message, time) => {
  return dispatch => {
    dispatch(setNotification(message));

    if (timeoutID) {
      clearTimeout(timeoutID);
    }
    timeoutID = setTimeout(() => {
      dispatch(setNotification(null));
    }, time * 1000);
  };
};
export default notificationSlice.reducer;
