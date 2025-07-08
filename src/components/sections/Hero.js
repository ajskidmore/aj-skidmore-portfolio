import React, { useEffect, useState, useRef, useContext } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
import { ThemeContext } from '../../contexts/ThemeContext';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

// Create CSS variables for consistent timing
const StyledRoot = styled.div`
  --transition-duration: 0.5s; // Changed from 2s for faster toggle response
  --transition-timing: ease-in-out;
  --dark-bg: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  --light-bg: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
`;

const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
`;

// We'll use two separate layers for dark and light themes
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

const HeroBackground = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  opacity: 0.04;
  z-index: 3;
  
  svg {
    position: absolute;
    width: 100%;
    height: 100%;
    color: ${props => props.isLight ? '#000' : '#fff'};
    transition: color var(--transition-duration) var(--transition-timing);
  }
`;

const HeroContent = styled.div`
  z-index: 4;
  max-width: 50%;
  position: relative;

  @media (max-width: 992px) {
    max-width: 100%;
  }
`;

const HeroGreeting = styled(motion.p)`
  display: inline-block;
  background-color: ${props => props.isLight 
    ? 'rgba(59, 130, 246, 0.1)'
    : 'rgba(255, 255, 255, 0.1)'};
  color: ${props => props.isLight ? 'var(--primary-color)' : 'white'};
  padding: 0.5rem 1rem;
  border-radius: 30px;
  font-weight: 500;
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
  transition: all var(--transition-duration) var(--transition-timing);
  @media (max-width: 768px) {
    margin-top: 8rem; /* Add top margin for mobile devices */
  }
`;

const HeroTitle = styled(motion.h1)`
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1.25rem;
  line-height: 1.2;
  color: ${props => props.isLight 
    ? 'transparent' 
    : 'white'};
  background: ${props => props.isLight 
    ? 'linear-gradient(to right, var(--secondary-color), var(--primary-color))'
    : 'none'};
  -webkit-background-clip: ${props => props.isLight ? 'text' : 'none'};
  background-clip: ${props => props.isLight ? 'text' : 'none'};
  transition: all var(--transition-duration) var(--transition-timing);
  
  @media (min-width: 768px) {
    font-size: 4.5rem;
  }
`;

const HeroSubtitle = styled(motion.h2)`
  font-size: 1.5rem;
  font-weight: 400;
  color: ${props => props.isLight ? 'var(--text-color)' : 'rgba(255, 255, 255, 0.9)'};
  margin-bottom: 2rem;
  line-height: 1.5;
  max-width: 650px;
  transition: color var(--transition-duration) var(--transition-timing);
  
  @media (min-width: 768px) {
    font-size: 1.75rem;
  }
`;

const CTAContainer = styled(motion.div)`
  display: flex;
  gap: 1.5rem;
  align-items: center;
  flex-wrap: wrap;
`;

// Modified CTA components to use React Router's Link
const PrimaryCTA = styled(Link)`
  display: inline-flex;
  align-items: center;
  padding: 0.875rem 1.75rem;
  background-color: var(--primary-color);
  color: white;
  border-radius: var(--border-radius);
  font-weight: 600;
  font-size: 1.125rem;
  box-shadow: 0 4px 14px rgba(0, 118, 255, 0.25);
  transition: all 0.3s ease;
  text-decoration: none;
  
  svg {
    margin-left: 0.5rem;
    transition: transform 0.3s ease;
  }
  
  &:hover {
    background-color: var(--accent-color);
    color: white;
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(0, 118, 255, 0.35);
    
    svg {
      transform: translateX(3px);
    }
  }
`;

const SecondaryCTA = styled(Link)`
  display: inline-flex;
  align-items: center;
  padding: .875rem 1.75rem;
  background-color: transparent;
  color: ${props => props.isLight ? 'var(--secondary-color)' : 'white'};
  border: 2px solid ${props => props.isLight ? 'var(--secondary-color)' : 'white'};
  border-radius: var(--border-radius);
  font-weight: 600;
  font-size: 1.125rem;
  transition: all var(--transition-duration) var(--transition-timing);
  text-decoration: none;
  
  &:hover {
    background-color: ${props => props.isLight ? 'var(--secondary-color)' : 'rgba(255, 255, 255, 0.1)'};
    color: ${props => props.isLight ? 'white' : 'white'};
    transform: translateY(-3px);
  }
`;

