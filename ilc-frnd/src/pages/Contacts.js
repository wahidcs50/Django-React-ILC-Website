import React from 'react';
import Header from '../Components/Header';
import AdvancedFooter from '../Components/Footer';
import './Contacts.css'; // Import the custom CSS file

const Contacts = () => {
  return (
    <>
      <Header />
      <div className='container-fluid contacts-bg vh-100' style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/assets/contct-1.jpg)`, backgroundSize: "cover", backgroundPosition: "center" }}>
      </div>
      <div className="container-fluid mt-5">
        <h5 style={{
          fontSize: '3rem',
          fontWeight: 'bold',
          color: '#2C3E50',
          textAlign: 'center',
          marginBottom: '2rem',
          textTransform: 'uppercase',
          letterSpacing: '2px',
        }}>Incharge Industry Lision Cell </h5>
        <div className="row justify-content-center mb-5">
          <div className="col-md-8">
            <div style={{
              background: 'linear-gradient(135deg, #6DD5FA, #FFFFFF)',
              border: 'none',
              borderRadius: '20px',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
              overflow: 'hidden',
              transition: 'transform 0.3s',
            }}>
              <div className="row no-gutters" style={{ display: 'flex', alignItems: 'center' }}>
                <div className="col-md-4" style={{ padding: '0' }}>
                  <img src="/assets/th (7).jpeg" alt="Mehboob" style={{
                    borderTopLeftRadius: '20px',
                    borderBottomLeftRadius: '20px',
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.3s',
                  }} />
                </div>
                <div className="col-md-8" style={{ padding: '20px' }}>
                  <div style={{ padding: '20px' }}>
                    <h5 style={{
                      fontSize: '2rem',
                      fontWeight: 'bold',
                      color: '#34495E',
                      marginBottom: '1rem',
                    }}>Professor Muhammad Rashid Mukhtar</h5>
                    <p style={{ fontSize: '1.2rem', color: '#7F8C8D', marginBottom: '0.5rem' }}>Email: ilc.cs@comsats.edu.pk</p>
                    <p style={{ fontSize: '1.2rem', color: '#7F8C8D', marginBottom: '0.5rem' }}>Phone: 051-90495156</p>
                    <p style={{ fontSize: '1.2rem', color: '#7F8C8D', marginBottom: '0.5rem' }}>Address: G-34, AB-2 , Comsats</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AdvancedFooter />
    </>
  );
}

export default Contacts;

<style jsx>{`
  .contact-card:hover {
    transform: scale(1.05);
  }

  .contact-card img:hover {
    transform: scale(1.1);
  }
`}</style>