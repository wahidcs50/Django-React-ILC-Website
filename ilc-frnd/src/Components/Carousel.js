// Carousel.js
import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css'; 

const Carouselslider = () => {
  return (
    <div className="container-fluid p-0">
        <Carousel>
          <Carousel.Item interval={1000}>
              <img
                  className="d-block w-100"
                  src='/assets/slide-3.jpg'
                  alt="First slide"
              />
          </Carousel.Item>
          <Carousel.Item interval={500}>
              <img
                  className="d-block w-100"
                  src='/assets/use-one.jpeg'
                  alt="Second slide"
              />
          </Carousel.Item>
          <Carousel.Item>
              <img
                  className="d-block w-100"
                  src='/assets/use-two.jpeg'
                  alt="Third slide"
              />
          </Carousel.Item>
        </Carousel>
    </div>
  );
}

export default Carouselslider;

