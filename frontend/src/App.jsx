import {useEffect, useState} from 'react';
import './App.css';
import RoomPage from './Pages/RoomPage';
import Forms from './components/Forms';
import {Routes, Route} from 'react-router-dom';
import io from 'socket.io-client';

import {ToastContainer, toast} from 'react-toastify';

const server = 'https://white-board-collaborator.onrender.com/';
const connectionOptions = {
  'force new connection': true,
  reconnectionAttempts: 'Infinity',
  timeout: 10000,
  transports: ['websocket'],
};

const socket = io(server, connectionOptions);
const App = () => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    console.log('App js running');
    socket.on('userIsJoined', data => {
      if (data.success) {
        console.log('userJoined');
        setUsers(data.users);
      } else {
        console.log('userJoined error');
      }
    });

    socket.on('allUsers', data => {
      setUsers(data);
    });

    socket.on('userJoinedMessageBroadcasted', data => {
      toast.info(`${data} joined the room`);
    });
  }, []);

  const uuid = () => {
    let S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4();
  };
  return (
    <>
      <div className="error-message">
        <p className="error-text">
          This website is designed for desktop use only.
        </p>
        <img
          className="h-100 w-100"
          src="https://i.pinimg.com/originals/86/03/ec/8603ec58ba347cff6baabc2bcdf09613.gif"
        />
      </div>
      <div className="main">
        <div className="container">
          <ToastContainer />
          <Routes>
            <Route
              path="/"
              element={<Forms uuid={uuid} socket={socket} setUser={setUser} />}
            />
            <Route
              path="/:roomId"
              element={<RoomPage user={user} socket={socket} users={users} />}
            />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default App;
