import React, { useState } from 'react';
import { useNavigate} from 'react-router-dom'
import '../Components/styling/applicationform.css'; // Import your custom CSS file for styling

const JobApplicationForm = ({ goBack }) => {
  const [jobTitle, setJobTitle] = useState('');
  const [applicantName, setApplicantName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [degree, setDegree] = useState('');
  const [major, setMajor] = useState('');
  const [cgpa, setCgpa] = useState('');
  const [resume, setResume] = useState('');
  const [coverLetter, setCoverLetter] = useState('');


  const navigate = useNavigate();
  const handlegoback= ()=>{
    navigate('/jobdetails/:id',{replace:true});
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can handle form submission, such as sending data to a server
    console.log({
      jobTitle,
      applicantName,
      email,
      phone,
      degree,
      major,
      cgpa,
      resume,
      coverLetter
    });
    // Reset form fields
    setJobTitle('');
    setApplicantName('');
    setEmail('');
    setPhone('');
    setDegree('');
    setMajor('');
    setCgpa('');
    setResume('');
    setCoverLetter('');

  };

  return (
    <div className="application-form-container">
      <h2>Application Form</h2>
      <p>Please fill out the form carefully</p>
      <form onSubmit={handleSubmit} className="application-form">
        <div className="form-group">
          <label htmlFor="jobTitle">Select Job:</label>
          <select id="jobTitle" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)}>
            <option value="">Select...</option>
            <option value="Python Developer">Python Developer</option>
            <option value="Java Developer">Java Developer</option>
            <option value="React Developer">React Developer</option>
            {/* Add more options as needed */}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="applicantName">Applicant Name:</label>
          <input type="text" id="applicantName" value={applicantName} onChange={(e) => setApplicantName(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone:</label>
          <input type="tel" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="degree">Degree:</label>
          <input type="text" id="degree" value={degree} onChange={(e) => setDegree(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="major">Major:</label>
          <input type="text" id="major" value={major} onChange={(e) => setMajor(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="cgpa">CGPA:</label>
          <input type="text" id="cgpa" value={cgpa} onChange={(e) => setCgpa(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="resume">Resume:</label>
          <input type="file" id="resume" accept=".pdf,.doc,.docx" onChange={(e) => setResume(e.target.files[0])} />
        </div>
        <div className="form-group">
          <label htmlFor="coverLetter">Cover Letter:</label>
          <textarea id="coverLetter" value={coverLetter} onChange={(e) => setCoverLetter(e.target.value)} />
        </div>
        <div className="form-group">
          <button type="submit" className="submit-button">Submit</button>
          <button type="button" className="back-button" onClick={handlegoback}>Back</button>
        </div>
      </form>
    </div>
  );
};

export default JobApplicationForm;
