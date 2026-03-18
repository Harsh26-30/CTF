import React from 'react'
import './ChatingSpace.css'
import CSHeader from './CSHeader'
import Typemsg from './Typemsg'
import Messages from './messages'
import { useState } from 'react'
import { on } from 'ws'

const ChatingSpace = ({chattoprof, chatto,setauth, setshm, userID,slh }) => {
  const[sendmsg,setsendmsg]=useState()
  const[issendimg,setissendimg]=useState()
  
  return (
    <div id='ChatingSpacebox'>
      <CSHeader slh={slh} userID={userID} chattoprof={chattoprof} chatto={chatto} setshm={setshm} setauth={setauth} />
      <Messages userID={userID}  sendmsg={sendmsg} chatto={chatto}/>
      <Typemsg setissendimg={setissendimg} onSend={setsendmsg} chatto={chatto} />
    </div>
  )
}

export default ChatingSpace