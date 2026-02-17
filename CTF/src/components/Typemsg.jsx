import React, { useState, useEffect } from "react";
import './Typemsg.css';
import axios from "axios";
import { socket } from "../socket";



const Typemsg = () => {

  const [usertypemsg, setusertypemsg] = useState("")
  const [fromUserID, setfromUserID] = useState("")
  const [toUserID, settoUserID] = useState("")
  const [messages, setMessages] = useState([]);


  useEffect(() => {
    // Connected to server
    socket.on("connect", () => {
      console.log("Connected to server! socket.id:", socket.id);
    });

    // Send test message
    // socket.emit("testMessage", { msg: "Hello server!" });

    // Listen for server reply
    socket.on("replyMessage", (data) => {
      console.log("Server replied:", data.msg);
    });

    const register = async () => {
      const res = await axios.get(
        "https://ctf-3ztj.onrender.com/userid",
        { withCredentials: true }
      );
      setfromUserID(res.data.userid)
      socket.emit("registerUser", res.data.userid);
      console.log(res.data.userid);
    };
    register();

    socket.on("receiveMessage", ({ fromUserID, message }) => {
      setMessages(prev => [...prev, { from: fromUserID, text: message }]);
    });

    // Cleanup on component unmount
    return () => {
      socket.off("connect");
      socket.off("replyMessage");
    };
  }, []); // empty dependency → run once

  const sendto = async () => {
    const res = await axios.get("https://ctf-3ztj.onrender.com/chatto", {
      withCredentials: true
    });
    console.log("jis ko msg bhejna hai", res.data.chatto);
    settoUserID(res.data.chatto)
  }
  sendto();

  const hs = (e) => {
    e.preventDefault();
    if (usertypemsg.trim() === "") return;

    socket.emit("sendMessageToUser", {
      toUserID,
      fromUserID,
      message: usertypemsg
    });
    setusertypemsg("");
  };


  return (
    <div id='Typemsgbox'>
      <div id="chatWindow">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={msg.from === fromUserID ? "myMessage" : "friendMessage"}
          >
            <b>{msg.from}:</b> {msg.text}
          </div>
        ))}
      </div>
      <form onSubmit={hs}>
        <input type="text" onChange={(e) => setusertypemsg(e.target.value)} />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Typemsg;
