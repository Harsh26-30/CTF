import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Header'
import Main from './components/Main'
import Authenticationpage from './components/Authenticationpage'
import axios from 'axios'
axios.defaults.withCredentials = true;
const API = import.meta.env.VITE_API_URL;


function App() {
  const [auth, setauth] = useState(true) //auth=Authentication
  const [msgforheaderofNavbarM, setmsgforheaderofNavbarM] = useState(true)
  const [shm, setshm] = useState(false) //shm=show header main or not
  const [profile, setprofile] = useState(false) //shm=show header main or not


  // App.jsx ya kisi component me
  useEffect(() => {
  axios.get(`${API}/remainlogin`, {
    withCredentials: true
  })
  .then(res => {
    if (res.data.auth) {
      setauth(false);
      setshm(true);
    }
  })
  .catch(() => {
    setauth(true);
    setshm(false);
  });
}, []);

  return (
    <>
      {shm && <Header setprofile={setprofile} setshm={setshm} setauth={setauth} msgforheaderofNavbarM={msgforheaderofNavbarM} />}
      {shm && <Main profile={profile} setshm={setshm} setauth={setauth} />}
      {auth && <Authenticationpage setshm={setshm} setauth={setauth} />}
    </>
  )
}

export default App
