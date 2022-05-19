import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Home from './containers/Home';
import Signup from './containers/Signup';
import Login from './containers/Login';
import Layout from './hocs/Layout';
import Logout from './containers/Logout'; 
import { useSelector } from 'react-redux';
import { selectUser } from './features/loginSlice';

const App = () => {
  const user = useSelector(selectUser);
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          {user ? <Route path="/logout" element={<Logout />} /> : <Route path="/login" element={<Login />} />}
        </Routes>
      </Layout>
    </Router>
  )
};

export default App
