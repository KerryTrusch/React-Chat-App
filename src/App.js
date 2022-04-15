import logo from './logo.svg';
import './App.css';
import Headers from './components/ServerBar/header';
import Sidebar from './components/DMSAndChannels/Sidebar';
import ChatArea from './components/ChatArea/ChatArea';
function App() {
  return (
    <div className="App">
      <Headers />
      <Sidebar />
      <ChatArea />
    </div>
  );
}

export default App;
