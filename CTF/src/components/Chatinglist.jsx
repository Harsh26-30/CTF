import React, { useState, useEffect } from 'react';
import './Chatinglist.css';
import axios from 'axios';
import { socket } from "../socket";


const Chatinglist = ({ onclickli }) => {
  const [friends, setFriends] = useState([]);
  const [havemsg, sethavemsg] = useState();
  const [fromuserID, setfromuserID] = useState();
  const [curentchat, setcurentchat] = useState();



  const baseURL = "https://ctf-3ztj.onrender.com";

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
    // try {
    //   const res = await axios.post(
    //     `${baseURL}/wanttochat`,
    //     { friendID },
    //     { withCredentials: true }
    //   );

    //   console.log("Chat selected:", res.data);
    // } catch (err) {
    //   console.error("Error selecting friend to chat:", err.response?.data || err.message);
    // }
    setcurentchat(friendID)
    onclickli(friendID)
    sethavemsg("")
    setfromuserID(false)
  };



  const handleReceive = (data) => {
    // console.log("Message received:", data);
    // setMessages(prev => [...prev, { from: data.fromUserID, text: data.message }]);

    if (data) {
      if (data.friendID === curentchat) {
        sethavemsg("")
        setfromuserID(false)
      } else {
        sethavemsg("msg")
        setfromuserID(data.fromUserID)
      }
    }
  };


  socket.on("receiveMessage", handleReceive);

  return (
    <div id='Chatinglistbox'>
      <ul>
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
