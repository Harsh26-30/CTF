import React from 'react'
import './More.css'

function More({onClick}) {
  return (
    <div onClick={onClick} id='Morebox'>
      <img src="\menu_24dp_D9D9D9_FILL0_wght400_GRAD0_opsz24.png" alt="More" />
    </div>
  )
}

export default More