import {useRef} from 'react';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';

import Togglable from './Togglable';
import NewBlogForm from './NewBlogForm';
import {Box, Table, TableBody, TableCell, TableRow} from '@mui/material';

const BlogList = () => {
  const blogFormRef = useRef();

  const blogs = useSelector(state => state.blog);
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);

  return (
    <Box>
      <Togglable buttonLabel="new note" ref={blogFormRef}>
        <NewBlogForm />
      </Togglable>
      <Table sx={{mt: 2}}>
        <TableBody>
          {sortedBlogs.map(blog => (
            <TableRow key={blog.id}>
              <TableCell>
                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
              </TableCell>
              <TableCell>{blog.author}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default BlogList;
