import React, { useEffect } from 'react'
import './CSHeader.css'
import { useState } from 'react'
import axios from 'axios'
const API = import.meta.env.VITE_API_URL;

const CSHeader = ({ chattoprof, chatto, setauth, setshm }) => {
    return (
        <div id='CSHeaderbox'>
            <div id="profname">
                <div id='imgbox'>
                    <img src={chattoprof ? chattoprof : "/pexels-caleb-lamb-597215774-35911819.jpg"} alt="" />
                </div>
                <h2>{chatto}</h2>
            </div>
        </div>
    )
}

export default CSHeader