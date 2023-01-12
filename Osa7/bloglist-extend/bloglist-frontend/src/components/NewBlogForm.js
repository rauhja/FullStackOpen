import {TextField, Typography, Button, Box} from '@mui/material';
import {useDispatch} from 'react-redux';
import {useField} from '../hooks';
import {createBlog} from '../reducers/blogReducer';

const NewBlogForm = () => {
  const {reset: resetTitle, ...title} = useField('text');
  const {reset: resetAuthor, ...author} = useField('text');
  const {reset: resetUrl, ...url} = useField('text');

  const dispatch = useDispatch();

  const handleSubmit = event => {
    event.preventDefault();
    const newBlog = {
      title: title.value,
      author: author.value,
      url: url.value,
    };
    resetAuthor('');
    resetTitle('');
    resetUrl('');

    dispatch(createBlog(newBlog));
  };

  return (
    <Box>
      <Typography>Create new</Typography>
      <form onSubmit={handleSubmit}>
        <div>
          <TextField label="Title" margin="dense" size="small" {...title} />
        </div>
        <div>
          <TextField label="Author" margin="dense" size="small" {...author} />
        </div>
        <div>
          <TextField label="Url" margin="dense" size="small" {...url} />
        </div>
        <Button variant="contained" color="primary" size="small" type="submit">
          create
        </Button>
      </form>
    </Box>
  );
};

export default NewBlogForm;
