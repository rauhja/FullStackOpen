import {useDispatch, useSelector} from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom';
import {likeBlog, deleteBlog} from '../reducers/blogReducer';
import Comments from './Comments';
import {Box, Button, Typography, Link} from '@mui/material';

const Blog = () => {
  const {id} = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const blog = useSelector(state => state.blog.find(b => b.id === id));
  const user = useSelector(state => state.login);

  if (!blog) return null;

  const handleLike = () => {
    const {id} = blog;
    const likedBlog = {...blog, likes: blog.likes + 1, user: blog.user.id};
    dispatch(likeBlog(id, likedBlog));
  };

  const handleRemove = blog => {
    dispatch(deleteBlog(blog));
    navigate('/');
  };

  return (
    <Box>
      <Typography variant="h3">
        {blog.title} {blog.author}
      </Typography>
      <Box sx={{mt: 1, mb: 2}}>
        <Link href={blog.url}>{blog.url}</Link>
      </Box>
      <Box sx={{my: -1}}>
        <Typography variant="span">
          {blog.likes} likes
          <Button size="small" onClick={() => handleLike(blog)}>
            like
          </Button>
        </Typography>
      </Box>
      <Box sx={{my: -1}}>
        <Typography variant="span">
          added by {blog.user.name}
          {user.username === blog.user.username && (
            <Button size="small" color="error" onClick={() => handleRemove(blog)}>
              remove
            </Button>
          )}
        </Typography>
      </Box>
      <Box sx={{mt: 4}}>
        <Comments blog={blog} />
      </Box>
    </Box>
  );
};

export default Blog;
