import React, { useState, useEffect } from 'react';
import './Chatinglist.css';
import axios from 'axios';
import { socket } from "../socket";
const API = import.meta.env.VITE_API_URL;

const Chatinglist = ({ onclickli }) => {
  const [friends, setFriends] = useState([]);
  const [havemsg, sethavemsg] = useState();
  const [fromuserID, setfromuserID] = useState();
  const [curentchat, setcurentchat] = useState();



  const baseURL = `${API}`;

  const fetchFriends = async () => {
    try {
      const res = await axios.get(`${baseURL}/myfriends`, {
        withCredentials: true
      });

      if (res.data.auth) {
        console.log("User not logged in");
        return;
      }

      setFriends(res.data.friends || []);
    } catch (err) {
      console.error("Error fetching friends:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchFriends();
  }, []);

  const hc = async (friendID) => {
    setcurentchat(friendID)
    onclickli(friendID)
    sethavemsg("")
    setfromuserID(false)
  };

  const handleReceive = (data) => {
    // console.log("Message received:", data);
    // setMessages(prev => [...prev, { from: data.fromUserID, text: data.message }]);
    
    if (data) {
      sethavemsg("msg")
      setfromuserID(data.fromUserID)
    }
  };

  socket.on("receiveMessage", handleReceive);

  return (
    // style={{    width: arrowval ? "48%" : "0%",
// }}
    <div  id='Chatinglistbox'>
      <ul >
        {friends.length === 0 && <li>No friends yet</li>}
        {friends.map((friend, index) => (
          <li key={friend} onClick={() => hc(friend)}>
            <img
              id='profileimg'
              src="/pexels-caleb-lamb-597215774-35911819.jpg"
              alt="friendimg"
            />
            <span>{friend}</span>
            {fromuserID === friend && <p>{havemsg}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Chatinglist;
