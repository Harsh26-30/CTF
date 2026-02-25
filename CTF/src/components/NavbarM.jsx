import React from 'react'
import './NavbarM.css'
import axios from 'axios'
const API = import.meta.env.VITE_API_URL;


const NavbarM = ({ setauth, setshm, setprofile }) => {
  const hs = async (e) => {
    e.preventDefault();
    const res = await axios.get(`${API}/logout`, {
      withCredentials: true
    }); setauth(res.data.auth);
    setshm(res.data.shm);
    console.log("click working");
    console.log(res.data);

  }

  const handleclickprofile = async (e) => {
    e.preventDefault();
    setprofile(true);
  }

  return (

    <div id='NavbarMbox'>
      <ul>
        <li onClick={handleclickprofile}>Profile</li>
        <li><button onClick={hs}>Logout</button></li>
      </ul>
    </div>
  )
}

export default NavbarM