import {useDispatch} from 'react-redux';
import {useField} from '../hooks';
import {addComment} from '../reducers/blogReducer';
import {Box, Button, TextField, Typography} from '@mui/material';

const Comments = ({blog}) => {
  const {reset: resetComment, ...comment} = useField('text');
  const dispatch = useDispatch();

  const {id, comments} = blog;

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(addComment(id, comment.value));
    resetComment();
  };

  return (
    <div id="comments">
      <Typography variant="h5" marginBottom={1}>
        comments
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box sx={{'& button': {m: 1}}}>
          <TextField label="Leave a comment" {...comment} />
          <Button variant="contained" color="primary" type="submit">
            add comment
          </Button>
        </Box>
      </form>
      {comments.length > 0 ? (
        <ul>
          {comments.map((c, i) => (
            <li key={i}>
              <Typography variant="span">{c.comment}</Typography>
            </li>
          ))}
        </ul>
      ) : (
        <Box sx={{mt: 1}}>
          <Typography variant="span">no comments...</Typography>
        </Box>
      )}
    </div>
  );
};

export default Comments;
