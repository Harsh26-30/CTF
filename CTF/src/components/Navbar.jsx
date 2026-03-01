import React from 'react'
import './Navbar.css'
import axios from 'axios'
const API = import.meta.env.VITE_API_URL;


const Navbar = ({ setauth, setshm, setprofile }) => {
  const hs = async (e) => {
    e.preventDefault();
    const res = await axios.get(`${API}/logout`, {
      withCredentials: true
    }); setauth(res.data.auth);
    setshm(res.data.shm);
    console.log("click working");
    console.log(res.data);
  }
const handleclickprofile = (e) => {
  e.preventDefault();
  setprofile(prev => !prev);
};
  
  return (
    <div id='Navbarbox'>
      <ul>
        <li onClick={handleclickprofile}>Profile</li>
        <li id='logout'> 
          <button onClick={hs}>Logout</button>
        </li>
      </ul>
    </div>
  )
}

export default Navbar