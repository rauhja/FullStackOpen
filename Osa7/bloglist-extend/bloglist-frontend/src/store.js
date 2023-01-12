import {configureStore} from '@reduxjs/toolkit';
import notificationReducer from './reducers/notificationReducer';
import userReducer from './reducers/userReducer';
import loginReducer from './reducers/loginReducer';
import blogReducer from './reducers/blogReducer';

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    user: userReducer,
    login: loginReducer,
    blog: blogReducer,
  },
});

// anecdoteService.getAll().then(notes =>
//     notes.forEach(anecdote => {
//         store.dispatch(appendAnecdote(anecdote))
//     })
// )

export default store;
