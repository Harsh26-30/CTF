import React, { useState, useEffect } from 'react'
import './Main.css'
import Chatinglist from './Chatinglist'
import ChatingSpace from './ChatingSpace'
import Profile from './Profile'
import ProfImgUpload from './profimgupload'
import Feedback from './Feedback'
import axios from "axios"

const API = import.meta.env.VITE_API_URL;

const Main = ({ setshm, setauth, profile, setprofile,slh,setfbh,fbh }) => {

  const [chatto, setchatto] = useState("")
  const [chattoprof, setchattoprof] = useState("")
  const [userID, setUserID] = useState("")
  const [upoadimg, setupoadimg] = useState("")

  useEffect(() => {
   axios.get(`${API}/userid`, { withCredentials: true })
      .then(res => {
        setUserID(res.data.userid);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div id='Mainbox'>
      <Chatinglist
        onclickli={setchatto} onclickli2={setchattoprof}
      />
      {profile && <Profile  setprofile={setprofile} setupoadimg={setupoadimg} />}
      {upoadimg && <ProfImgUpload setupoadimg={setupoadimg} />}
      {fbh && <Feedback setfbh={setfbh}/>}
      <ChatingSpace
      slh={slh}
        userID={userID}
        chattoprof={chattoprof}
        chatto={chatto}
        setauth={setauth}
        setshm={setshm}
      />


    </div>
  )
}

export default Main