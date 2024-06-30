import React, { useState } from 'react';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {useNavigate} from "react-router-dom"

const AlumniSignIn = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()
    const handelsignin= () => {
      navigate("/alumniboard")
    }
    const formStyle ={
        backgroundImage: `url(${process.env.PUBLIC_URL}/assets/sddefault-1.jpg)`,
        height: "100vh",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
    }
    const containerStyle = {
        display: 'flex',
        height: '100vh', // 100% of the viewport height
        width: '100%', // Full width of the screen
      };
    
      const leftDivStyle = {
        flex: '1',
        backgroundColor: 'rgba(240, 240, 240, 0.2)', // Green background color with 0.7 alpha (transparency)
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      };
    
      const rightDivStyle = {    
        flex: '1',
        backgroundColor: 'rgba(111, 45, 189, 0.6)', // Blue background color with 0.7 alpha (transparency)
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      };
      const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
      };
    
  return (
        <div style={formStyle}>
          <div style={containerStyle}>
            <div style={leftDivStyle}>
              <form onSubmit={handelsignin} className="col-lg-6">
                <h3>Alumni Login</h3>
                <div className="mb-4 mt-5">
                  <label htmlFor="Email"> Email</label>
                  <input type="text" value={email} onChange={(e)=> setEmail(e.target.value)} className="form-control" placeholder="Enter your email" />
                </div>
                <div className="mb-4">
                  <label htmlFor="password">Password</label>
                  <div className="input-group">
                        <input type={showPassword ? 'text' : 'password'}  value={password} onChange={(e)=> setPassword(e.target.value)}className="form-control" placeholder="Enter password"/>
                        <button className="btn  btn-light " type="button"onClick={togglePasswordVisibility}>
                          <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                        </button>
                  </div>
                  <p className="forgot-password text-right text-white">
                         <a href="/signin">Forgot Password</a>
                  </p>
                </div>
                <div className="d-grid mb-3">
                  <button type="submit"className="btn" style={{ backgroundColor: '#6f2dbd', color: '#fff' }}>
                    Sign In
                  </button>
                </div>
                <p className="forgot-password text-right text-white">
                         Don't have an account. <a href="/signuptype/alumni">sign up</a>
                </p>
              </form>
            </div>
            <div style={rightDivStyle}></div>
          </div>
        </div>
    );
};

export default AlumniSignIn;
