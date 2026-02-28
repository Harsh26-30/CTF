import React from 'react'
import axios from 'axios'
import './profimgupload.css'

const API = import.meta.env.VITE_API_URL;

const ProfImgUpload = ({ setuserprofimg, setupoadimg }) => {

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.post(
        `${API}/uploadprofimg`,
        formData,
        { withCredentials: true }
      );

      if (file) {
        setupoadimg(prev => !prev);
      }

      // Update parent state
      setuserprofimg(res.data.imageUrl);

    } catch (err) {
      console.log("Upload failed:", err);
    }
  };

  const handleclickprofile = (e) => {
    e.preventDefault();
    setupoadimg(prev => !prev);
  };


  return (
    <div onDoubleClick={handleclickprofile} id='box2'>
      <div className="profimgupload">
        <label htmlFor="inputfile">
          <div id='imgspace'>
            <p> Browse for Img</p>
          </div>
        </label>
        <input id='inputfile'
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          hidden
        />
      </div>
    </div>
  )
}

export default ProfImgUpload;