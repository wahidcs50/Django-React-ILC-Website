import React from 'react'
import '../Studentdashborad/styling/notifications.css'
const AlumniNotifications=()=> {
  return (
    <div style={{
        display: "flex",
        height: "100vh",
        backgroundColor: "#007bff", // bg-primary
      }}  >
      <div className="side-container">
        <img src="/assets/COMSATS_new_logo-2.jpg" alt="Your" />
         <a href="/alumniboard">Home</a>
        <a href="/alumniprofile">Profile</a>
        <a href="/alumnievents">Events</a>
        <a href="/alumnicalender" className="calender">Calender</a>
        <a href="/alumnijobs" className="job-status">Job status</a>
        <a href="/alumninotifications" className="notification">Notification</a>
        <a href="/logout" className="logout">Log out</a>
      </div>
      <div className="main-container">
          <div className="top-container">
                <div className="dashboard-title text-dark"> Alumni Dashboard</div>
                <div className="profile-info">
                <span className="text-dark">John Doe</span>
                <img src="/assets/th (7).jpeg" alt="Profile" />
                </div>
          </div>
          <div className="page-address text-dark">Home / Profile</div>
          <div className="notifications-container">
            <div className="left-column">
              <div className="jobs-notifications">
                <div className='section'>
                  <div className='section-header'>
                    <h3>Jobs Notifications</h3>
                    <button className="see-all-button">See All</button>
                  </div>
                  <div className="notifications-for-job">
                    <div className="notification-for-job">
                      <div className="notification-details">
                        <h4>Job Title 1</h4>
                        <p>Details of the job notification...</p>
                        <p className="notification-time">Time of notification</p>
                      </div>
                      <button className="view-button">View</button>
                    </div>
                    {/* Add more job notifications */}
                    <div className="notification-for-job">
                      <div className="notification-details">
                        <h4>Job Title 2</h4>
                        <p>Details of the job notification...</p>
                        <p className="notification-time">Time of notification</p>
                      </div>
                      <button className="view-button">View</button>
                    </div>
                    <div className="notification-for-job">
                      <div className="notification-details">
                        <h4>Job Title 3</h4>
                        <p>Details of the job notification...</p>
                        <p className="notification-time">Time of notification</p>
                      </div>
                      <button className="view-button">View</button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="events-notifications">
                <div className='section'>
                  <div className='section-header'>
                    <h3>Events Notifications</h3>
                    <button className="see-all-button">See All</button>
                  </div>
                  <div className="notifications-for-jobs">
                    <div className="notification-for-job">
                      <div className="notification-details">
                        <h4>Event Title 1</h4>
                        <p>Details of the event notification...</p>
                        <p className="notification-time">Time of notification</p>
                      </div>
                      <button className="view-button">View</button>
                    </div>
                    {/* Add more event notifications */}
                    <div className="notification-for-job">
                      <div className="notification-details">
                        <h4>Event Title 2</h4>
                        <p>Details of the event notification...</p>
                        <p className="notification-time">Time of notification</p>
                      </div>
                      <button className="view-button">View</button>
                    </div>
                    <div className="notification-for-job">
                      <div className="notification-details">
                        <h4>Event Title 3</h4>
                        <p>Details of the event notification...</p>
                        <p className="notification-time">Time of notification</p>
                      </div>
                      <button className="view-button">View</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="right-column">
              <div className="event-details">
                <h3>Event Heading</h3>
                <img src="event-image-url.jpg" alt="Event" />
                <p>Details of the event...</p>
                <button className="join-button">Join</button>
              </div>
            </div>
          </div>
      </div>
    </div>
  )
}

export default AlumniNotifications