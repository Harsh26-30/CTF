import React from 'react'
import './Main.css'
import Chatinglist from './Chatinglist'
import ChatingSpace from './ChatingSpace'
import { useState } from 'react'

const Main = ({ setshm, setauth }) => {
  cont[chatto ,setchatto]=useState("")
  return (
    <div id='Mainbox'>
      <Chatinglist onclickli={setchatto}/>
      <ChatingSpace chatto={chatto}  setauth={setauth} setshm={setshm} />
    </div>
  )
}

export default Main