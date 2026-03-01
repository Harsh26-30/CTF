import React, { useState, useEffect } from 'react';
import './Chatinglist.css';
import axios from 'axios';
import { socket } from "../socket";
const API = import.meta.env.VITE_API_URL;

const Chatinglist = ({ onclickli, onclickli2 }) => {
  const [friends, setFriends] = useState([]);
  const [curentchat, setCurentchat] = useState();
  const [onclickforchat, setonclickforchat] = useState(false);
  const [unread, setUnread] = useState({});

  const baseURL = `${API}`;

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const res = await axios.get(`${baseURL}/myfriends`, { withCredentials: true });
        console.log("Friend API response:", res.data);
        setFriends(res.data.friends || []);
      } catch (err) {
        console.error(err);
      }

    };

    setInterval(() => {
      fetchFriends();
    }, 5000);


  }, []);

  useEffect(() => {
    const handleReceive = (data) => {
      if (data) {
        setUnread(prev => ({ ...prev, [data.fromUserID]: true }));
      }
    };
    socket.on("receiveMessage", handleReceive);
    return () => socket.off("receiveMessage", handleReceive);
  }, []);

  const hc = (friendID) => {
    setCurentchat(friendID.userid);
    onclickli(friendID.userid);
    onclickli2(friendID.profileImage);
    setUnread(prev => ({ ...prev, [friendID.userid]: false }));
    setonclickforchat(true);
  };

  const ha = () => {
    setonclickforchat(false);
  };

  return (
    <div
      style={{
        left: onclickforchat ? "-248px" : "0",
        backgroundColor: onclickforchat ? "noColor" : "#163832",
        height: onclickforchat ? "0" : "86%"
      }}
      id='Chatinglistbox'
    >
      <ul>
        {friends.length === 0 && <li>No friends yet</li>}
        {friends.map((friend) => (
          <li
            key={friend._id}
            style={{ backgroundColor: unread[friend.userid] ? "#027b65" : "#014d3f" }}
            onClick={() => hc(friend)}
          >
            <div id='imgboxlist'>
              <img
                id="profileimg"
                src={friend.profileImage || "/default.jpg"}
                alt="friendimg"
              />
            </div>
            <span>{friend.username}</span>
            {unread[friend.userid] && <p>New</p>}
          </li>
        ))}
      </ul>
      {onclickforchat && (
        <button onClick={ha}>
          <img src="\arrow_back_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.png" alt="<--" />
        </button>
      )}
    </div>
  );
};

export default Chatinglist;