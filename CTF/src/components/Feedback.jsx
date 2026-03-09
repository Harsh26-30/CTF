import React, { useEffect, useState } from 'react'
import './Feedback.css'
import axios from 'axios'
const API = import.meta.env.VITE_API_URL;



const Feedback = ({ setfbh }) => {
    const [feedbackmsg, setfeedbackmsg] = useState()
    const [feedbackuser, setfeedbackuser] = useState()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res1 = await axios.get(`${API}/userdata`, { withCredentials: true });
                 setfeedbackuser(res1.data.userid);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);


    const dc = async () => {
        setfbh(prve => !prve)
    }
    // setfbh(fbh)
    const hs = async (e) => {             //hs-handlesubmit
        e.preventDefault();
        const res = await axios.post(`${API}/feedbackrecord`, { feedbackuser, feedbackmsg }, { withCredentials: true });
        setfeedbackmsg("")
        setfbh(prve => !prve)
    }
    return (
        <div onDoubleClick={dc} id='feedbackbox'>
            <h2>FeedBack</h2>
            <form onSubmit={hs}>
                <textarea name="feedback" id="feedbackinput" onChange={(e) => setfeedbackmsg(e.target.value)}></textarea>
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default Feedback