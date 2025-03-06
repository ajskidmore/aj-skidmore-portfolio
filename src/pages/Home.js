import React, { useEffect } from 'react';
import Hero from '../components/sections/Hero';
import styled from 'styled-components';

// Updated container styling to eliminate gaps
const HomeContainer = styled.div`
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  
  /* Remove any default margins/padding */
  margin: 0;
  padding: 0;
`;

// Make Hero section fill available space and connect directly to footer
const StyledHero = styled(Hero)`
  flex: 1;
  margin-bottom: 0; /* Ensure no margin at bottom */
  padding-bottom: 0; /* Ensure no padding at bottom */
  
  /* Make hero section taller to fill the space */
  & > section {
    min-height: 100vh; /* Make hero take full viewport height */
  }
`;

const Home = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <HomeContainer>
      <StyledHero />
      {/* The footer would be included in your App.js or layout component */}
    </HomeContainer>
  );
};

export default Home;