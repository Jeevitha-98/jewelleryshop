import React, { useRef, useState, useContext } from "react";
import { ThemeContext } from "../Component/ThemeContext";


export default function Profile() {
  const fileInputRef = useRef(null);
  const [image, setImage] = useState(null);

  const { theme } = useContext(ThemeContext);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  return (
    <div className={`profile-container ${theme}`}>
      
      <h2 style={{ color: theme === "light" ? "red" : "#ff6b6b" }}>
  My Profile
</h2>

      <div className="image-section" onClick={handleImageClick}>
        {image ? (
          <img src={image} alt="Profile" />
        ) : (
          <p>Click to Upload</p>
        )}
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageChange}
        hidden
        accept="image/*"
      />

      <button onClick={handleImageClick} className="upload-btn">
        Change Image
      </button>
    </div>
  );
}