
import React from 'react';
import Header from '../Components/Header'
import Carouselslider from '../Components/Carousel';
import Cards from '../Components/Cards';
import AdvancedFooter from '../Components/Footer';
const HomePage = () => {
  return (
    <div>
      <Header/>
      <Carouselslider/>
      <Cards/>
      <AdvancedFooter/>
    </div>
  );
}

export default HomePage;
