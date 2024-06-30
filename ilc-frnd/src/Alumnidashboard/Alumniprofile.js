import React, { useState } from 'react';
import '../Studentdashborad/styling/stepper.css';

// function Appstepper() {
function AlumniProfile() {
  const [step, setStep] = useState(1);

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };
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
          <div className='wizard-container'>
              <div className='container'>
                <div className="progressbar">
                  <div className="progress" id="progress" style={{ width: `${(step - 1) * 25}%` }}></div>
                  
                  <div className={`progress-step ${step >= 1 ? 'progress-step-active' : ''}`} data-title="Profile Information"></div>
                  <div className={`progress-step ${step >= 2 ? 'progress-step-active' : ''}`} data-title="Personal information"></div>
                  <div className={`progress-step ${step >= 3 ? 'progress-step-active' : ''}`} data-title="Education"></div>
                  <div className={`progress-step ${step >= 4 ? 'progress-step-active' : ''}`} data-title="Skills"></div>
                  <div className={`progress-step ${step >= 5 ? 'progress-step-active' : ''}`} data-title="Resume"></div>
                </div>
                <form id="msform">
                  {/* fieldsets */}
                  {step === 1 && (
                    <fieldset>
                      <h2 className="fs-title">Profile Information</h2>
                      <h3 className="fs-subtitle">Provide your profile information</h3>
                      {/* Profile Information Fields */}
                      <input type="text" name="username" placeholder="Username" />
                      <input type="email" name="email" placeholder="Email" />
                      <input type="button" className="next action-button" value="Next" onClick={nextStep} />
                    </fieldset>
                  )}
                  {step === 2 && (
                    <fieldset>
                      <h2 className="fs-title">Personal Details</h2>
                      <h3 className="fs-subtitle">Tell us something more about you</h3>
                      {/* Personal Details Fields */}
                      <input type="text" name="fname" placeholder="First Name" />
                      <input type="text" name="lname" placeholder="Last Name" />
                      <input type="text" name="phone" placeholder="Phone" />
                      <input type="text" name="phone" placeholder="Phone" />
                      <input type="text" name="phone" placeholder="Phone" />
                      <input type="text" name="phone" placeholder="Phone" />
                      <input type="button" name="previous" className="previous action-button-previous" value="Previous" onClick={prevStep} />
                      <input type="button" name="next" className="next action-button" value="Next" onClick={nextStep} />
                    </fieldset>
                  )}
                  {step === 3 && (
                    <fieldset>
                      <h2 className="fs-title">Education</h2>
                      <h3 className="fs-subtitle">Your educational background</h3>
                      {/* Education Fields */}
                      <input type="text" name="university" placeholder="University" />
                      <input type="text" name="degree" placeholder="Degree" />
                      <input type="button" name="previous" className="previous action-button-previous" value="Previous" onClick={prevStep} />
                      <input type="button" name="next" className="next action-button" value="Next" onClick={nextStep} />
                    </fieldset>
                  )}
                  {step === 4 && (
                    <fieldset>
                      <h2 className="fs-title">Skills</h2>
                      <h3 className="fs-subtitle">List your skills</h3>
                      {/* Skills Fields */}
                      <input type="text" name="skill1" placeholder="Skill 1" />
                      <input type="text" name="skill2" placeholder="Skill 2" />
                      <input type="text" name="skill3" placeholder="Skill 3" />
                      <input type="button" name="previous" className="previous action-button-previous" value="Previous" onClick={prevStep} />
                      <input type="button" name="next" className="next action-button" value="Next" onClick={nextStep} />
                    </fieldset>
                  )}
                  {step === 5 && (
                    <fieldset>
                      <h2 className="fs-title">Resume</h2>
                      <h3 className="fs-subtitle">Upload your resume</h3>
                      {/* Resume Field */}
                      <input type="file" name="resume" accept=".pdf,.doc,.docx" />
                      <input type="button" name="previous" className="previous action-button-previous" value="Previous" onClick={prevStep} />
                      <input type="submit" name="submit" className="submit action-button" value="Submit" />
                    </fieldset>
                  )}
                </form>
              </div>
          </div>
      </div>
    </div>
  )
}

export default AlumniProfile