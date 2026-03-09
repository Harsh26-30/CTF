import React, { useState } from 'react';
import './Header.css';
import SearchBox from './SearchBox';
import Navbar from './Navbar';
import More from './More';
import NavbarM from './NavbarM';

const Header = ({ setauth, setshm,setprofile,setslh,setfbh }) => { // ✅ props pass from parent

    const [forNavbarM, setNavbarM] = useState(false);

    const changemsgNavbar = () => {
        setNavbarM(!forNavbarM);
        setslh(prve => !prve);
    }

    return (
        <div id='headerbox'>
            <h1>Chat To Friend</h1>
            <SearchBox />
            <Navbar setfbh={setfbh} setprofile={setprofile} setauth={setauth} setshm={setshm} /> 
            <More onClick={changemsgNavbar} />
            {forNavbarM && <NavbarM setfbh={setfbh}  setprofile={setprofile} setauth={setauth} setshm={setshm} />} 
        </div>
    )
}

export default Header;