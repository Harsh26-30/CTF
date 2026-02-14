import React, { useEffect, useState } from 'react';
import { socket } from "../socket";

const Messages = () => {

  const [messages, setMessages] = useState([]);

  useEffect(() => {

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

  }, []);

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
