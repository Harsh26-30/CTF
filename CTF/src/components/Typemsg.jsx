import React, { useState, useEffect } from "react";
import './Typemsg.css';
import axios from "axios";
import { socket } from "../socket";

const Typemsg = ({ chatto, onSend }) => {

  const [usertypemsg, setusertypemsg] = useState("");
  const [fromUserID, setfromUserID] = useState("");

  useEffect(() => {

    socket.on("connect", () => {
      console.log("Connected:", socket.id);
    });

    const register = async () => {
      const res = await axios.get(
        `${API}/userid`,
        { withCredentials: true }
      );
      setfromUserID(res.data.userid);
      socket.emit("registerUser", res.data.userid);
    };

    register();

    socket.on("receiveMessage", ({ fromUserID, message }) => {
      console.log("Received:", message);
    });

    return () => {
      socket.off("connect");
      socket.off("receiveMessage");
    };

  }, []);

  const hs = (e) => {
    e.preventDefault();

    if (!usertypemsg.trim()) return;

    socket.emit("sendMessageToUser", {
      chatto,
      fromUserID,
      message: usertypemsg
    });

    onSend(usertypemsg);
    setusertypemsg("");
  };

  return (
    <div id='Typemsgbox'>
      <form onSubmit={hs}>
        <input
          type="text"
          value={usertypemsg}
          onChange={(e) => setusertypemsg(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Typemsg;