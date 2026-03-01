import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './Profile.css'
const API = import.meta.env.VITE_API_URL;



const Profile = ({ setupoadimg,setprofile }) => {
    const [username, setusername] = useState("")
    const [userid, setuserid] = useState("")
    const [useremail, setuseremail] = useState("")
    const [userprofimg, setuserprofimg] = useState("")
    useEffect(() => {
        async function userdata() {
            const resuserdata = await axios.get(`${API}/userdata`, { withCredentials: true });
            setusername(resuserdata.data.username);
            setuserid(resuserdata.data.userid);
            setuseremail(resuserdata.data.useremail);
            setuserprofimg(resuserdata.data.profileImage);   // 👈 ADD THIS
        }
        userdata();
    }, [])
    const handleblurusername = async (e) => {
        const res = await axios.post(`${API}/changeusername`, { username }, { withCredentials: true });
    }
    const handlebluruserid = async (e) => {
        const res = await axios.post(`${API}/changeuserid`, { userid }, { withCredentials: true });
    }
    const handlebluruseremail = async (e) => {
        const res = await axios.post(`${API}/changeuseremail`, { useremail }, { withCredentials: true });
    }

    const handleclickprofile = (e) => {
        e.preventDefault();
        setupoadimg(prev => !prev);
    };

    const handleclickprofilebk = (e) => {
    e.preventDefault();
    setprofile(prev => !prev);
  };

    return (
        <div id='box1' onDoubleClick={handleclickprofilebk}>
            <div id='profilebox' >
                <div className='userimg' onClick={handleclickprofile}>
                    {/* <img src="\pexels-caleb-lamb-597215774-35911819.jpg" alt="userdata" /> */}
                    <img
                        src={userprofimg || "/pexels-caleb-lamb-597215774-35911819.jpg"}
                        alt="userdata"
                    />
                </div>
                <div className='userinfo'>
                    <input type="text" value={username} name='username' onBlur={handleblurusername} onChange={(e) => setusername(e.target.value)} />
                </div>
                <div className='userinfo'>
                    <input type="text" value={userid} name='userid' onBlur={handlebluruserid} onChange={(e) => setuserid(e.target.value)} />
                </div>
                <div className='userinfo'>
                    <input type="text" value={useremail} name='email' onBlur={handlebluruseremail} onChange={(e) => setuseremail(e.target.value)} />
                </div>
            </div>
        </div>

    )
}

export default Profile