// Fallback button styles for non-React Router environments
const PrimaryCTAFallback = styled.a`
  display: inline-flex;
  align-items: center;
  padding: 0.875rem 1.75rem;
  background-color: var(--primary-color);
  color: white;
  border-radius: var(--border-radius);
  font-weight: 600;
  font-size: 1.125rem;
  box-shadow: 0 4px 14px rgba(0, 118, 255, 0.25);
  transition: all 0.3s ease;
  text-decoration: none;
  
  svg {
    margin-left: 0.5rem;
    transition: transform 0.3s ease;
  }
  
  &:hover {
    background-color: var(--accent-color);
    color: white;
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(0, 118, 255, 0.35);
    
    svg {
      transform: translateX(3px);
    }
  }
`;

const SecondaryCTAFallback = styled.a`
  display: inline-flex;
  align-items: center;
  padding: .875rem 1.75rem;
  background-color: transparent;
  color: ${props => props.isLight ? 'var(--secondary-color)' : 'white'};
  border: 2px solid ${props => props.isLight ? 'var(--secondary-color)' : 'white'};
  border-radius: var(--border-radius);
  font-weight: 600;
  font-size: 1.125rem;
  transition: all var(--transition-duration) var(--transition-timing);
  text-decoration: none;
  
  &:hover {
    background-color: ${props => props.isLight ? 'var(--secondary-color)' : 'rgba(255, 255, 255, 0.1)'};
    color: ${props => props.isLight ? 'white' : 'white'};
    transform: translateY(-3px);
  }
`;

const ComputerContainer = styled(motion.div)`
  position: absolute;
  top: 30%;
  right: 5%;
  transform: translateY(-50%);
  width: 35%;
  z-index: 5;
  
  @media (max-width: 992px) {
    display: none;
  }
`;

const ComputerImage = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 75%; /* 4:3 aspect ratio */
  background: #1a1a1a;
  border-radius: 10px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 25px;
    background: #2d2d2d;
    border-radius: 10px 10px 0 0;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 8px;
    left: 10px;
    width: 50px;
    height: 10px;
    display: flex;
    align-items: center;
  }
`;

const ComputerScreen = styled.div`
  position: absolute;
  top: 25px;
  left: 10px;
  right: 10px;
  bottom: 10px;
  overflow: hidden;
  border-radius: 3px;
`;

// Two layers for computer screen background
const DarkScreenLayer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
  opacity: ${props => props.isActive ? 1 : 0};
  transition: opacity var(--transition-duration) var(--transition-timing);
  z-index: 1;
`;

const LightScreenLayer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
  opacity: ${props => props.isActive ? 1 : 0};
  transition: opacity var(--transition-duration) var(--transition-timing);
  z-index: 2;
`;

const ScreenContent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 20px;
  font-family: monospace;
  color: ${props => props.isLight ? '#3b82f6' : '#4ade80'};
  font-size: 14px;
  overflow: hidden;
  transition: color var(--transition-duration) var(--transition-timing);
  z-index: 3;
`;

const CodeLine = styled.div`
  margin-bottom: 8px;
  white-space: nowrap;
  opacity: ${props => props.active ? 1 : 0.6};
`;

const Cursor = styled(motion.div)`
  position: absolute;
  width: 10px;
  height: 10px;
  background: ${props => props.isLight ? 'rgba(59, 130, 246, 0.8)' : 'rgba(255, 255, 255, 0.8)'};
  border-radius: 50%;
  z-index: 5;
  transition: background var(--transition-duration) var(--transition-timing);
`;

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

