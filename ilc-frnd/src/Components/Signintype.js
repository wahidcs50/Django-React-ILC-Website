import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Components/styling/usertypesignup.css';

const SigninTypeSelection = () => {
    const navigate = useNavigate();

    const handleSignin = (userType) => {
        navigate(`/signup?user_type=${userType}`);
    };

    const handleAdminSignin = () => {
     window.location.href = 'http://localhost:8000/admin/';
    };

    return (
        <div className="user-type-selection-container" style={{backgroundImage: `url(${process.env.PUBLIC_URL}/assets/sddefault-1.jpg)`}}>
            <div className="content">
                <h2>Welcome to ILC CUI!</h2>
                <p>Please select below and tell us who you are? </p>
                <div className="button-container">
                    <Link to="/signintype/student">
                        <button onClick={() => handleSignin('student')} className="signup-button student">Signin as Student</button>
                    </Link>
                    <Link to="/signintype/alumni">
                        <button onClick={() => handleSignin('alumni')} className="signup-button alumni">Signin as Alumni</button>
                    </Link>
                    <button onClick={handleAdminSignin} className="signup-button admin">Admin Login</button>
                </div>
            </div>
        </div>
    );
}

export default SigninTypeSelection;
