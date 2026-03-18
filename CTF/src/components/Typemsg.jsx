import React, { useState, useEffect } from "react";
import './Typemsg.css';
import axios from "axios";
import { socket } from "../socket";
const API = import.meta.env.VITE_API_URL;

const Typemsg = ({ chatto, onSend, setissendimg }) => {

  const [usertypemsg, setusertypemsg] = useState("");
  const [fromUserID, setfromUserID] = useState("");
  const [file, setFile] = useState(null);

  useEffect(() => {

    socket.on("connect", () => {
      console.log("Connected:", socket.id);
    });

    const register = async () => {
      const res = await axios.get(
        `${API}/userid`,
        { withCredentials: true }
      );
      setfromUserID(res.data.userid);
      socket.emit("registerUser", res.data.userid);
    };

    register();

    socket.on("receiveMessage", ({ fromUserID, message, fileUrl, fileType }) => {
      console.log("Received:", message, fileUrl);
    });

    return () => {
      socket.off("connect");
      socket.off("receiveMessage");
    };

  }, []);

  const hs = async (e) => {
    e.preventDefault();

    if (!usertypemsg.trim() && !file) return;

    let fileUrl = "";
    let fileType = "";

    try {
      // 🔥 Agar file hai to upload karo
      if (file) {
        const formData = new FormData();
        formData.append("file", file);

        const res = await axios.post(
          `${API}/uploadchat`,
          formData,
          { withCredentials: true }
        );

        fileUrl = res.data.fileUrl;
        fileType = res.data.fileType;
      }

      // 🔥 Socket se send karo (text + file)
      socket.emit("sendMessageToUser", {
        chatto,
        fromUserID,
        message: usertypemsg,
        fileUrl,
        fileType
      });

      // UI update
      onSend({
        message: usertypemsg,
        fileUrl,
        fileType
      });

      setusertypemsg("");
      setFile(null);

    } catch (err) {
      console.log(err);
    }
  };

  const handlechange = (e) => {
    const value = e.target.value;
    setissendimg(value);
    setusertypemsg(value);
  }

  const filemsgchange = (e)=>{
    setFile(e.target.files[0]);
    document.getElementById("buttonsubmit").click()
  }

  return (
    <div id='Typemsgbox'>
      <button id="buttonaddfile"><img onClick={() => document.getElementById("filemsg").click()} src="\attach_file_add_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.png" alt="File" /></button>
      <input id="filemsg" type="file" onChange={filemsgchange} />
      <form onSubmit={hs}>
        <input
          type="text"
          value={usertypemsg}
          onChange={handlechange}
        />
        <button id="buttonsubmit" type="submit"><img src="\send_24dp_F3F3F3_FILL0_wght400_GRAD0_opsz24.png" alt="Send" /></button>
      </form>
    </div>
  );
};

export default Typemsg;