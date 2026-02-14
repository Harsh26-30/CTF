import React from 'react'
import { useState } from 'react'
import './Authenticationpage.css'
import Loginsignupnav from './loginsignupnav'
import Loginpage from './loginpage'
import SignUp from './SignUp'

const Authenticationpage = ({ setauth, setshm }) => {
    const [showloginpages, setshowloginpage] = useState(true)
    const [showsignup, setshowsignup] = useState(false)

    function handleclick(val) {
        setshowloginpage(val.showloginpages);
        setshowsignup(val.showsignup);
    }

    const getdata = ({ auth, shm }) => {
        setauth(auth)
        setshm(shm)
    }


    return (
        <div id='Authenticationpagebox'>
            <div id='Authenticationpagebox2'>
                <div id='header'>
                    <h1>CHAT TO FRIEND</h1>
                    <Loginsignupnav sendToParent={handleclick} />
                </div>
                {showloginpages && <Loginpage sendDataS={getdata}/>}
                {showsignup && <SignUp sendDataS={getdata} />}
            </div>
        </div>
    )
}

export default Authenticationpage