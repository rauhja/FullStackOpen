import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Routes, Route} from 'react-router-dom';
import {Container, Typography} from '@mui/material';

import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import BlogList from './components/BlogList';
import Users from './components/Users';
import User from './components/User';
import NavBar from './components/NavBar';
import Blog from './components/Blog';

import {login} from './reducers/loginReducer';
import {initializeBlogs} from './reducers/blogReducer';
import {initializeUsers} from './reducers/userReducer';

import userService from './services/user';

const App = () => {
  const dispatch = useDispatch();

  const user = useSelector(state => state.login);

  useEffect(() => {
    const userFromStorage = userService.getUser();
    if (userFromStorage) {
      dispatch(login(userFromStorage));
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(initializeUsers());
    dispatch(initializeBlogs());
  }, [dispatch]);

  if (user === null) {
    return (
      <Container>
        <Notification />
        <LoginForm />
      </Container>
    );
  }

  return (
    <Container>
      <div>
        <NavBar />
        <Typography
          variant="h5"
          sx={{m: 4, fontFamily: 'monospace', fontWeight: 500, letterSpacing: '.3rem'}}
        >
          BLOG APP
        </Typography>
        <Notification />
        <Routes>
          <Route path="/" element={<BlogList />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<User />} />
          <Route path="/blogs/:id" element={<Blog />} />
        </Routes>
      </div>
    </Container>
  );
};

export default App;
