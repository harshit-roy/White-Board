import {useEffect, useState} from 'react';
import './App.css';
import RoomPage from './Pages/RoomPage';
import Forms from './components/Forms';
import {Routes, Route} from 'react-router-dom';
import io from 'socket.io-client';

const server = 'http://localhost:5000';
const connectionOptions = {
  'force new connection': true,
  reconnectionAttempts: 'Infinity',
  timeout: 10000,
  transports: ['websocket'],
};

const socket = io(server, connectionOptions);
const App = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    console.log('App js running');
    socket.on('userIsJoined', data => {
      if (data.success) {
        console.log('userJoined');
      } else {
        console.log('userJoined error');
      }
    });
  }, []);
  const uuid = () => {
    let S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4();
  };
  return (
    <div className="container">
      <Routes>
        <Route
          path="/"
          element={<Forms uuid={uuid} socket={socket} setUser={setUser} />}
        />
        <Route
          path="/:roomId"
          element={<RoomPage user={user} socket={socket} />}
        />
      </Routes>
    </div>
  );
};

export default App;
