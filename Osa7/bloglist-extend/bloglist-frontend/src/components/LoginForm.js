import {TextField, Button} from '@mui/material';
import {useDispatch} from 'react-redux';
import {useField} from '../hooks';
import {logUser} from '../reducers/loginReducer';

const LoginForm = () => {
  const {reset: resetUsername, ...username} = useField('text');
  const {reset: resetPassword, ...password} = useField('password');

  const dispatch = useDispatch();

  const handleSubmit = event => {
    event.preventDefault();
    const credentials = {
      username: username.value,
      password: password.value,
    };
    dispatch(logUser(credentials));
  };

  return (
    <div>
      <h2>Log in to application</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <TextField label="username" margin="dense" {...username} />
        </div>
        <div>
          <TextField label="password" margin="dense" {...password} />
        </div>
        <Button variant="contained" color="primary" type="submit">
          login
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
