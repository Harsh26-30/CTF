import React, { useState } from 'react';
import './Header.css';
import SearchBox from './SearchBox';
import Navbar from './Navbar';
import More from './More';
import NavbarM from './NavbarM';

const Header = ({ setauth, setshm }) => { // ✅ props pass from parent

    const [forNavbarM, setNavbarM] = useState(false);

    const changemsgNavbar = () => {
        setNavbarM(!forNavbarM);
    }

    return (
        <div id='headerbox'>
            <h1>Chat To Friend</h1>
            <SearchBox />
            <Navbar setauth={setauth} setshm={setshm} />  {/* ✅ pass props */}
            <More onClick={changemsgNavbar} />
            {forNavbarM && <NavbarM setauth={setauth} setshm={setshm} />} {/* ✅ pass props */}
        </div>
    )
}

export default Header;