import io from 'socket.io-client';

import {useEffect, useState} from 'react';
import './App.css';
import RoomPage from './Pages/RoomPage';
import Forms from './components/Forms';
import {Routes, Route} from 'react-router-dom';

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
    const handleUserIsJoined = data => {
      if (data.success) {
        console.log('User joined successfully');
      } else {
        console.error('Error joining user:', data.error);
      }
    };

    socket.on('userIsJoined', handleUserIsJoined);

    return () => {
      socket.off('userIsJoined', handleUserIsJoined);
    };

    // Error handling
    socket.on('connect_error', error => {
      console.error('Socket connection error:', error);
    });

    socket.on('connect_timeout', timeout => {
      console.error('Socket connection timeout:', timeout);
    });
  }, []);

  const uuid = () => {
    let S4 = () =>
      (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    return S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4();
  };

  return (
    <div className="container">
      <Routes>
        <Route
          path="/"
          element={<Forms uuid={uuid} socket={socket} setUser={setUser} />}
        />
        <Route path="/:roomId" element={<RoomPage />} />
      </Routes>
    </div>
  );
};

export default App;
