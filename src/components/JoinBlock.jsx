import React from 'react';
import module from "../socket";

function JoinBlock() {
    return (
        <div className="join-block">
            <input type="text" placeholder="Room ID" value=""/>
            <input type="text" placeholder="Your Name" value=""/>
            <button className="btn btn-success">JOIN</button>
      </div>
    );
  }
  
  export default JoinBlock;