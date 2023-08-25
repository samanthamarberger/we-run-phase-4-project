import React from 'react';
import { Route, Routes } from 'react-router-dom'
import './App.css';
import Home from './Home';
import NavBar from './Navbar';
import { UserProvider } from './context/user';

function App(props) {

  return (
    <div className="App">
      <UserProvider> 
        <NavBar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/login" element={<Login />} />
        </Routes>
      </UserProvider>
    </div>
  );
}

export default App;
