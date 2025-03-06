import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';
import Navigation from './Navigation';
import ThemeToggle from '../ui/ThemeToggle';
import { ThemeContext } from '../../contexts/ThemeContext';

// Root element with CSS variables
const StyledRoot = styled.div`
  --transition-duration: 0.5s; // Changed from 2s for faster toggle response
  --transition-timing: ease-in-out;
`;

// Container with two background layers
const HeaderContainer = styled.header`
  padding: 1.25rem 0;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  backdrop-filter: blur(10px);
`;

// Two layers for dark/light mode transitions
const DarkLayer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(17, 24, 39, 0.95);
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
  background-color: rgba(255, 255, 255, 0.95);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  opacity: ${props => props.isActive ? 1 : 0};
  transition: opacity var(--transition-duration) var(--transition-timing);
  z-index: 2;
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  z-index: 3;
`;

const LogoContainer = styled(motion.div)`
  display: flex;
  align-items: center;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${props => props.isLight ? 'var(--secondary-color)' : 'white'};
  display: flex;
  align-items: center;
  transition: color var(--transition-duration) var(--transition-timing);
  
  &:hover {
    color: var(--primary-color);
  }
`;

const LogoHighlight = styled.span`
  color: var(--primary-color);
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${props => props.isLight ? 'var(--secondary-color)' : 'white'};
  font-size: 1.75rem;
  cursor: pointer;
  transition: color var(--transition-duration) var(--transition-timing);
  
  &:hover {
    color: var(--primary-color);
  }
  
  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const ActionContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isLight } = useContext(ThemeContext);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <StyledRoot>
      <HeaderContainer>
        {/* Layered backgrounds for smooth transition */}
        <DarkLayer isActive={!isLight} />
        <LightLayer isActive={isLight} />
        
        <div className="container">
          <HeaderContent>
            <LogoContainer
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Logo to="/" isLight={isLight}>
                <LogoHighlight>A.J.</LogoHighlight> Skidmore
              </Logo>
            </LogoContainer>
            
            <ActionContainer>
              <ThemeToggle />
              
              <MobileMenuButton 
                onClick={toggleMobileMenu} 
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                isLight={isLight}
              >
                {mobileMenuOpen ? <FiX /> : <FiMenu />}
              </MobileMenuButton>
            </ActionContainer>
            
            <Navigation 
              mobileMenuOpen={mobileMenuOpen} 
              toggleMobileMenu={toggleMobileMenu} 
              isLight={isLight} 
            />
          </HeaderContent>
        </div>
      </HeaderContainer>
    </StyledRoot>
  );
};

export default Header;