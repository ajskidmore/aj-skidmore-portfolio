import React, { useContext } from 'react';
import styled from 'styled-components';
import { ThemeContext } from '../../contexts/ThemeContext';

// Create styled layers similar to Hero.js
const Container = styled.div`
  position: relative;
  overflow: hidden;
  --transition-duration: 0.5s;
  --transition-timing: ease-in-out;
  --dark-bg: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  --light-bg: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
`;

const DarkLayer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--dark-bg);
  opacity: ${props => props.isActive ? 1 : 0};
  transition: opacity var(--transition-duration) var(--transition-timing);
  z-index: 1;
`;

const LightLayer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--light-bg);
  opacity: ${props => props.isActive ? 1 : 0};
  transition: opacity var(--transition-duration) var(--transition-timing);
  z-index: 2;
`;

// Content container with higher z-index
const ContentWrapper = styled.div`
  position: relative;
  z-index: 3;
`;

// Reusable ThemeBackground component
const ThemeBackground = ({ children, className }) => {
  const { isLight } = useContext(ThemeContext);
  
  return (
    <Container className={className}>
      {/* Layered backgrounds for smooth transition */}
      <DarkLayer isActive={!isLight} />
      <LightLayer isActive={isLight} />
      
      <ContentWrapper>
        {children}
      </ContentWrapper>
    </Container>
  );
};

export default ThemeBackground;