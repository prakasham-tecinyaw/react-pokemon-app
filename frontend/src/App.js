import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ProtectedRoute } from "./helpers/PrivateRoute"
import Home from './containers/Home';
import Layout from './hocs/Layout';
import Signup from './features/User/Signup';
import Login from './features/User/Login';
import Pokemon from './features/Pokemon/Pokemon';
import CatchPokemon  from './features/Pokemon/CatchPokemon';
import { useSelector } from 'react-redux';
import { userSelector } from './features/User/UserSlice';

const App = () => {
  const user = useSelector(userSelector);

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/my_pokemon" element={<Pokemon />}  />
          <Route exact path="/all_pokemon" element={<CatchPokemon />}  />
          {/* <Route exact path="/menu" element={<ProtectedRoute user={user}></ProtectedRoute>}/>   */}
        </Routes>
      </Layout>
    </Router>
  )
};

export default App
