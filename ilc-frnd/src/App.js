import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import HomePage from './pages/Home';
import Contacts from './pages/Contacts';
import Aboutus from './pages/Aboutus';
import SignupForm from './Components/Signup';
import SignupAlumni from './Components/Signupalumni';
import SignIn from './Components/SignIn';
import UserTypeSelection from './Components/Signuptype';
import SigninTypeSelection from './Components/Signintype';
import AlumniSignIn from './Components/Alumnisignin';

import AlumniDashboard from './Alumnidashboard/Alumniboard';
import AlumniProfile from './Alumnidashboard/Alumniprofile';
import AlumniCalender from './Alumnidashboard/Calender';
import AlumniEvents from './Alumnidashboard/Events';
import AlumniJobstatus from './Alumnidashboard/Jobstatus';
import AlumniNotifications from './Alumnidashboard/Notification';



import StudentBoard from './Studentdashborad/Studentboard';
import StudentProfile from './Studentdashborad/Studentprofile';
import Jobstatus from './Studentdashborad/Jobstatus';
import Events from './Studentdashborad/Events';
import Notifications from './Studentdashborad/Notification';
import Calender from './Studentdashborad/Calender';
import ResumeBuilder from './Studentdashborad/ResumeBuilder';

import jobs from './data/jobs.json'; // Import the jobs data
import JobListing from './Components/Joblisting';
import JobDescription from './Components/Jobdescription'; // Import JobDescription here
import JobApplicationForm from './Components/applicationform'; // Import JobApplicationForm here

import Activation from './Components/Activation';

import { EventProvider } from './hooks/EventContext';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signuptype/student" element={<SignupForm />} />
        <Route path="/signuptype/alumni" element={<SignupAlumni />} />
        <Route path="/signuptype" element={<UserTypeSelection />} />
        <Route path="/signintype" element={<SigninTypeSelection />} />
        <Route path="/signintype/student" element={<SignIn />} />
        <Route path="/signintype/alumni" element={<AlumniSignIn />} />


        
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/about" element={<Aboutus />} />

       
       
        <Route path="/events" element={ <EventProvider><Events /></EventProvider>}/>
        <Route path="/studentboard" element={ <EventProvider><StudentBoard /></EventProvider>} />
         
        

        <Route path="/studentprofile" element={<StudentProfile />} />
        <Route path="/jobs" element={<Jobstatus />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/calender" element={ <EventProvider><Calender /></EventProvider>} />
        <Route path="/Resumebuilder" element={<ResumeBuilder />} />
        <Route path="/logout" element={<HomePage />} />

        <Route path="/alumniboard" element={<AlumniDashboard />} />
        <Route path="/alumniprofile" element={<AlumniProfile />} />
        <Route path="/alumnijobs" element={<AlumniJobstatus />} />
        <Route path="/alumnievents" element={<AlumniEvents />} />
        <Route path="/alumninotifications" element={<AlumniNotifications />} />
        <Route path="/alumnicalender" element={<AlumniCalender />} />




        <Route path="/joblist/*" element={<JobListing jobs={jobs} />} /> {/* Nested routes for JobListing */}
        <Route path="/jobdetails/:id" element={<JobDescription />} /> {/* JobDescription route */}
        <Route path="/apply" element={<JobApplicationForm />} /> {/* JobApplicationForm route */}

        <Route path="//activate/:uid/:token" element={<Activation />} /> {/* JobApplicationForm route */}

        


      </Routes>
    </Router>
  );
}

export default App;
