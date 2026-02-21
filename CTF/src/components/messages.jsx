import React, { useEffect, useState } from 'react';
import { socket } from "../socket";

const Messages = ({ userID, chatto }) => {
  const [messages, setMessages] = useState([]);

  // Register user + receive message
  useEffect(() => {
    if (userID) {
      socket.emit("registerUser", userID);
      console.log("Registered user:", userID);
    }

    const handleReceive = (data) => {
      console.log("Message received:", data);

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

  return (
    <div>
      <h2>Messages</h2>

      {messages
        .filter(msg =>
          (msg.from === userID && msg.to === chatto) ||
          (msg.from === chatto && msg.to === userID)
        )
        .map((msg, index) => (
          <div key={index} style={{
            textAlign: msg.from === userID ? "right" : "left",
            margin: "5px"
          }}>
            <b>{msg.from === userID ? "You" : msg.from}:</b> {msg.text}
          </div>
        ))
      }
    </div>
  );
};

export default Messages;