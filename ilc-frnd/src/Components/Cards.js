
import React from 'react'
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
const Cards = () => {
  // Replace these with actual image URLs or use placeholder images from Lorem Picsum
  // const imageUrls = [
  //   '/assets/slide-1.jpg',
  //   '/assets/slide-2.jpg',
  //   '/assets/slide-3.jpg',
  //   '/assets/COMSATS_new_logo.jpg',
  // ];

  return (
    <div className='container-fluid bg-light'>
        <div className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '30vh' }}>
          <button className="btn btn-info rounded-pill">Activities</button>
          <h1>New Events Activities</h1>
          <h4>These are the recents activites has been happing in the comsats university islamabad campus</h4>
        </div>
        <div className='container-fluid '>
          <Row className="mb-4">
          <Col>
            <Card>
              <Card.Img variant="top" src="/assets/acti-1.jpeg" />
              <Card.Body>
                <Card.Title>Card 1</Card.Title>
                <Card.Text>
                  This is the content of Card 1.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Img variant="top" src="/assets/acti-1.jpeg" />
              <Card.Body>
                <Card.Title>Card 2</Card.Title>
                <Card.Text>
                  This is the content of Card 2.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Img variant="top" src="/assets/acti-1.jpeg" />
              <Card.Body>
                <Card.Title>Card 3</Card.Title>
                <Card.Text>
                  This is the content of Card 3.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card>
              <Card.Img variant="top" src="/assets/acti-2.jpeg" />
              <Card.Body>
                <Card.Title>Card 4</Card.Title>
                <Card.Text>
                  This is the content of Card 4.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Img variant="top" src="/assets/acti-2.jpeg" />
              <Card.Body>
                <Card.Title>Card 5</Card.Title>
                <Card.Text>
                  This is the content of Card 5.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Img variant="top" src="/assets/acti-2.jpeg" />
              <Card.Body>
                <Card.Title>Card 6</Card.Title>
                <Card.Text>
                  This is the content of Card 6.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        </div>
        <div className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '30vh' }}>
          <button className="btn btn-info rounded-pill">Our Proud</button>
          <h1>Our Success Stories</h1>
          <h4>These are the proud of comsats university islamabad campus</h4>
        </div>
        <Row className="mb-4">
          <Col>
            <Card>
              <Card.Img variant="top" src="/assets/th (7).jpeg" />
              <Card.Body>
                <Card.Title>Muhammad Rashid Mukhtar</Card.Title>
                <Card.Text>
                  Assitance Professor
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Img variant="top" src="/assets/th (7).jpeg" />
              <Card.Body>
                <Card.Title>Muhammad Rashid Mukhtar</Card.Title>
                <Card.Text>
                  Assitance Professor
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Img variant="top" src="/assets/th (7).jpeg" />
              <Card.Body>
                <Card.Title>Muhammad Rashid Mukhtar</Card.Title>
                <Card.Text>
                  Assitance Professor
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card>
              <Card.Img variant="top" src="/assets/drsajid_p.jpg" />
              <Card.Body>
                <Card.Title>Card 4</Card.Title>
                <Card.Text>
                  This is the content of Card 4.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Img variant="top" src="/assets/drsajid_p.jpg" />
              <Card.Body>
                <Card.Title>Card 5</Card.Title>
                <Card.Text>
                  This is the content of Card 5.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Img variant="top" src="/assets/drsajid_p.jpg" />
              <Card.Body>
                <Card.Title>Card 6</Card.Title>
                <Card.Text>
                  This is the content of Card 6.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
    </div>
    );
  }
  
  export default Cards;
  




 
