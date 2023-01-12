import axios from 'axios';
import userService from './user';

const baseUrl = '/api/blogs';

const config = () => {
  return {
    headers: {
      Authorization: `bearer ${userService.getToken()}`,
    },
  };
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(response => response.data);
};

const create = async newObject => {
  const response = await axios.post(baseUrl, newObject, config());
  return response.data;
};

const like = async (id, blog) => {
  const request = await axios.put(`${baseUrl}/${id}`, blog);
  return request.data;
};

const remove = id => {
  return axios.delete(`${baseUrl}/${id}`, config());
};

const addComment = async (id, comment) => {
  const response = await axios.post(`${baseUrl}/${id}/comments`, {comment});
  return response.data;
};

const exportedObjects = {getAll, create, like, remove, addComment};
export default exportedObjects;
