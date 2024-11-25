import React, { useState } from "react";

function Input({ onImageUpload }) {
  const [image, setImage] = useState("");

  const uploadImage = (files) => {
    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("upload_preset", "mosesmn");

    fetch("https://api.cloudinary.com/v1_1/durnvtm2k/image/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setImage(data.secure_url);
        onImageUpload(data.secure_url);
      })
      .catch((error) => console.error("Image upload error:", error));
  };

  return (
    <div>
      <input type="file" onChange={(e) => uploadImage(e.target.files)} />
      {image && (
        <img
          src={image}
          alt="Uploaded"
          style={{ maxWidth: "100px", marginTop: "10px" }}
        />
      )}
    </div>
  );
}

export default Input;
