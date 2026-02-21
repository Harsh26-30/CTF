import React, { useEffect } from 'react'
import './CSHeader.css'
import { useState } from 'react'
import axios from 'axios'
const API = import.meta.env.VITE_API_URL;

const CSHeader = ({ chatto, setauth, setshm }) => {
    // const [userlogout, setuserlogout] = useState("")
    const hs = async (e) => {
        e.preventDefault();
        const res = await axios.get(`${API}/logout`, {
            withCredentials: true
        }); setauth(res.data.auth);
        setshm(res.data.shm);
        console.log("click working");
        console.log(res.data);

    }


    return (
        <div id='CSHeaderbox'>
            <div id="profname">
                <img src="/pexels-caleb-lamb-597215774-35911819.jpg" alt="" />
                <h2>{chatto}</h2>
            </div>
            <button onClick={hs}>Logout</button>
        </div>
    )
}

export default CSHeader