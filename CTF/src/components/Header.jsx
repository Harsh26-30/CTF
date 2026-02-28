import React, { useState } from 'react';
import './Header.css';
import SearchBox from './SearchBox';
import Navbar from './Navbar';
import More from './More';
import NavbarM from './NavbarM';

const Header = ({ setauth, setshm,setprofile }) => { // ✅ props pass from parent

    const [forNavbarM, setNavbarM] = useState(false);

    const changemsgNavbar = () => {
        setNavbarM(!forNavbarM);
    }

    return (
        <div id='headerbox'>
            <h1>Chat To Friend</h1>
            <SearchBox />
            <Navbar setprofile={setprofile} setauth={setauth} setshm={setshm} /> 
            <More onClick={changemsgNavbar} />
            {forNavbarM && <NavbarM  setprofile={setprofile} setauth={setauth} setshm={setshm} />} 
        </div>
    )
}

export default Header;