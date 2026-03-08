import React from 'react'
import './ChatingSpace.css'
import CSHeader from './CSHeader'
import Typemsg from './Typemsg'
import Messages from './messages'
import { useState } from 'react'
import { on } from 'ws'

const ChatingSpace = ({chattoprof, chatto,setauth, setshm, userID }) => {
  const[sendmsg,setsendmsg]=useState()
  
  return (
    <div id='ChatingSpacebox'>
      <CSHeader userID={userID} chattoprof={chattoprof} chatto={chatto} setshm={setshm} setauth={setauth} />
      <Messages userID={userID}  sendmsg={sendmsg} chatto={chatto}/>
      <Typemsg onSend={setsendmsg} chatto={chatto} />
    </div>
  )
}

export default ChatingSpace