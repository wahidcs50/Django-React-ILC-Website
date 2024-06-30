import React from 'react'

const AlumniEvents=()=> {
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
           <div className='container-fluid d-flex flex-column bg-dark vh-100 align-items-center justify-content-center'>
                <h2>This is a centered box</h2>
                <p>With a different background color</p>
            </div>
      </div>
    </div>
  )
}

export default AlumniEvents