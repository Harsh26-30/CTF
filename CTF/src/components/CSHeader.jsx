import React, { useState, useEffect } from 'react'
import './CSHeader.css'
import axios from 'axios'
const API = import.meta.env.VITE_API_URL;

const CSHeader = ({ chattoprof, chatto, setauth, setshm }) => {
    const [userstatus, setuserStatus] = useState();

    useEffect(() => {
        const fetchFriends = async () => {
            try {
                const res = await axios.get(`${API}/userstatus`, { chatto }, { withCredentials: true });
                setuserStatus(res.data.userstatusis)

            } catch (err) {
                console.error(err);
            }

        };

    }, [chatto]);

    return (
        <div id='CSHeaderbox'>
            <div id="profname">
                <div id='imgbox'>
                    <img src={chattoprof ? chattoprof : "/pexels-caleb-lamb-597215774-35911819.jpg"} alt="" />
                </div>
                <div id='userinfo'>
                    <h2>{chatto}</h2>
                    <p>{userstatus}</p>
                </div>
            </div>
        </div>
    )
}

export default CSHeader