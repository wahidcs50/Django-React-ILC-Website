import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import "../Components/styling/sidebar.css"
import { useNavigate } from 'react-router-dom';
import useRefreshToken from '../Apis/Refreshtoken'; 

const Sidebar = () => {
  const navigate = useNavigate();
  const { refreshAccessToken } = useRefreshToken(); 

  const handleLogout = async (event) => {
    event.preventDefault();
    try {
      const accessToken = Cookies.get('access_token');
      const csrfCookieValue = Cookies.get('csrftoken');
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'X-CSRFToken': csrfCookieValue,
        },
      };

      const response = await axios.post('http://localhost:8000/auth/logout/', null, config);
      console.log('Logged out successfully', response);
      Cookies.remove('access_token');
      Cookies.remove('refresh_token');
      navigate('/');
    } catch (error) {
      if (error.response && error.response.status === 401) {
        try {
          await refreshAccessToken(); 
          return handleLogout(event);
        } catch (refreshError) {
          console.error('Error refreshing token:', refreshError);
        }
      }
      console.error('Logout failed', error);
    }
  };

  return (
    <div className="side-container">
      <img src="/assets/COMSATS_new_logo-2.jpg" alt="Your" />
      <a href="/studentboard">Home</a>
      <a href="/studentprofile">Profile</a>
      <a href="/jobs" className="job-status">Jobs</a>
      <a href="/events">Events</a>
      <a href="/calender" className="calender">Calendar</a>
      <a href="/notifications" className="notification">Notification</a>
      <a href="/Resumebuilder" className="Resumebuilder">Resume</a>
      <a href="/" className="logout" onClick={(event) => handleLogout(event)}>Log out</a>
    </div>
  );
}

export default Sidebar;




