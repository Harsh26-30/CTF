import React, { useState, useEffect } from "react";
import './Typemsg.css';
import { io } from "socket.io-client";

export const socket = io("http://localhost:5000", {
  withCredentials: true
});

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
    socket.emit("testMessage", { msg: "Hello server!" });

    // Listen for server reply
    socket.on("replyMessage", (data) => {
      console.log("Server replied:", data.msg);
    });

    const register = async () => {
      const res = await axios.get("http://localhost:5000/userid");
      setfromUserID(res.data.userid)
      socket.emit("registerUser", res.data.userid);
    };
    register();

    const sendto = async () => {
      const res = await axios.get("http://localhost:5000/chatto", {
        withCredentials: true
      });
      settoUserID(res.data.chatto)
    }

    sendto();

    socket.on("receiveMessage", ({ fromUserID, message }) => {
      setMessages(prev => [...prev, { from: fromUserID, text: message }]);
    });

    // Cleanup on component unmount
    return () => {
      socket.off("connect");
      socket.off("replyMessage");
    };
  }, []); // empty dependency → run once

  const hs = async (e) => {
    e.preventDefault(); // Page reload rokne ke liye
    if (usertypemsg.trim() === "") return; // Empty message ignore
    socket.emit("testMessage", { msg: usertypemsg });
    socket.emit("sendMessageToUser", {
      toUserID: toUserID, // message kisko bhejna hai
      fromUserID: fromUserID, // message kisne bheja
      message: usertypemsg // message ka text
    });
    // Test message (can later be your actual chat)
    setusertypemsg(""); // Clear the input
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
        <button>Send</button>
      </form>
    </div>
  );
};

export default Typemsg;
