import React from 'react'
import './loginpage.css'
import axios from 'axios'
import { useState } from 'react'

const loginpage = ({ sendDataS }) => {
    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")
     const hs = async (e) => {             //hs-handlesubmit
    e.preventDefault();
    const res = await axios.post("https://your-netlify-site.netlify.app/login", {
      email: email,
      pass: pass
    });
    sendDataS(res.data)
  }
  return (
    <div id='loginpagebox'>
      <center><h2>Login</h2></center>
        <form onSubmit={hs}>
            <input type="text" name='email' placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
            <input type="text" name='pass' placeholder='Pass' onChange={(e) => setPass(e.target.value)}/>
            <button type='submit'>Login</button>
        </form>
    </div>
  )
}

export default loginpage