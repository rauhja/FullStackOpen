import {
  Card,
  TableContainer,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';

const Users = () => {
  const users = useSelector(state => state.user);
  return (
    <div>
      <Typography variant="h5" marginBottom={3}>
        Users
      </Typography>
      <TableContainer sx={{maxWidth: 400}} component={Card}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography>name</Typography>
              </TableCell>
              <TableCell align="left">
                <Typography>blogs created</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(user => (
              <TableRow key={user.id}>
                <TableCell>
                  <Typography>
                    <Link to={`/users/${user.id}`}>{user.name}</Link>
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography>{user.blogs.length}</Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Users;
