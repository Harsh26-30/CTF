import React, { useEffect, useState } from 'react';
import { socket } from "../socket";

const Messages = ({ userID, chatto, sendmsg,onclick }) => {
  const [messages, setMessages] = useState([]);
  const [chattinguser, setChattingUser] = useState("");
  const [listval, setlistval] = useState();

    

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

 const ar = () => {
    onclick(false);

};
  return (
    <div>
      <button onClick={ar}>ar</button>
      <h2>Messages</h2>

      {messages
        .filter(msg =>
          (msg.from === userID && msg.to === chattinguser) ||
          (msg.from === chattinguser && msg.to === userID)
        )
        .map((msg, index) => (
          <div
            key={index}
            style={{
              textAlign: msg.from === userID ? "right" : "left",
              margin: "5px"
            }}
          >
            <b>{msg.from === userID ? "You" : msg.from}:</b> {msg.text}
          </div>
        ))
      }
    </div>
  );
};

export default Messages;