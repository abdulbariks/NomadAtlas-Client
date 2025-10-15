import axios from 'axios';
import React, { useState } from 'react';

const useImageUpload = () => {
    const [picture, setPicture] = useState(null);
    const [error, setError] = useState(null);

    const handleImageUpload = async (e) => {
        setError(null)

        const photo = e.target.files[0];
        console.log(photo);

        const formData = new FormData();
        formData.append('image', photo)

        const photoUploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_Image_Upload_Key}`


        try {
            const res = await axios.post(photoUploadUrl, formData)
            console.log("scholarship image", res.data)
            setPicture(res.data.data.url)
            return res.data.data.url;
        } catch (err) {
            console.error("Image upload failed:", err);
            setError(err);
            return null;
        }
    }

    return {
        picture,
        handleImageUpload,
        error
    }
};

export default useImageUpload;