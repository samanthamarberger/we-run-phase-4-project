import React from 'react';
import { Route, Routes } from 'react-router-dom'
import './App.css';
import Home from './Home';
import NavBar from './Navbar';
import { UserProvider } from './context/user';
import Signup from './Signup';
import Login from './Login';
import Trails from './Trails';
import Trail from './Trail';
import Profile from './Profile';

function App(props) {

  return (
    <div className="App" >
      <UserProvider> 
        <NavBar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/trails" element={<Trails />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/trails/:id" element={<Trail />} />
        </Routes>
      </UserProvider>
    </div>
  );
}

export default App;
