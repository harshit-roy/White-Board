import WhiteBoard from '../../components/WhiteBoard';
import './index.css';
import {useState, useRef} from 'react';

const RoomPage = () => {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);

  const [tool, setTool] = useState('pencil');
  const [color, setColor] = useState('#000000');
  const [elements, setElements] = useState([]);
  const [history, setHistory] = useState([]);

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
      <h1 className="text-center py-5">
        White Board Sharing App
        <span className="text-primary">[User Online : 0]</span>
      </h1>
      <div
        className="col-md-12 mx-auto 
          d-flex align-items-center justify-content-around">
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
          <div className="d-flex gap-1">
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
          </div>
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
        <div className="col-md-4 mx-4 px-5">
          <div className="d-flex gap-2 align-items-center">
            <label htmlFor="color">Select Color:</label>
            <input
              type="color"
              id="color"
              className="mt-1 w-50"
              value={color}
              onChange={e => setColor(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-2 d-flex gap-3 ">
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
        <div className="col-md-2">
          <button className="btn btn-danger" onClick={handleClearCanvas}>
            Clear Canvas
          </button>
        </div>
      </div>
      <div className="col-md-12 mx-auto mt-4 canvas-box">
        <WhiteBoard
          canvasRef={canvasRef}
          ctxRef={ctxRef}
          elements={elements}
          setElements={setElements}
          color={color}
          tool={tool}
        />
      </div>
    </div>
  );
};

export default RoomPage;
