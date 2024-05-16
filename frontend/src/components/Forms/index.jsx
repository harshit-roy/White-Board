import CreateRoomForm from './CreateRoomForm';
import JoinRoomForm from './JoinRoomForm';
import './index.css';
const Forms = ({uuid, socket, setUser}) => {
  return (
    <>
      <div className="row h-100 pt-5 ">
        <div className="form-container col-md-4 mt-5 p-5 form-box border border-2 border-primary rounded-2 mx-auto d-flex align-items-center flex-column ">
          <h1 className="text-primary fw-bold">Create Room</h1>
          <CreateRoomForm uuid={uuid} socket={socket} setUser={setUser} />
        </div>
        <div className="form-container col-md-4 mt-5 p-5 form-box border border-2 border-primary rounded-2 mx-auto d-flex align-items-center flex-column ">
          <h1 className="text-primary fw-bold">Join Room</h1>
          <JoinRoomForm uuid={uuid} socket={socket} setUser={setUser} />
        </div>
      </div>
      <div>
        <p className="text-white text-center mt-5 ">
          NOTE: This website is designed for desktop use only.
        </p>
      </div>
    </>
  );
};
export default Forms;
