import React from 'react'
import './ChatingSpace.css'
import CSHeader from './CSHeader'
import Typemsg from './Typemsg'
import Messages from './messages'

const ChatingSpace = ({ chatto,setauth, setshm }) => {
  return (
    <div id='ChatingSpacebox'>
      <CSHeader chatto={chatto} setshm={setshm} setauth={setauth} />
      <Messages chatto={chatto}/>
      <Typemsg chatto={chatto} />
    </div>
  )
}

export default ChatingSpace