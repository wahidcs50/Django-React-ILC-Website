

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../Components/Sidebar'
import '../Studentdashborad/styling/notifications.css';
import Cookies from 'js-cookie';
import useRefreshToken from '../Apis/Refreshtoken';
import DashboardHeader from '../Components/Dashboardheader';
import {format} from 'date-fns'

const Notifications = () => {
    const { refreshAccessToken } = useRefreshToken();
  const[profileImage,] = useState(localStorage.getItem('uploadedImage') || '');
  console.log(profileImage);
  const [jobNotifications, setJobNotifications] = useState(()=>{
    const jobNotes = localStorage.getItem('jobNotifications');
      return jobNotes ? JSON.parse(jobNotes) : [];
  });
  const [eventNotifications, setEventNotifications] = useState(()=>{
    const eventNotes=localStorage.getItem('eventNotifications');
        return eventNotes ? JSON.parse(eventNotes) : [];
  });


  useEffect(() => {
    const fetchNotifications = async () => {
      const csrfCookieValue = Cookies.get('csrftoken');
       let accessToken = Cookies.get('access_token');

       const config = {
         headers: {
           'Content-Type': 'application/json',
           'Authorization': `Bearer ${accessToken}`,
           'X-CSRFToken': csrfCookieValue
         }
       };
      try {
        const jobResponse = await axios.get('http://localhost:8000/api/job/jobnotifications/', config);
        setJobNotifications(jobResponse.data);
        localStorage.setItem('jobNotifications', JSON.stringify(jobResponse.data));

        const eventResponse = await axios.get('http://localhost:8000/api/event/eventnotifications/', config);
        setEventNotifications(eventResponse.data);
        localStorage.setItem('eventNotifications', JSON.stringify(eventResponse.data));

      } catch (error) {
        console.error('Error fetching notifications:', error);
        if(error.response && error.response.status=== 401){
          try{
            accessToken = await refreshAccessToken();
            const jobResponse = await axios.get('http://localhost:8000/api/job/jobnotifications/', config);
            setJobNotifications(jobResponse.data);
            localStorage.setItem('jobNotifications', JSON.stringify(jobResponse.data));

            const eventResponse = await axios.get('http://localhost:8000/api/event/eventnotifications/', config);
            setEventNotifications(eventResponse.data);
            localStorage.setItem('eventNotifications', JSON.stringify(eventResponse.data));
          } catch (refreasherror) {
              console.log("token refresh error: ", refreasherror);
          }
        }
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div style={{
        display: "flex",
        height: "100vh",
      }}  >
       <Sidebar/>
      <div className="main-container">
          <DashboardHeader/>
          <div className="page-address text-dark">Home / Notification</div>
          <div className="notifications-container">
              <div className="notifications-row">
                <div className="jobs-notifications">
                  <div className='section'>
                    <div className='section-header'>
                      <h3 className="notification-title">Jobs Notifications</h3>
                      <button className="see-all-button">See All</button>
                    </div>
                    <div className="notifications-list">
                      {jobNotifications.map(notification => (
                        <div className="notification-item" key={notification.id}>
                          <div className="profile-image">
                            {/* <img src={notification.user_profile_image} alt="Profile" /> */}
                            <img src={profileImage} alt="Profile" />
                          </div>
                          <div className="notification-details">
                            <h4 className="notification-heading">{notification.job_title.title}</h4>
                            <p className="notification-description">{notification.job_description.description}</p>
                            <p className="notification-time">{format(new Date(notification.timestamp.posted_date), 'yyyy-MM-dd HH:mm:ss')}</p>
                          </div>
                          <button className="view-button">View</button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="notifications-row">
                <div className="events-notifications">
                  <div className='section'>
                    <div className='section-header'>
                      <h3 className="notification-title">Events Notifications</h3>
                      <button className="see-all-button">See All</button>
                    </div>
                    <div className="notifications-list">
                      {eventNotifications.map(notification => (
                        <div className="notification-item" key={notification.id}>
                          <div className="profile-image">
                            {/* <img src={notification.user_profile_image} alt="Profile" /> */}
                            <img src={profileImage} alt="Profile" />
                          </div>
                          <div className="notification-details">
                            <h4 className="notification-heading">{notification.event_detail.title}</h4>
                            <p className="notification-description">{notification.event_detail.description}</p>
                            <p className="notification-time">{format(new Date(notification.event_detail.date_and_time), 'yyyy-MM-dd HH:mm:ss')}</p>
                          </div>
                          <button className="view-button">View</button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
      </div>
    </div>
  );
};

export default Notifications;

