import React from 'react'
import './SearchBox.css'
import { useState } from 'react'
import axios from "axios";

const SearchBox = () => {
  const [userid, setuserid] = useState()
  const [isuser, setisuser] = useState()
  const [userprofile, setuserprofile] = useState("/pexels-caleb-lamb-597215774-35911819.jpg")
  const [userprofilename, setuserprofilename] = useState()
  const [add, setadd] = useState(false)
  const [remove, setremove] = useState(false)


  const hs = async (e) => {
    e.preventDefault();
    const res = await axios.post("https://your-netlify-site.netlify.app/finduser", {
      userid: userid
    }
    );
    console.log(res.data);

    setisuser(res.data.isuser);
    setuserprofilename(res.data.userprofilename);
    setadd(res.data.add)
    setremove(res.data.remove)
  }

  const hadd = async (e) => {
    e.preventDefault();
    const res = await axios.post("https://your-netlify-site.netlify.app/addfriend", {
      userid: userid
    }, {
      withCredentials: true   // <--- ye must hai
    }
    );
    setadd(res.data.add)
    setremove(res.data.remove)
  }

  const hremove = async (e) => {
    e.preventDefault();
    const res = await axios.post("https://your-netlify-site.netlify.app/removefriend", {
      userid: userid
    }, {
      withCredentials: true   // <--- ye must hai
    }
    );
    setadd(res.data.add)
    setremove(res.data.remove)
  }

  return (
    <div id='Searchboxmain'>
      <form id='searchuserform' onSubmit={hs}>
        <input type="text" name='usersearch' onChange={(e) => setuserid(e.target.value)} />
        <button type='sumbit'>Search</button>
      </form>
      {isuser && <ul>
        <li id='li1'> <img src="/pexels-caleb-lamb-597215774-35911819.jpg" alt="img" /></li>
        <li>{userprofilename}</li>
        <li>
          {add === false && remove === true && (
            <button id='btnremove' onClick={hremove}>Remove</button>
          )}

          {add === true && remove === false && (
            <button id='btnadd' onClick={hadd}>Add</button>
          )}
        </li>


      </ul>}
    </div>
  )
}

export default SearchBox