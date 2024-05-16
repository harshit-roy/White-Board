import WhiteBoard from '../../components/WhiteBoard';
import './index.css';
import {useState, useRef, useEffect} from 'react';

import {ToastContainer, toast} from 'react-toastify';
const RoomPage = ({user, socket, users}) => {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);

  const [tool, setTool] = useState('pencil');
  const [color, setColor] = useState('#000000');
  const [elements, setElements] = useState([]);
  const [history, setHistory] = useState([]);
  const [openUserTab, setOpenUserTab] = useState(false);

  const handleClearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.fillRect = 'white';
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    setElements([]);
  };

  const undo = () => {
    setHistory(prevHistory => [...prevHistory, elements[elements.length - 1]]);

    setElements(prevElements => prevElements.slice(0, prevElements.length - 1));
  };

  const redo = () => {
    setElements(prevElements => [...prevElements, history[history.length - 1]]);
    setHistory(prevHistory => prevHistory.slice(0, prevHistory.length - 1));
  };

  return (
    <div className="row ">
      <button
        type="button"
        className="btn btn-light"
        style={{
          display: 'block',
          position: 'absolute',
          top: '5%',
          left: '1%',
          height: '40px',
          width: '100px',
        }}
        onClick={() => setOpenUserTab(true)}>
        Users
      </button>
      {openUserTab && (
        <div
          className="position-fixed top-0 h-100 text-white bg-dark"
          style={{width: '260px', left: '0%'}}>
          <button
            type="button"
            onClick={() => setOpenUserTab(false)}
            className="btn btn-light btn-block w-100 mt-5">
            Close
          </button>
          <div className="bg-black h-75 border rounded mt-5 border-0 py-3">
            <h5 className="text-center mt-5 text-primary">Active Users</h5>
            <div className="w-100 mt-3">
              {users.map((usr, index) => (
                <p key={index * 999} className="my-2 px-5 w-100">
                  {index + 1}. {usr.name}
                  {user && user.userId === usr.userId && ' (You)'}
                </p>
              ))}
            </div>
          </div>
        </div>
      )}
      <h1 className="text-center py-5 text-white">
        White Board Collaborator
        <span className="text-primary"> [User Online : {users.length}]</span>
      </h1>
      {user?.presenter && (
        <div className="col-md-12 mx-auto d-flex align-items-center justify-content-around text-white">
          <div className="d-flex col-md-4 justify-content-around gap-2">
            <div className="d-flex gap-1">
              <label htmlFor="pencil">Pencil</label>
              <input
                type="radio"
                name="tool"
                id="pencil"
                value="pencil"
                className="mt-1"
                checked={tool === 'pencil'}
                onChange={e => setTool(e.target.value)}
              />
            </div>
            {/* <div className="d-flex gap-1">
              <label htmlFor="line">Line</label>
              <input
                type="radio"
                name="tool"
                id="line"
                value="line"
                className="mt-1"
                checked={tool === 'line'}
                onChange={e => setTool(e.target.value)}
              />
            </div> */}
            <div className="d-flex gap-1">
              <label htmlFor="rect">Rectangle</label>
              <input
                type="radio"
                name="tool"
                id="rect"
                value="rect"
                checked={tool === 'rect'}
                className="mt-1"
                onChange={e => setTool(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-4 mx-2 px-5">
            <div className="d-flex gap-2 align-items-center">
              <label htmlFor="color">Select Color:</label>
              <input
                type="color"
                id="color"
                className="mt-1 "
                value={color}
                onChange={e => setColor(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-2 d-flex gap-1 ">
            <button
              className="btn btn-primary mt-1"
              disabled={elements.length === 0}
              onClick={() => undo()}>
              Undo
            </button>
            <button
              className="btn btn-primary mt-1"
              disabled={history.length < 1}
              onClick={() => redo()}>
              Redo
            </button>
          </div>
          <div className="col-md-2 m-2">
            <button className="btn btn-danger" onClick={handleClearCanvas}>
              Clear Canvas
            </button>
          </div>
        </div>
      )}

      <div className="col-md-12 mx-auto my-5 mt-4 canvas-box ">
        <WhiteBoard
          canvasRef={canvasRef}
          ctxRef={ctxRef}
          elements={elements}
          setElements={setElements}
          color={color}
          tool={tool}
          user={user}
          socket={socket}
        />
      </div>
    </div>
  );
};

export default RoomPage;
