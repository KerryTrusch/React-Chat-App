import './App.css';
import Headers from './components/ServerBar/header';
import Sidebar from './components/DMSAndChannels/Sidebar';
import ChatArea from './components/ChatArea/ChatArea';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useEffect, useState, React } from 'react';
import Login from './components/Login/Login';
function App() {
  const [token, setToken] = useState();
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
