import React, { useContext } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { ThemeContext } from '../../contexts/ThemeContext';

const Nav = styled.nav`
  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    right: 0;
    width: 75%;
    max-width: 300px;
    height: 100vh;
    background-color: ${props => props.isLight ? 'white' : '#1a1a1a'};
    box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
    padding: 5rem 2rem 2rem;
    transform: ${props => props.mobileMenuOpen ? 'translateX(0)' : 'translateX(100%)'};
    transition: transform 0.3s ease-in-out, background-color 0.5s ease;
    display: flex;
    flex-direction: column;
    z-index: 99;
  }
`;

const MobileNavBackdrop = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: ${props => props.mobileMenuOpen ? 'block' : 'none'};
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 98;
  }
`;

const NavList = styled.ul`
  display: flex;
  list-style: none;
  gap: 2rem;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    gap: 1.5rem;
  }
`;

const NavItem = styled.li`
  position: relative;
  
  @media (max-width: 768px) {
    margin: 0;
  }
`;

const NavItemLink = styled(NavLink)`
  color: ${props => props.isLight ? 'var(--text-color)' : 'white'};
  font-weight: 500;
  transition: all 0.3s ease;
  padding: 0.5rem;
  position: relative;
  font-size: 1.1rem;
  text-decoration: none;
  
  &:hover {
    color: var(--primary-color);
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background-color: var(--primary-color);
    transition: width 0.3s ease;
  }
  
  &:hover::after,
  &.active::after {
    width: 100%;
  }
  
  @media (max-width: 768px) {
    display: block;
    padding: 0.75rem 0;
    font-size: 1.25rem;
    color: ${props => props.isLight ? 'var(--text-color)' : 'rgba(255, 255, 255, 0.9)'};
  }
`;

const ContactButton = styled(NavLink)`
  display: inline-block;
  padding: 0.6rem 1.5rem;
  background-color: var(--primary-color);
  color: white;
  border-radius: var(--border-radius);
  font-weight: 500;
  transition: all 0.3s ease;
  text-decoration: none;
  
  &:hover {
    background-color: var(--accent-color);
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  @media (max-width: 768px) {
    margin-top: 1.5rem;
    width: 100%;
    text-align: center;
    padding: 0.75rem 1.5rem;
  }
`;

// Framer motion variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
};

const Navigation = ({ mobileMenuOpen, toggleMobileMenu }) => {
  const location = useLocation();
  const { isLight } = useContext(ThemeContext);
  
  // Function to handle navigation on mobile
  const handleNavClick = () => {
    if (window.innerWidth <= 768) {
      toggleMobileMenu();
    }
  };

  return (
    <>
      <MobileNavBackdrop mobileMenuOpen={mobileMenuOpen} onClick={toggleMobileMenu} />
      <Nav mobileMenuOpen={mobileMenuOpen} isLight={isLight}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <NavList>
            <motion.div variants={itemVariants}>
              <NavItem>
                <NavItemLink 
                  to="/" 
                  onClick={handleNavClick}
                  isLight={isLight}
                  className={({ isActive }) => isActive ? 'active' : ''}
                >
                  Home
                </NavItemLink>
              </NavItem>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <NavItem>
                <NavItemLink 
                  to="/about" 
                  onClick={handleNavClick}
                  isLight={isLight}
                  className={({ isActive }) => isActive ? 'active' : ''}
                >
                  About
                </NavItemLink>
              </NavItem>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <NavItem>
                <NavItemLink 
                  to="/skills" 
                  onClick={handleNavClick}
                  isLight={isLight}
                  className={({ isActive }) => isActive ? 'active' : ''}
                >
                  Skills
                </NavItemLink>
              </NavItem>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <NavItem>
                <NavItemLink 
                  to="/projects" 
                  onClick={handleNavClick}
                  isLight={isLight}
                  className={({ isActive }) => isActive ? 'active' : ''}
                >
                  Projects
                </NavItemLink>
              </NavItem>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <NavItem>
                <ContactButton 
                  to="/contact"
                  onClick={handleNavClick}
                  className={({ isActive }) => isActive ? 'active' : ''}
                >
                  Contact
                </ContactButton>
              </NavItem>
            </motion.div>
          </NavList>
        </motion.div>
      </Nav>
    </>
  );
};

export default Navigation;