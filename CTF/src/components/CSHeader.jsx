import React, { useEffect } from 'react'
import './CSHeader.css'
import { useState } from 'react'
import axios from 'axios'
const API = import.meta.env.VITE_API_URL;

const CSHeader = ({ chatto, setauth, setshm }) => {
    return (
        <div id='CSHeaderbox'>
            <div id="profname">
                <img src="/pexels-caleb-lamb-597215774-35911819.jpg" alt="" />
                <h2>{chatto}</h2>
            </div>
        </div>
    )
}

export default CSHeader