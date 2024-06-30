import React from 'react';
import {Link, useNavigate } from 'react-router-dom'; 
import '../Components/styling/usertypesignup.css'; 

const UserTypeSelection = () => {
    const navigate = useNavigate(); // Initialize useNavigate hook

    const handleSignup = (userType) => {
        
        navigate(`/signup?user_type=${userType}`);
    };

    return (
        <div className="user-type-selection-container" style={{backgroundImage: `url(${process.env.PUBLIC_URL}/assets/sddefault-1.jpg)`}} >
            <div className="content">
                <h2>Welcome to ILC CUI!</h2>
                <p>Please select below and tell us who you are? </p>
                <div className="button-container">
                    <Link to="/signuptype/student">
                        <button onClick={() => handleSignup('student')} className="signup-button student">Signup as Student</button>
                    </Link>
                    <Link to="/signuptype/alumni">
                        <button onClick={() => handleSignup('alumni')} className="signup-button alumni">Signup as Alumni</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default UserTypeSelection;
