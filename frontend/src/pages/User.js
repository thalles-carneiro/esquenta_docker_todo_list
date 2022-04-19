import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

import { getUserById } from '../services/fetchAPI';

const User = () => {
  const { id } = useParams();
  const [name, setName] = useState('');

  useEffect(() => {
    (async () => {
      const { name } = await getUserById(id);
      setName(name);
    })();
  }, [id]);

  return (
    <div>
      <Link to="/" >Voltar</Link>
      <h4>{ `Username: ${name}` }</h4>
    </div>
  );
}

export default User;
