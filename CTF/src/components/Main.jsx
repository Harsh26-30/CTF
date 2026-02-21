import React, { useState } from 'react'
import './Main.css'
import Chatinglist from './Chatinglist'
import ChatingSpace from './ChatingSpace'

const Main = ({ setshm, setauth }) => {

  const [chatto, setchatto] = useState("")
  const [arrowval, setarrowval] = useState(true)

  // 👇 YE FUNCTION MISSING THA
  const toggleSidebar = () => {
    setarrowval(prev => !prev)
  }

  return (
    <div id='Mainbox'>
      <Chatinglist 
        arrowval={arrowval} 
        onclickli={setchatto}
      />

      <ChatingSpace 
        chatto={chatto} 
        onclickar={toggleSidebar}  
        setauth={setauth} 
        setshm={setshm} 
      />
    </div>
  )
}

export default Main