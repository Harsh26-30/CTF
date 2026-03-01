import React, { useState } from 'react'
import './Main.css'
import Chatinglist from './Chatinglist'
import ChatingSpace from './ChatingSpace'
import Profile from './Profile'
import ProfImgUpload from './profimgupload'

const Main = ({ setshm, setauth, profile,setprofile }) => {

  const [chatto, setchatto] = useState("")
  const [chattoprof, setchattoprof] = useState("")

  const [upoadimg, setupoadimg] = useState("")


  return (
    <div id='Mainbox'>
      <Chatinglist
        onclickli={setchatto} onclickli2={setchattoprof}
      />
      {profile && <Profile setprofile={setprofile} setupoadimg={setupoadimg} />}
      {upoadimg && <ProfImgUpload setupoadimg={setupoadimg} />}
      <ChatingSpace
      chattoprof={chattoprof}
        chatto={chatto}
        setauth={setauth}
        setshm={setshm}
      />


    </div>
  )
}

export default Main