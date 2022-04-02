import React from 'react';
import axios from 'axios';

function JoinBlock({ onLogin }) {
  const [roomID, setRoomID] = React.useState('');
  const [userName, setUserName] = React.useState('');
  const [isLoading, setLoading] = React.useState(false);

  const onJoin = async ()=>{
    if (!roomID || !userName){
      return alert('incorrect input');
    }
    const obj = {
      roomID,
      userName,
    };
    setLoading(true);
    await axios.post('/rooms', obj);
    onLogin(obj);
  }

  return (
    <div className="join-block">
      <input type="text" placeholder="Room ID" value={roomID} onChange={e => setRoomID(e.target.value)}/>
      <input type="text" placeholder="Your Name" value={userName} onChange={e => setUserName(e.target.value)}/>
      <button disabled={isLoading} onClick={onJoin} className="btn btn-success">{isLoading ? 'JOINING' : 'JOIN'}</button>
    </div>
    );
  }
  
  export default JoinBlock;