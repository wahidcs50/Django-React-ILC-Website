                   
import React from 'react';
import { FiPhone, FiMail } from 'react-icons/fi'; 
import {  Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faLinkedin } from '@fortawesome/free-brands-svg-icons';


const AdvancedFooter = () => {
  return (
    <div className="container-fluid  text-light py-5 " style={{backgroundColor: '#7575b7' }}>
        <hr className="my-4" />
          <Row>
            <Col md={4}>
              <div className='text-center'>
                <h5>Contact Us</h5>
                <FiMail style={{ color: 'white' }} /> ilc.cs@comsats.edu.pk
                <br />
                <FiPhone style={{ color: 'white' }} /> 051-90495156
              </div>
            </Col>
            <Col md={4}>
              <div className='text-center'>
                <h5>Quick Links</h5>
                <ul className="list-unstyled" style={{ color: 'white' }}>
                  <li>
                    <a href="/" style={{ color: 'white' }}>Home</a>
                  </li>
                  <li>
                    <a href="/about" style={{ color: 'white' }}>About Us</a>
                  </li>
                  <li>
                    <a href="/contacts" style={{ color: 'white' }}>Contacts</a>
                  </li>
                </ul>
              </div>
            </Col>
            <Col md={4}>
              <div className='text-center'>
                <h5>Follow Us</h5>
                <ul className="list-unstyled">
                  <li>
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={{ color: 'white' }}>
                      <FontAwesomeIcon icon={faFacebook} size="2x" style={{ color: 'white' }} />
                    </a>
                  </li>
                  <li>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={{ color: 'white' }}>
                      <FontAwesomeIcon icon={faLinkedin} size="2x" style={{ color: 'white' }} />
                    </a>
                  </li>
                </ul>
              </div>
            </Col>
          </Row>

          <p className='d-flex align-items-center justify-content-center'>&copy; 2024 Industry Liaison Cell Comsats University Islamabad. All rights reserved.</p>
          <hr className="my-4" />
    </div>
  );
};

export default AdvancedFooter;
