import React, { useState } from 'react'
import './settinglist.css'
import axios from 'axios'
const API = import.meta.env.VITE_API_URL;

const settinglist = ({ sethide,chatto,userID }) => {
    const hc = async () => {
        sethide(false)
    }

    const rf = async (e) => {
        e.preventDefault();
        const res = await axios.post(`${API}/removefriend`, {
            userid: chatto
        }, {
            withCredentials: true   // <--- ye must hai
        }
        );
    }

    const cc = async (e) => {
        // e.preventDefault();
        const res = await axios.delete(`${API}/clearchat`, {
            user1: chatto,user2:userID
        }, {
            withCredentials: true   // <--- ye must hai
        }
        );
    }
    return (

        <div onDoubleClick={hc} id='settinglistbox'>
            <div className='settinglist'>
                <ul>
                    <li onClick={cc}>Clear Chat</li>
                    <li onClick={rf}>Remove Friend</li>
                </ul>
            </div>
        </div>
    )
}

export default settinglist