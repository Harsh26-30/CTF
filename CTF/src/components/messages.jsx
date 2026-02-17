import React, { useEffect, useState } from 'react';
import { socket } from "../socket";

const Messages = ({ userID }) => {

  const [messages, setMessages] = useState([]);

  useEffect(() => {

    // Register user when component mounts
    if (userID) {
      socket.emit("registerUser", userID);
      console.log("Registered user:", userID);
    }

    socket.on("receiveMessage", (data) => {
      console.log("Message received in Messages component:", data);

      setMessages(prev => [
        ...prev,
        { from: data.fromUserID, text: data.message }
      ]);
    });

    return () => {
      socket.off("receiveMessage");
    };

  }, [userID]);

  return (
    <div>
      <h2>Messages</h2>

      {messages.map((msg, index) => (
        <div key={index}>
          <b>{msg.from}:</b> {msg.text}
        </div>
      ))}

    </div>
  );
};

export default Messages;
