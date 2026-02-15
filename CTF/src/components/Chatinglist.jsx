import React, { useState, useEffect } from 'react';
import './Chatinglist.css';
import axios from 'axios';

const Chatinglist = () => {
  const [friends, setFriends] = useState([]);

  const fetchFriends = async () => {
    try {
      const res = await axios.get("https://your-netlify-site.netlify.app/myfriends", {
        withCredentials: true
      });
      setFriends(res.data.friends);
    } catch (err) {
      console.error("Error fetching friends:", err);
    }
  };

  useEffect(() => {
    fetchFriends(); // ✅ Only run once on mount
  }, []);

  const hc = async (friendID) => {
    try {
      await axios.post("https://your-netlify-site.netlify.app/wanttochat", { friendID }, {
        withCredentials: true
      });
    } catch (err) {
      console.error("Error selecting friend to chat:", err);
    }
  }

  return (
    <div id='Chatinglistbox'>
      <ul>
        {friends.length === 0 && <li>No friends yet</li>}
        {friends.map((friend, index) => (
          <li key={index} onClick={() => hc(friend)}>
            <img id='profileimg' src="/pexels-caleb-lamb-597215774-35911819.jpg" alt="friendimg" />
            <span>{friend}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Chatinglist;
