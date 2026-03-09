import React, { useState, useEffect } from 'react'
import './CSHeader.css'
import axios from 'axios'
import Settinglist from './settinglist';
const API = import.meta.env.VITE_API_URL;

const CSHeader = ({ chattoprof, chatto, setauth, setshm,userID,slh }) => {
    const [userstatus, setuserStatus] = useState("Offline");
    const [hide, sethide] = useState()

    useEffect(() => {

        const fetchFriends = async () => {
            try {
                const res = await axios.post(
                    `${API}/userStatus`,
                    { chatto },
                    { withCredentials: true }
                );

                setuserStatus(res.data.userStatus);

            } catch (err) {
                console.error(err);
            }
        };

        fetchFriends();

        // const interval = setInterval(fetchFriends, 5000);

        // return () => clearInterval(interval);

    }, [chatto]);

    const ocsl = async () => {
        sethide(prev => !prev)
    }

    return (
        <div id='CSHeaderbox'>
            <div id="profname">
                <div id='imgbox'>
                    <img src={chattoprof ? chattoprof : "/pexels-caleb-lamb-597215774-35911819.jpg"} alt="" />
                </div>
                <div id='userinfo'>
                    {chatto ? <h2>{chatto}</h2> : "None"}
                    <p style={{ color: userstatus !== "Offline" ? "green" : "red" }}>{userstatus}</p>
                </div>
            </div>
            {slh!==true && <ul>
                <li onClick={ocsl}>
                    <img src="\more_vert_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.png" alt="More" />
                </li>
            </ul>}
            {hide && <Settinglist userID={userID} chatto={chatto} sethide={sethide} />}
        </div>
    )
}

export default CSHeader