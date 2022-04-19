import React, { useState, useEffect, useId } from 'react';
import { Link } from 'react-router-dom';

import { getUsers, createUser } from '../services/fetchAPI';

const Home = () => {
  const id = useId();
  const [username, setUsername] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    (async () => setUsers(await getUsers()))();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    await createUser(username);

    setUsers(await getUsers());

    setUsername('');
  };

  return (
    <div>
      <h2>Users App</h2>
      <form onSubmit={ handleSubmit }>
        <label htmlFor='username'>
          Username:
          <input
            type="text"
            value={ username }
            onChange={ ({ target: { value } }) => setUsername(value) }
          />
        </label>
        <button type="submit">Create User</button>
      </form>
      <h4>
        Users List:
        <ul>
          {
            users
              .map((user, index) => (
                <li key={ `${id}${index}` }>
                  <Link to={ `/${user.id}` }>
                    {user.name}
                  </Link>
                </li>
              ))
          }
        </ul>
      </h4>
    </div>
  );
}

export default Home;
