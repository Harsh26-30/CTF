import React, { useEffect, useState } from 'react';
import { socket } from "../socket";

const Messages = ({ userID }) => {

  const [messages, setMessages] = useState([]);
  const [chattinguser, setchattinguser] = useState("");


  useEffect(() => {

    if (userID) {
      socket.emit("registerUser", userID);
      console.log("Registered user:", userID);
    }

    const handleReceive = (data) => {
      console.log("Message received:", data);

      setMessages(prev => [
        ...prev,
        { from: data.fromUserID, text: data.message }
      ]);
    };

    socket.on("receiveMessage", handleReceive);

    return () => {
      socket.off("receiveMessage", handleReceive);
    };

  }, [userID]);
  
    const sendto = async () => {
    const res = await axios.get("https://ctf-3ztj.onrender.com/chatto", {
      withCredentials: true
    });
    setchattinguser(res.data.chatto)
  }
  sendto();

  return (
    <div>
      <h2>Messages</h2>

      {messages.map((msg, index) => (msg.from === chattinguser ?
        (<div key={index}>
          <b>{msg.from}:</b> {msg.text}
        </div>):(<p></p>)
      ))}
    </div>
  );
};

export default Messages;
