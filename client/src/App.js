import './App.css';
import Headers from './components/ServerBar/header';
import Sidebar from './components/DMSAndChannels/Sidebar';
import ChatArea from './components/ChatArea/ChatArea';
import { Route, Routes, Navigate } from 'react-router-dom';
import React, { useEffect, useState} from 'react';
import Login from './components/Login/Login';
import useToken from './components/useToken';

function App() {
  const { token, setToken } = useToken();
  const TokenContext = React.createContext("NULL");

  if (!token) {
    return (
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} ></Route>
        <Route path="/login" element={<Login setToken={setToken} />} />
      </Routes>
    )
  }

  return (
    <TokenContext.Provider value={token} >
      <div className="App">
        <Headers />
        <Sidebar />
        <ChatArea />
      </div>
    </TokenContext.Provider>
  );
}

export default App;
