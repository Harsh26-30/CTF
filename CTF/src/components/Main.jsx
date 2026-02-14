import React from 'react'
import './Main.css'
import Chatinglist from './Chatinglist'
import ChatingSpace from './ChatingSpace'

const Main = ({ setshm, setauth }) => {
  return (
    <div id='Mainbox'>
      <Chatinglist />
      <ChatingSpace setauth={setauth} setshm={setshm} />
    </div>
  )
}

export default Main