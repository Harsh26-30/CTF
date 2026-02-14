import React, { useEffect } from 'react'
import './CSHeader.css'
import { useState } from 'react'
import axios from 'axios'

const CSHeader = ({ setauth, setshm }) => {
    // const [userlogout, setuserlogout] = useState("")
    const [friendname, setfriendname] = useState("none")
    const hs = async (e) => {
        e.preventDefault();
        const res = await axios.get("http://localhost:5000/logout");
        setauth(res.data.auth);
        setshm(res.data.shm);
        console.log("click working");
        console.log(res.data);

    }
useEffect(() => {
    console.log("Header Mounted");

    const datafromserverforheader = async () => {
        console.log("API calling...");
        try {
            const res = await axios.get("http://localhost:5000/chatto", {
                withCredentials: true
            });
            console.log("Response:", res.data);

            setfriendname(res.data.chatto || "");
        } catch (err) {
            console.error("Error fetching chatto:", err);
        }
    };

    datafromserverforheader();

    const interval = setInterval(() => {
        console.log("Interval running...");
        datafromserverforheader();
    }, 1000);

    return () => {
        console.log("Header Unmounted");
        clearInterval(interval);
    };
}, []);



    return (
        <div id='CSHeaderbox'>
            <div id="profname">
                <img src="/pexels-caleb-lamb-597215774-35911819.jpg" alt="" />
                <h2>{friendname}</h2>
            </div>
            <button onClick={hs}>Logout</button>
        </div>
    )
}

export default CSHeader