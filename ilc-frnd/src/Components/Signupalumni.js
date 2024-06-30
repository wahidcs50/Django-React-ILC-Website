import React from 'react';
const SignupAlumni = () => {
    const formStyle ={
        backgroundImage: `url(${process.env.PUBLIC_URL}/assets/sddefault-1.jpg)`,
        height: "100vh",
        backgroundSize: "100% 100%",
        backgroundPosition: "center",
        display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
    }
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
    
  return (
    <div style={formStyle}>
        <div style={containerStyle} >
            <div  style={leftDivStyle}>
            </div>
            <div style={rightDivStyle}>
                 <form className="col-lg-6">
                    <h3> Alumni Sign Up</h3>
                    <div className="mb-4 mt-4">
                        <input type="text" className="form-control" placeholder="First name"/>
                    </div>
                    <div className="mb-4">
                        <input type="text" className="form-control" placeholder="Last name" />
                    </div>
                    <div className="mb-4">
                        <input    type="email" className="form-control" placeholder="Enter email"/>
                    </div>
                    <div className="mb-4">
                        <input    type="password" className="form-control" placeholder="Enter password"/>
                    </div>
                    <div className="d-grid">
                        <button type="submit" className="btn" style={{backgroundColor: "#6f2dbd", color: "#fff"}}>
                            Sign Up
                        </button>
                    </div>
                    <p className="forgot-password text-right text-white">
                         Already registered <a href="/signintype/alumni">sign in?</a>
                    </p>
                </form>
            </div>
        </div>
    </div>
  );
};

export default SignupAlumni;
