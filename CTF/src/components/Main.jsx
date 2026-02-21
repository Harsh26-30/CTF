import React from 'react'
import './Main.css'
import Chatinglist from './Chatinglist'
import ChatingSpace from './ChatingSpace'
import { useState } from 'react'

const Main = ({ setshm, setauth }) => {
  const[chatto ,setchatto]=useState("")
  const[arrowval ,setarrowval]=useState("")

  return (
    <div id='Mainbox'>
      <Chatinglist arrowval={arrowval} onclickli={setchatto}/>
      <ChatingSpace chatto={chatto} onclickar={setarrowval}  setauth={setauth} setshm={setshm} />
    </div>
  )
}

export default Main