import React from 'react'
import './Navbar.css'
import axios from 'axios'
const API = import.meta.env.VITE_API_URL;


const Navbar = ({setauth, setshm}) => {
  const hs = async (e) => {
    e.preventDefault();
    const res = await axios.get(`${API}/logout`, {
      withCredentials: true
    }); setauth(res.data.auth);
    setshm(res.data.shm);
    console.log("click working");
    console.log(res.data);
  }
  return (
    <div id='Navbarbox'>
      <ul>
        <li>Profile</li>
        <li>
          <button onClick={hs}>Logout</button>
        </li>
      </ul>
    </div>
  )
}

export default Navbar