import React, { useState } from 'react';
import axios from 'axios';

const SignupForm = () => {
  const formStyle = {
    backgroundImage: `url(${process.env.PUBLIC_URL}/assets/sddefault-1.jpg)`,
    height: "100vh",
    backgroundSize: "100% 100%",
    backgroundPosition: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  };

  const containerStyle = {
    display: 'flex',
    height: '100vh',
    width: '100%',
  };

  const leftDivStyle = {
    flex: '1',
    backgroundColor: 'rgba(111, 45, 189, 0.6)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const rightDivStyle = {
    flex: '1',
    backgroundColor: 'rgba(240, 240, 240, 0.2)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    re_password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.password !== formData.re_password) {
        console.error("Passwords do not match.");
        return;
      }
      
      const response = await axios.post('http://localhost:8000/auth/student/', formData);
      console.log(response.data); // Handle success response
      // You can redirect or show a success message here
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message); // Handle error response
      // You can show an error message to the user here
    }
  };

  return (
    <div style={formStyle}>
      <div style={containerStyle}>
        <div style={leftDivStyle}></div>
        <div style={rightDivStyle}>
          <form className="col-lg-6" onSubmit={handleSubmit}>
            <h3>Student Sign Up</h3>
            <div className="mb-4 mt-4">
              <input type="text" className="form-control" name="first_name" value={formData.first_name} onChange={handleChange} placeholder="First name" />
            </div>
            <div className="mb-4">
              <input type="text" className="form-control" name="last_name" value={formData.last_name} onChange={handleChange} placeholder="Last name" />
            </div>
            <div className="mb-4">
              <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} placeholder="Enter email" />
            </div>
            <div className="mb-4">
              <input type="password" className="form-control" name="password" value={formData.password} onChange={handleChange} placeholder="Enter password" />
            </div>
            <div className="mb-4">
              <input type="password" className="form-control" name="re_password" value={formData.re_password} onChange={handleChange} placeholder="Retype password" />
            </div>
            <div className="d-grid">
              <button type="submit" className="btn" style={{ backgroundColor: "#6f2dbd", color: "#fff" }}>
                Sign Up
              </button>
            </div>
            <p className="forgot-password text-right text-white">
              Already registered <a href="/signintype/student">sign in?</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;