const Hero = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: 50, y: 50 });
  const screenRef = useRef(null);
  const [activeCodeLine, setActiveCodeLine] = useState(0);
  const { isLight } = useContext(ThemeContext);
  const [useReactRouter, setUseReactRouter] = useState(true);
  
  // Code lines to display in the computer
  const codeLines = [
    "// Hello World!",
    "function createPortfolio() {",
    "  const skills = ['JavaScript', 'React', 'UX Design'];",
    "  const passion = 'Building amazing user experiences';",
    "  ",
    "  return {",
    "    name: 'A.J. Skidmore',",
    "    role: 'Software & UX Engineer',",
    "    contact: 'hello@ajskidmore.com'",
    "  };",
    "}",
    "",
    "// Let's build something awesome together!"
  ];
  
  useEffect(() => {
    // Check if React Router is available
    try {
      // This will throw an error if we're not in a React Router context
      const reactRouterAvailable = !!window.__REACT_ROUTER__ || 
                                   (typeof require === 'function' && require('react-router-dom'));
      setUseReactRouter(true);
    } catch (e) {
      setUseReactRouter(false);
    }
    
    // Cycle through code lines
    const interval = setInterval(() => {
      setActiveCodeLine(prev => (prev + 1) % codeLines.length);
    }, 2000);
    
    return () => clearInterval(interval);
  }, [codeLines.length]);
  
  useEffect(() => {
    if (!screenRef.current) return;
    
    // Random movement for the cursor within the computer screen
    const moveInterval = setInterval(() => {
      // Get random position within the screen boundaries
      const randomX = Math.random() * 90; // percent
      const randomY = Math.random() * 80; // percent
      
      setCursorPosition({
        x: randomX,
        y: randomY
      });
    }, 3000);
    
    return () => clearInterval(moveInterval);
  }, []);
  
  return (
    <StyledRoot>
      <HeroSection id="home">
        {/* Layered backgrounds for smooth transition */}
        <DarkLayer isActive={!isLight} />
        <LightLayer isActive={isLight} />
        
        <HeroBackground isLight={isLight}>
          <svg viewBox="0 0 1440 800" preserveAspectRatio="none">
            <path
              fill="currentColor"
              d="M0,224L48,213.3C96,203,192,181,288,197.3C384,213,480,267,576,293.3C672,320,768,320,864,266.7C960,213,1056,107,1152,96C1248,85,1344,171,1392,213.3L1440,256L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
            ></path>
          </svg>
        </HeroBackground>

        <div className="container">
          <HeroContent>
            <HeroGreeting
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              isLight={isLight}
            >
              👋 Hi! I'm A.J. Skidmore
            </HeroGreeting>
            
            <HeroTitle
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              transition={{ duration: 0.6, delay: 0.2 }}
              isLight={isLight}
            >
              Software & UX Engineer
            </HeroTitle>
            
            <HeroSubtitle
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              transition={{ duration: 0.6, delay: 0.3 }}
              isLight={isLight}
            >
              I create intuitive, user-centered digital experiences by bridging the gap between design and development.
            </HeroSubtitle>
            
            <CTAContainer
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {useReactRouter ? (
                <>
                  <PrimaryCTA to="/projects">
                    View My Work <FaArrowRight />
                  </PrimaryCTA>
                  <SecondaryCTA to="/contact" isLight={isLight}>
                    Get In Touch
                  </SecondaryCTA>
                </>
              ) : (
                <>
                  <PrimaryCTAFallback href="./projects">
                    View My Work <FaArrowRight />
                  </PrimaryCTAFallback>
                  <SecondaryCTAFallback href="./contact" isLight={isLight}>
                    Get In Touch
                  </SecondaryCTAFallback>
                </>
              )}
            </CTAContainer>
          </HeroContent>
        </div>
        
        <ComputerContainer
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <ComputerImage>
            <ComputerScreen>
              {/* Layered backgrounds for computer screen */}
              <DarkScreenLayer isActive={!isLight} />
              <LightScreenLayer isActive={isLight} />
              
              <ScreenContent ref={screenRef} isLight={isLight}>
                {codeLines.map((line, index) => (
                  <CodeLine 
                    key={index} 
                    active={index === activeCodeLine}
                  >
                    {line}
                  </CodeLine>
                ))}
                <Cursor 
                  animate={{
                    x: `${cursorPosition.x}%`,
                    y: `${cursorPosition.y}%`,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 50,
                    damping: 20
                  }}
                  isLight={isLight}
                />
              </ScreenContent>
            </ComputerScreen>
          </ComputerImage>
        </ComputerContainer>
      </HeroSection>
    </StyledRoot>
  );
};

export default Hero;