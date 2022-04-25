import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import Login from './components/Login/Login';
import useToken from './components/useToken';
import Register from './components/Login/Register';
import AccSuccess from './components/Login/AccountSuccess';
import AppDriver from './components/AppDriver';
function App() {
  const { token, setToken } = useToken();
  let navigate = useNavigate();

  // We want users to only be able to visit our specified public directories (basically anything other than the main app)
  useEffect(() => {
    const publicDirectories = ["/login", "/register", "success"];
    if (!token && !(window.location.pathname in publicDirectories)) {
      navigate('/login', {replace: true});
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
    <Routes>
      <Route path="/" element={<AppDriver token={token} />} />
    </Routes>
  );
}

export default App;
