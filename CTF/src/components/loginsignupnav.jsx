import React from 'react'
import './loginsignupnav.css'

const loginsignupnav = (props) => {
    const handell = async () => {
        props.sendToParent({
            showloginpages: true,
            showsignup: false
        })
    }

    const handels = async () => {
        props.sendToParent({
            showloginpages: false,
            showsignup: true
        })
    }

    return (
        <div id='loginsignupnavbox'>
            <h2 onClick={handell} >Login</h2>
            <h2 onClick={handels}>SignUp</h2>
        </div>
    )
}

export default loginsignupnav