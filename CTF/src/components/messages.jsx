import React, { useRef, useEffect, useState } from 'react';
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
          to: userID,   // receiver is current user
          text: data.message
        }
      ]);
    };

    socket.on("receiveMessage", handleReceive);

    return () => {
      socket.off("receiveMessage", handleReceive);
    };
  }, [userID]);

  // Load old chat messages when chat user changes
  useEffect(() => {
    const loadMessages = async () => {
      if (!userID || !chatto) return;
      try {
        const res = await axios.get(`${API}/messages/${userID}/${chatto}`);
        const oldMessages = res.data.map(msg => ({
          from: msg.from,
          to: msg.to,
          text: msg.message
        }));

        setMessages(oldMessages);
      } catch (err) {
        console.log("Error loading messages", err);
      }
    };

    loadMessages();
  }, [chatto, userID]);

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
          <div className='messagebox'
            key={index}
            style={{
              textAlign: msg.from === userID ? "right" : "left",
              margin: "5px",
            }}
          >
            <p style={{
              backgroundImage: msg.from === userID ? "linear-gradient(to bottom, var(--bg-card), var(--primary))" : "linear-gradient(to bottom,var(--primary), var(--bg-card))"
              // backgroundColor:msg.from === userID? "green":"blue"
            }}>{msg.text}</p>
            {/* <b>{msg.from === userID ? "You" : msg.from}:</b> {msg.text} */}
          </div>
        ))
      }
    </div>
  );
};

export default Messages;