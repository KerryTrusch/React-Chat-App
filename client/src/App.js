import './App.css';
import { createContext, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import Login from './components/Login/Login';
import useToken from './components/useToken';
import Register from './components/Login/Register';
import AccSuccess from './components/Login/AccountSuccess';
import AppDriver from './components/AppDriver';
import Invite from './components/invite';
export const nameContext = createContext('User');
function App() {
  const { token, setToken } = useToken();
  let navigate = useNavigate();

  // We want users to only be able to visit our specified public directories (basically anything other than the main app)
  useEffect(() => {
    const publicDirectories = ["/login", "/register"];
    if (!token && !(window.location.pathname in publicDirectories)) {
      navigate('/login', { replace: true });
    }
  }, [token])

  useEffect(() => {
    if (token) {
      navigate('/channels/friends', { replace: true })
    }
  }, [token])

  if (!token) {
    return (
      <Routes>
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/success" element={<AccSuccess />} />
      </Routes>
    )
  }


  return (
    <nameContext.Provider value={sessionStorage.getItem('uname')}>
      <Routes>
        <Route path="/channels/*" element={<AppDriver />} />
        <Route path="/invite/*" element={<Invite />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/success" element={<AccSuccess />} />
      </Routes>
    </nameContext.Provider>
  );
}

export default App;
