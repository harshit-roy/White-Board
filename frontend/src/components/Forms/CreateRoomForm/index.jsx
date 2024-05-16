import {useState, useRef} from 'react';
import {useNavigate} from 'react-router-dom';

import {ToastContainer, toast} from 'react-toastify';
const CreateRoomForm = ({uuid, socket, setUser}) => {
  const [roomId, setRoomId] = useState(uuid());
  const [name, setName] = useState('');
  const navigate = useNavigate();
  const inputRef = useRef(null);

  const handleCreateRoom = e => {
    e.preventDefault();

    const roomData = {
      name,
      roomId,
      userId: uuid(),
      host: true,
      presenter: true,
    };
    setUser(roomData);
    navigate(`/${roomId}`);
    console.log(roomData);
    socket.emit('userJoined', roomData);
  };

  const handleCopy = () => {
    const copyText = inputRef.current;

    // Select the text field
    copyText.select();
    copyText.setSelectionRange(0, 99999); // For mobile devices

    // Copy the text inside the text field
    navigator.clipboard
      .writeText(copyText.value)
      .then(() => {
        // Alert the copied text
        toast.success('Copied the Room Id');
      })
      .catch(err => {
        console.error('Failed to copy text: ', err);
      });
  };

  return (
    <form className="form col-md-12 mt-5">
      <div className="form-group">
        <input
          type="text"
          className="form-control my-2"
          placeholder="Enter Your Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </div>
      <div className="form-group">
        <div className="input-group d-flex align-items-center justify-content-center border border-0">
          <input
            type="text"
            value={roomId}
            className="form-control my-2 border border-2"
            disabled
            placeholder="Generate room code"
            ref={inputRef}
          />
          <div className="input-group-append mx-2">
            <button
              className="btn btn-primary btn-sm me-1 gap-3"
              type="button"
              onClick={() => setRoomId(uuid())}>
              Generate
            </button>
            <button
              className="btn btn-outline-danger btn-sm me-2"
              type="button"
              onClick={handleCopy}>
              Copy
            </button>
          </div>
        </div>
      </div>
      <button
        type="submit"
        onClick={handleCreateRoom}
        className="mt-4 btn btn-primary btn-block form-control">
        Generate Room
      </button>
    </form>
  );
};

export default CreateRoomForm;
