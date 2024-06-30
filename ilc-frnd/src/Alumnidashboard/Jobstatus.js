import React from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
const AlumniJobstatus=()=> {
  return (
    <div style={{
        display: "flex",
        height: "100vh",
        backgroundColor: "#007bff", // bg-primary
      }}  >
      <div className="side-container">
        <img src="/assets/COMSATS_new_logo-2.jpg" alt="Your" />
         <a href="/alumniboard">Home</a>
        <a href="/alumniprofile">Profile</a>
        <a href="/alumnievents">Events</a>
        <a href="/alumnicalender" className="calender">Calender</a>
        <a href="/alumnijobs" className="job-status">Job status</a>
        <a href="/alumninotifications" className="notification">Notification</a>
        <a href="/logout" className="logout">Log out</a>
      </div>
      <div className="main-container">
          <div className="top-container">
                <div className="dashboard-title text-dark"> Alumni Dashboard</div>
                <div className="profile-info">
                <span className="text-dark">John Doe</span>
                <img src="/assets/th (7).jpeg" alt="Profile" />
                </div>
          </div>
          <div className="page-address text-dark">Home / Profile</div>
          <div class="homemain-container bg-info mt-5">
              <div class="row">
                  <div class="col-md-8 bg-success"> 
                      <h3>New Jobs</h3>
                      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                         <Button variant="primary">
                            <Link to="/joblist" style={{textDecoration:'none', color:'white'}}>See All</Link>
                          </Button>
                      </div>
                      <div className="left-card-container d-flex ">
                           <Card style={{ width: '40rem', borderRadius: '10px' }}>
                              <Card.Img variant="top" src='./assets/th (9).jpeg' />
                              <Card.Body>
                                  <Card.Title>Software Engineer</Card.Title>
                                  <Card.Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                     Sed malesuada ante sit amet mi faucibus, nec consequat odio tincidunt.
                                  </Card.Text>
                                  <Button variant="primary">See details</Button>
                              </Card.Body>
                            </Card>
                            <Card style={{ width: '40rem', borderRadius: '10px' }}>
                              <Card.Img variant="top" src='./assets/th (9).jpeg' />
                              <Card.Body>
                                  <Card.Title>Data analyst</Card.Title>
                                  <Card.Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                     Sed malesuada ante sit amet mi faucibus, nec consequat odio tincidunt.
                                  </Card.Text>
                                  <Button variant="primary">See details</Button>
                              </Card.Body>
                            </Card>
                       </div>
                        <div className="events-heading-container d-flex justify-content-between">
                              <h3>Applied Jobs</h3>
                              <button> see all</button>
                        </div>
                        <div className="d-flex">
                          <Card style={{ width: '40rem' }}>
                              <Card.Body>
                                MERN-stack developer with two years of experience
                                <Card.Title>Applied at</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">December, 12 2023</Card.Subtitle>
                                <Card.Text>
                                  Some quick example text to build on the card title and make up the
                                  bulk of the card's content.
                                </Card.Text>
                                <Button variant="primary">View</Button>
                              </Card.Body>
                            </Card>
                            <Card style={{ width: '40rem' }}>
                              <Card.Body>
                                Python developer with two years of experience
                                <Card.Title>Applied at</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">December, 12 2023</Card.Subtitle>
                                <Card.Text>
                                  Some quick example text to build on the card title and make up the
                                  bulk of the card's content.
                                </Card.Text>
                                <Button variant="primary">View</Button>
                              </Card.Body>
                            </Card>
                        </div>
                  </div>
                  <div class="col-md-4 bg-secondary"> 
                    <div className="card-container">
                      <div className="events-heading-container d-flex justify-content-between">
                        <h3>New Events</h3>
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                         <Button variant="primary">see all</Button>
                        </div>
                      </div>
                      <div className="events-heading-container d-flex flex-column" >
                         <Card style={{ width: '100%', borderRadius: '10px' }}>
                            <Card.Body>
                                <Card.Title>International university level studnet competetion</Card.Title>
                                <Card.Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                                  Sed malesuada ante sit amet mi faucibus, nec consequat odio tincidunt.
                                   Vestibulum varius malesuada velit, et consequat purus gravida at.
                                    Donec non placerat magna. Nulla nec nisi eu magna fermentum 
                                    tincidunt id in sem. Cras sed tortor eu enim sollicitudin mattis 
                                  a vel enim. Fusce vitae sodales sapien, eget mattis nulla.
                                </Card.Text>
                                <Button variant="primary">Learn More</Button>
                            </Card.Body>
                          </Card>
                           <Card style={{ width: '100%', borderRadius: '10px' }}>
                            <Card.Body>
                                <Card.Title>International university level studnet competetion</Card.Title>
                                <Card.Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                                  Sed malesuada ante sit amet mi faucibus, nec consequat odio tincidunt.
                                   Vestibulum varius malesuada velit, et consequat purus gravida at.
                                    Donec non placerat magna. Nulla nec nisi eu magna fermentum 
                                    tincidunt id in sem. Cras sed tortor eu enim sollicitudin mattis 
                                  a vel enim. Fusce vitae sodales sapien, eget mattis nulla.
                                </Card.Text>
                                <Button variant="primary">Learn More</Button>
                            </Card.Body>
                          </Card>
                      </div>
                    </div>
                  </div>
              </div>
         </div>
      </div>
    </div>
  )
}

export default AlumniJobstatus