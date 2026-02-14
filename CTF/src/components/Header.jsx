import React from 'react'
import { useState } from 'react'
import './Header.css'
import SearchBox from './SearchBox'
import Navbar from './Navbar'
import More from './More'
import NavbarM from './NavbarM'

const Header = (props) => {
    const [forNavbarM, setNavbarM] = useState(false)
    const changemsgNavbar = () => {
        setNavbarM(!forNavbarM)
    }
    return (
        <div id='headerbox'>
            <h1>Chat To Friend</h1>
            <SearchBox />
            <Navbar />
            <More onClick={changemsgNavbar} />
            {forNavbarM && <NavbarM />}
        </div>
    )
}

export default Header