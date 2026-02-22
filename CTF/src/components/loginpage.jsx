import React from 'react'
import './loginpage.css'
import axios from 'axios'
import { useState } from 'react'
const API = import.meta.env.VITE_API_URL;

const loginpage = ({ sendDataS }) => {
  const [email, setEmail] = useState("")
  const [pass, setPass] = useState("")
  const hs = async (e) => {             //hs-handlesubmit
    e.preventDefault();
    const res = await axios.post(`${API}/login`, { email, pass }, { withCredentials: true });
    sendDataS(res.data)
  }
  return (
    <div id='loginpagebox'>
      <h2>Login</h2>
      <form onSubmit={hs}>
        <input type="text" name='email' placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
        <input type="password" name='pass' placeholder='Pass' onChange={(e) => setPass(e.target.value)} />
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}

export default loginpage