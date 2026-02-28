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
  const [onclickforchat, setonclickforchat] = useState();

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
    const interval = setInterval(() => {
      fetchFriends();
    }, 5000); // har 5 sec me refresh

    return () => clearInterval(interval);
  }, []);

  const hc = async (friendID) => {
    setcurentchat(friendID)
    onclickli(friendID)
    sethavemsg("")
    setfromuserID(false)
    setonclickforchat(true)
  };
  const ha = async (friendID) => {
    setonclickforchat(false)
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
    <div style={{ left: onclickforchat ? "-248px" : "0", backgroundColor: onclickforchat ? "noColor" : "#163832", height: onclickforchat ? "0" : "86%" }} id='Chatinglistbox'>
      <ul>
        {friends.length === 0 && <li>No friends yet</li>}
        {friends.map((friend, index) => (
          <li style={{ backgroundColor: fromuserID === friend ? "#027b65" : "#014d3f" }} key={friend} onClick={() => hc(friend)}>
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
      {onclickforchat && <button onClick={ha}><img src="\arrow_back_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.png" alt="<--" /></button>}
    </div>
    // {onclickforchat && <button>ad</button>}
  );
};

export default Chatinglist;
