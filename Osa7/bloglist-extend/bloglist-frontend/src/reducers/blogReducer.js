import {createSlice} from '@reduxjs/toolkit';
import blogService from '../services/blogs';
import {createNotification} from './notificationReducer';

const blogSlice = createSlice({
  name: 'blog',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    appendBlog(state, action) {
      state.push(action.payload);
    },
    removeBlog(state, action) {
      const id = action.payload;
      return state.filter(blog => blog.id !== id);
    },
    updateBlog(state, action) {
      const updatedBlog = action.payload;
      const id = action.payload.id;
      return state.map(blog => (blog.id === id ? updatedBlog : blog));
    },
  },
});

export const {setBlogs, appendBlog, removeBlog, updateBlog} = blogSlice.actions;

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = blog => {
  return async dispatch => {
    try {
      const newBlog = await blogService.create(blog);
      dispatch(appendBlog(newBlog));
      dispatch(
        createNotification(
          {
            message: `a new blog '${blog.title}' by ${blog.author} added`,
            type: 'success',
          },
          5
        )
      );
    } catch (error) {
      dispatch(
        createNotification(
          {
            message: 'creating a blog failed: ' + error.response.data.error,
            type: 'error',
          },
          5
        )
      );
    }
  };
};

export const deleteBlog = blog => {
  return async dispatch => {
    try {
      await blogService.remove(blog.id);
      dispatch(removeBlog(blog.id));
      dispatch(
        createNotification(
          {message: `'${blog.title}' by ${blog.author} removed`, type: 'success'},
          5
        )
      );
    } catch (error) {
      dispatch(
        createNotification(
          {
            message: error.response.data.error,
            type: 'error',
          },
          5
        )
      );
    }
  };
};

export const likeBlog = (id, content) => {
  return async dispatch => {
    const likedBlog = await blogService.like(id, content);
    dispatch(updateBlog(likedBlog));
    dispatch(
      createNotification(
        {message: `you liked '${likedBlog.title}' by ${likedBlog.author}`, type: 'success'},
        5
      )
    );
  };
};

export const addComment = (id, comment) => {
  return async dispatch => {
    const addedComment = await blogService.addComment(id, comment);
    dispatch(updateBlog(addedComment));
    dispatch(createNotification({message: `you commented blog '${comment}'`, type: 'success'}, 5));
  };
};

export default blogSlice.reducer;
