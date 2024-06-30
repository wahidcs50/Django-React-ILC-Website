// full working signin code
import React, { useState } from 'react';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Cookies from 'js-cookie';

const SignIn = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8000/auth/jwt/create/", { email, password });
            // Redirect to the student board page upon successful sign-in
            const userData= response.data
            const accessToken = userData.access; // Assuming the access token field is named 'access'
            const refreshToken = userData.refresh
            Cookies.set('access_token', accessToken);
            Cookies.set('refresh_token', refreshToken);
            // localStorage.setItem('accessToken', accessToken);
            // localStorage.setItem('refreshToken', refreshToken);
            console.log('Access Token:', accessToken);
            console.log('Activation response:', userData);
            navigate("/studentboard");
        } catch (error) {
            setError("Invalid email or password. Please try again.");
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

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

    return (
        <div style={formStyle}>
            <div style={containerStyle}>
                <div style={leftDivStyle}>
                    <div className="col-lg-6">
                        <form onSubmit={handleSubmit}>
                            <h3 className="mb-4">Student Login</h3>
                            {error && <div className="alert alert-danger">{error}</div>}
                            <div className="mb-4">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="password" className="form-label">Password</label>
                                <div className="input-group">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        className="form-control"
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Enter password"
                                        required
                                    />
                                    <button
                                        className="btn btn-light"
                                        type="button"
                                        onClick={togglePasswordVisibility}
                                    >
                                        <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                                    </button>
                                </div>
                                <p className="forgot-password text-end">
                                    <a href="/signin" >Forgot Password</a>
                                </p>
                            </div>
                            <div className="mb-3">
                                <button type="submit" className="btn btn-primary btn-block">Sign In</button>
                            </div>
                            <p className="forgot-password text-right text-white">
                                Don't have an account? <a href="/signuptype/student" >Sign up</a>
                            </p>
                        </form>
                    </div>
                </div>
                <div style={rightDivStyle}></div>
            </div>
        </div>
    );
};

export default SignIn;

