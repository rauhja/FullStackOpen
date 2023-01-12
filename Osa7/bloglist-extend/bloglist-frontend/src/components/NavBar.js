import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {logoutUser} from '../reducers/loginReducer';

import {AppBar, Box, Toolbar, Button, Typography, IconButton} from '@mui/material';

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.login);
  const handleLogOut = event => {
    dispatch(logoutUser());
  };
  return (
    <Box sx={{flexGrow: 1}}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{mr: 2}}></IconButton>
          <Box sx={{flexGrow: 1}}>
            <Button color="inherit" component={Link} to="/">
              blogs
            </Button>
            <Button color="inherit" component={Link} to="/users">
              users
            </Button>
          </Box>
          <Box sx={{flexGrow: 0, display: 'inline-flex', alignItems: 'center'}}>
            <Typography
              component="span"
              noWrap
              sx={{
                mr: 3,
                flexGrow: 1,
                fontFamily: 'roboto',
                fontWeight: 300,
                textDecoration: 'none',
              }}
            >
              {user.name} logged in
            </Typography>
            <Button color="inherit" onClick={handleLogOut}>
              logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
