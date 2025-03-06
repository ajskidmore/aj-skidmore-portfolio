import React, { useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { 
  FaHeart, 
  FaGithub, 
  FaLinkedinIn, 
  FaEnvelope, 
  FaChevronUp, 
  FaMapMarkerAlt 
} from 'react-icons/fa';
import { ThemeContext } from '../../contexts/ThemeContext';
import ThemeBackground from '../theme/ThemeBackground';

// Using ThemeBackground as the base
const StyledFooterContainer = styled(ThemeBackground)`
  padding: 4rem 0 0;
  position: relative;
  z-index: 10; /* Adjusted z-index to be lower than the modal */
`;

const FooterTop = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
  position: relative;
  z-index: 5;
`;

const FooterColumn = styled.div``;

const FooterLogo = styled(Link)`
  display: inline-block;
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--secondary-color);
  margin-bottom: 1.25rem;
  transition: color 0.5s ease;
`;

const FooterLogoHighlight = styled.span`
  color: var(--primary-color);
`;

const FooterAbout = styled.p`
  margin-bottom: 1.5rem;
  line-height: 1.7;
  max-width: 300px;
  color: var(--text-color);
`;

const FooterTitle = styled.h4`
  font-size: 1.25rem;
  color: var(--secondary-color);
  margin-bottom: 1.5rem;
  position: relative;
  padding-bottom: 0.75rem;
  transition: color 0.5s ease;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 50px;
    height: 2px;
    background-color: var(--primary-color);
  }
`;

const FooterLinks = styled.ul`
  list-style: none;
`;

const FooterLink = styled.li`
  margin-bottom: 0.75rem;
  
  a {
    color: var(--text-color);
    transition: all 0.3s ease;
    display: inline-flex;
    align-items: center;
    
    &:hover {
      color: var(--primary-color);
      transform: translateX(5px);
    }
    
    svg {
      margin-right: 0.5rem;
      font-size: 0.75rem;
    }
  }
`;

const ContactItem = styled.div`
  margin-bottom: 1.25rem;
  display: flex;
  align-items: flex-start;
`;

const ContactIcon = styled.div`
  margin-right: 1rem;
  color: var(--primary-color);
`;

const ContactText = styled.p`
  color: var(--text-color);
  transition: color 0.5s ease;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${props => props.isLight ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.1)'};
  color: var(--secondary-color);
  font-size: 1.2rem;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: var(--primary-color);
    color: white;
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }
`;

const FooterBottom = styled.div`
  border-top: 1px solid ${props => props.isLight ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)'};
  padding: 2rem 0;
  transition: border-color 0.5s ease;
  position: relative;
  z-index: 5;
`;

const FooterBottomContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
`;

const Copyright = styled.p`
  font-size: 0.95rem;
  color: var(--text-color);
  
  a {
    color: var(--primary-color);
    font-weight: 600;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const MadeWith = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.95rem;
  color: var(--text-color);
  
  svg {
    color: #e74c3c;
    margin: 0 0.3rem;
    animation: heartBeat 1.5s infinite;
  }
  
  @keyframes heartBeat {
    0% { transform: scale(1); }
    14% { transform: scale(1.3); }
    28% { transform: scale(1); }
    42% { transform: scale(1.3); }
    70% { transform: scale(1); }
  }
`;

const BackToTop = styled.a`
  position: absolute;
  right: 30px;
  bottom: 50px;
  width: 45px;
  height: 45px;
  background-color: var(--primary-color);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  z-index: 10;
  
  &:hover {
    background-color: var(--accent-color);
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  }
`;

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { isLight } = useContext(ThemeContext);
  
  return (
    <StyledFooterContainer>
      <div className="container">
        <FooterTop>
          <FooterColumn>
            <FooterLogo to="/">
              <FooterLogoHighlight>A.J.</FooterLogoHighlight> Skidmore
            </FooterLogo>
            <FooterAbout>
              Software & UX Engineer focused on creating intuitive, 
              user-centered digital experiences that bridge the gap between design and development.
            </FooterAbout>
            <SocialLinks>
              <SocialLink 
                href="https://github.com/ajskidmore" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                isLight={isLight}
              >
                <FaGithub />
              </SocialLink>
              <SocialLink 
                href="https://linkedin.com/in/aj-skidmore" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                isLight={isLight}
              >
                <FaLinkedinIn />
              </SocialLink>
              <SocialLink 
                href="mailto:ajskidless@gmail.com"
                aria-label="Email Contact"
                isLight={isLight}
              >
                <FaEnvelope />
              </SocialLink>
            </SocialLinks>
          </FooterColumn>
          
          <FooterColumn>
            <FooterTitle>Quick Links</FooterTitle>
            <FooterLinks>
              <FooterLink>
                <a href="/#">Home</a>
              </FooterLink>
              <FooterLink>
                <a href="/about">About Me</a>
              </FooterLink>
              <FooterLink>
                <a href="/skills">My Skills</a>
              </FooterLink>
              <FooterLink>
                <a href="/projects">Projects</a>
              </FooterLink>
              <FooterLink>
                <a href="/contact">Contact</a>
              </FooterLink>
            </FooterLinks>
          </FooterColumn>
          
          <FooterColumn>
            <FooterTitle>Contact Info</FooterTitle>
            <ContactItem>
              <ContactIcon>
                <FaEnvelope />
              </ContactIcon>
              <ContactText>ajskidless@gmail.com</ContactText>
            </ContactItem>
            <ContactItem>
              <ContactIcon>
                <FaMapMarkerAlt />
              </ContactIcon>
              <ContactText>Salt Lake City, Utah</ContactText>
            </ContactItem>
          </FooterColumn>
        </FooterTop>
      </div>
      
      <FooterBottom isLight={isLight}>
        <div className="container">
          <FooterBottomContent>
            <Copyright>
              &copy; {currentYear} <a href="/">A.J. Skidmore</a>. All rights reserved.
            </Copyright>
            <MadeWith>
              Made with <FaHeart /> and React
            </MadeWith>
          </FooterBottomContent>
        </div>
      </FooterBottom>
      
      
    </StyledFooterContainer>
  );
};

export default Footer;