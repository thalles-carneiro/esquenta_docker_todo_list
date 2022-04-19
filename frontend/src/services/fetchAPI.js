import axios from 'axios';

const BASE_URL = 'http://localhost:3001';

const getUsers = async () => {
  try {
    const { data } = await axios.get(`${BASE_URL}/users`);
    return data;
  } catch(error) {
    console.error(error);
  }
}

const getUserById = async (id) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/users/${id}`);
    return data;
  } catch(error) {
    console.error(error);
  }
}

const createUser = async (name) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/users`, { name });
    return data;
  } catch(error) {
    console.error(error);
  }
}

export {
  getUsers,
  getUserById,
  createUser
};
