import {Typography} from '@mui/material';
import {useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';

const User = () => {
  const id = useParams().id;
  const user = useSelector(state => state.user.find(u => u.id === id));

  if (!user) return null;

  return (
    <div>
      <Typography variant="h4" marginBottom={3}>
        {user.name}
      </Typography>
      {user.blogs.length > 0 ? (
        <div>
          <Typography variant="h6">Added blogs</Typography>
          <ul>
            {user.blogs.map(blog => (
              <li key={blog.id}>
                <Typography variant="span">{blog.title}</Typography>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <Typography variant="span">no blogs...</Typography>
      )}
    </div>
  );
};

export default User;
