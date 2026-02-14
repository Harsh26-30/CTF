import React from 'react'
import './ChatingSpace.css'
import CSHeader from './CSHeader'
import Typemsg from './Typemsg'
import Messages from './messages'

const ChatingSpace = ({ setauth, setshm }) => {
  return (
    <div id='ChatingSpacebox'>
      <CSHeader setshm={setshm} setauth={setauth} />
      <Messages/>
      <Typemsg />
    </div>
  )
}

export default ChatingSpace