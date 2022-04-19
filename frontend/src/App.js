import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import User from './pages/User';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path='/' element={ <Home /> } />
      <Route path='/:id' element={ <User /> } />
    </Routes>
  </BrowserRouter>
);

export default App;
