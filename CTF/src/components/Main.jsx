import React, { useState } from 'react'
import './Main.css'
import Chatinglist from './Chatinglist'
import ChatingSpace from './ChatingSpace'

const Main = ({ setshm, setauth }) => {

  const [chatto, setchatto] = useState("")

  return (
    <div id='Mainbox'>
      <Chatinglist 
  
        onclickli={setchatto}
      />

      <ChatingSpace 
        chatto={chatto} 
        setauth={setauth} 
        setshm={setshm} 
      />
    </div>
  )
}

export default Main