import React, { useState } from 'react'
import './SignUp.css'
import axios from "axios";

const SignUp = ({ sendDataS }) => {
  const [username, setuserName] = useState("");
  const [userid, setuserId] = useState("");
  const [email, setEmail] = useState("")
  const [pass, setPass] = useState("")
  const [errormsgforemail, seterrormsgforemail] = useState("")
  const [iserrormsgforemail, setiserrormsgforemail] = useState(false)
  const [errormsgforuserid, seterrormsgforuserid] = useState("")
  const [iserrormsgforuserid, setiserrormsgforuserid] = useState(false)



  const hs = async (e) => {             //hs-handlesubmit
    e.preventDefault();
    const res = await axios.post("http://localhost:5000/signup", {
      username: username,
      userid: userid,
      email: email,
      pass: pass
    });
    // setshm(res.data.shm)
    // setauth(res.data.auth)
    sendDataS(res.data)
    seterrormsgforemail(res.data.errormsgforemail)
    setiserrormsgforemail(res.data.iserrormsgforemail)
    seterrormsgforuserid(res.data.errormsgforuserid)
    setiserrormsgforuserid(res.data.iserrormsgforuserid)
  }

  return (
    <div id='SignUpbox'>
      <center><h2>SignUp</h2></center>
      <form onSubmit={hs}>
        <input type="text" name='username' placeholder='Name' onChange={(e) => setuserName(e.target.value)} />
        <input type="text" name='userid' placeholder='Userid' onChange={(e) => setuserId(e.target.value)} />
        {iserrormsgforuserid && <p>{errormsgforuserid}</p>}
        <input type="text" name='email' placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
        {iserrormsgforemail && <p>{errormsgforemail}</p>}
        <input type="text" name='pass' placeholder='Pass..' onChange={(e) => setPass(e.target.value)} />
        <button type='submit'>SignUp</button>
      </form>
    </div>
  )
}

export default SignUp