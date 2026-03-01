import React, { useRef,useEffect, useState } from 'react';
import { socket } from "../socket";
import axios from "axios"
import './messages.css'
const API = import.meta.env.VITE_API_URL;

const Messages = ({ userID, chatto, sendmsg, onclick }) => {
  const [messages, setMessages] = useState([]);
  const [chattinguser, setChattingUser] = useState("");
  const [listval, setlistval] = useState();

  const msgboxRef = useRef(null);

  // Register + receive
  useEffect(() => {
    if (userID) {
      socket.emit("registerUser", userID);
      console.log("Registered user:", userID);
    }

    const handleReceive = (data) => {
      setMessages(prev => [
        ...prev,
        {
          from: data.fromUserID,
          to: data.toUserID,
          text: data.message
        }
      ]);
    };

    socket.on("receiveMessage", handleReceive);

    return () => {
      socket.off("receiveMessage", handleReceive);
    };
  }, [userID]);

  // 👇 Jab sendmsg aaye, usko bhi add karo
  useEffect(() => {
    if (sendmsg && chatto) {
      setMessages(prev => [
        ...prev,
        {
          from: userID,
          to: chatto,
          text: sendmsg
        }
      ]);
    }
  }, [sendmsg]);

  // Update chatting user
  useEffect(() => {
    setChattingUser(chatto);
  }, [chatto]);

  useEffect(() => {
  if (msgboxRef.current) {
    msgboxRef.current.scrollTop = msgboxRef.current.scrollHeight;
  }
}, [messages]);



  return (
    <div id='msgbox' ref={msgboxRef}>
      {messages
        .filter(msg => chattinguser && (
          (msg.from === userID && msg.to === chattinguser) ||
          (msg.from === chattinguser && msg.to === userID)
        ))
        .map((msg, index) => (
          <div id='messagebox'
            key={index}
            style={{
              textAlign: msg.from === userID ? "right" : "left",
              margin: "5px"
            }}
          >
            <p>{msg.text}</p>
            {/* <b>{msg.from === userID ? "You" : msg.from}:</b> {msg.text} */}
          </div>
        ))
      }
    </div>
  );
};

export default Messages;