import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Header'
import Main from './components/Main'
import Authenticationpage from './components/Authenticationpage'
import axios from 'axios'
axios.defaults.withCredentials = true;

function App() {
  const [auth, setauth] = useState(true) //auth=Authentication
  const [msgforheaderofNavbarM, setmsgforheaderofNavbarM] = useState(true)
  const [shm, setshm] = useState(false) //shm=show header main or not

  // App.jsx ya kisi component me
  useEffect(() => {
    console.log("API URL:", import.meta.env.VITE_API_URL);
  }, []);
  return (
    <>
      {shm && <Header msgforheaderofNavbarM={msgforheaderofNavbarM} />}
      {shm && <Main setshm={setshm} setauth={setauth} />}
      {auth && <Authenticationpage setshm={setshm} setauth={setauth} />}
    </>
  )
}

export default App
