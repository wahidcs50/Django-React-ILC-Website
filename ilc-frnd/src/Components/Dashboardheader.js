import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styling/DashboardHeader.css';
import Cookies from 'js-cookie';
import useRefreshToken from '../Apis/Refreshtoken';

const DashboardHeader = () => {
  const { refreshAccessToken } = useRefreshToken();
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(localStorage.getItem('uploadedImage') || null);
  const [userName, setUserName] = useState(localStorage.getItem('userName') || ''); 
  const [imageId, setImageId] = useState(localStorage.getItem('imageId') || null);
  const csrfCookieValue = Cookies.get('csrftoken');
  let accessToken = Cookies.get('access_token');

  const getConfig = (token) => ({
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${token}`,
      'X-CSRFToken': csrfCookieValue,
    },
  });

   const fetchUserProfile = async (accessToken) => {
    try {
      const response = await axios.get('http://localhost:8000/api/profile/student-info/', getConfig(accessToken), {
        withCredentials: true,
      });
      // console.log(response);
      if (response.data) {
        // console.log('User data:', response.data);
        setUserName(`${response.data.first_name} ${response.data.last_name}`);
        localStorage.setItem('userName', `${response.data.first_name} ${response.data.last_name}`);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      if (error.response && error.response.status === 401) {
        try {
          const newAccessToken = await refreshAccessToken();
          accessToken = newAccessToken;
          const response = await axios.get('http://localhost:8000/api/profile/student-info/', getConfig(newAccessToken));
          if (response.data) {
            setUserName(`${response.data.first_name} ${response.data.last_name}`);
            localStorage.setItem('userName', `${response.data.first_name} ${response.data.last_name}`);
          }
        } catch (refreshError) {
          console.error('Error refreshing token and fetching user profile:', refreshError);
        }
      }
    }
  };

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/profile/student/image/', getConfig(accessToken), {
          withCredentials: true,
        });
        if (response.data && response.data.length > 0) {
          const imageData = response.data[0];
          setUploadedImage(imageData.student_image);
          setImageId(imageData.id);
          localStorage.setItem('uploadedImage', imageData.student_image);
          localStorage.setItem('imageId', imageData.id);
        }
      } catch (error) {
        if (error.response.status === 401) {
          try {
            const newAccessToken = await refreshAccessToken();
            accessToken = newAccessToken;
            const response = await axios.get('http://localhost:8000/api/profile/student/image/', getConfig(newAccessToken));
            if (response.data && response.data.length > 0) {
              const imageData = response.data[0];
              setUploadedImage(imageData.student_image);
              setImageId(imageData.id);
              localStorage.setItem('uploadedImage', imageData.student_image);
              localStorage.setItem('imageId', imageData.id);
            }
          } catch (refreshError) {
            console.error('Error refreshing token and fetching image:', refreshError);
          }
        } else {
          console.error("No profile image found or error occurred:", error);
        }
      }
    };

    if (!uploadedImage || !imageId) {
      fetchImage();
    }
    
    fetchUserProfile(accessToken);
    
  }, [uploadedImage, imageId, accessToken,userName, refreshAccessToken]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
      handleSubmit(file);
    }
  };

  const handleSubmit = async (file) => {
    if (!file) {
      console.error('No image selected');
      return;
    }

    const formData = new FormData();
    formData.append('student_image', file);

    try {
      if (imageId) {
        // Update the existing profile image
        const response = await axios.put(`http://localhost:8000/api/profile/student/image/${imageId}/`, formData, getConfig(accessToken));
        setUploadedImage(response.data.student_image);
        setPreview(null);
        setImage(null);
        localStorage.setItem('uploadedImage', response.data.student_image);
      } else {
        // Create a new profile image
        const response = await axios.post('http://localhost:8000/api/profile/student/image/', formData, getConfig(accessToken));
        setUploadedImage(response.data.student_image);
        setImageId(response.data.id);
        setPreview(null);
        setImage(null);
        localStorage.setItem('uploadedImage', response.data.student_image);
        localStorage.setItem('imageId', response.data.id);
      }
    } catch (error) {
      if (error.response.status === 401) {
        try {
          const newAccessToken = await refreshAccessToken();
          accessToken = newAccessToken;
          const response = await axios({
            method: imageId ? 'put' : 'post',
            url: imageId ? `http://localhost:8000/api/profile/student/image/${imageId}/` : 'http://localhost:8000/api/profile/student/image/',
            data: formData,
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': `Bearer ${newAccessToken}`,
              'X-CSRFToken': csrfCookieValue,
            },
          });
          setUploadedImage(response.data.student_image);
          if (!imageId) setImageId(response.data.id);
          setPreview(null);
          setImage(null);
          localStorage.setItem('uploadedImage', response.data.student_image);
          if (!imageId) localStorage.setItem('imageId', response.data.id);
        } catch (refreshError) {
          console.error('Error refreshing token and submitting image:', refreshError);
        }
      } else {
        console.error('Error submitting the image:', error.response ? error.response.data : error.message);
      }
    }
  };


  return (
    <div className="top-container">
      <div className="dashboard-title text-dark">Student Dashboard</div>
      <div className="profile-info">
        <span className="text-dark">{userName}</span>
        <div className="profile-image-container">
          <img
            src={preview || uploadedImage}
            alt="Profile"
            className="student-profile-image"
            onClick={() => document.getElementById('fileInput').click()}
          />
          <input type="file" id="fileInput" onChange={handleImageChange} style={{ display: 'none' }} />
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;









