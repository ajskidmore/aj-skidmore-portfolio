// src/components/sections/Contact.js
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  FaEnvelope, 
  FaPhone,
  FaLinkedinIn
} from 'react-icons/fa';
import ThemeBackground from '../theme/ThemeBackground';
import CompactContactForm from '../forms/CompactContactForm';

const StyledContactSection = styled(ThemeBackground)`
  padding: 7rem 0;
  position: relative;
  overflow: hidden;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const SectionTitle = styled.h2`
  margin-bottom: 1rem;
  position: relative;
  display: inline-block;
  padding-bottom: 1rem;
  font-size: 2.5rem;
  color: var(--secondary-color);
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 3px;
    background: linear-gradient(to right, var(--secondary-color), var(--primary-color));
  }
`;

const SectionSubtitle = styled.p`
  font-size: 1.25rem;
  max-width: 700px;
  margin: 0 auto;
  color: var(--text-color);
`;

const ContactCard = styled(motion.div)`
  max-width: 700px;
  margin: 0 auto;
  background-color: var(--card-bg);
  border-radius: var(--border-radius);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  position: relative;
`;

const ContactCardHeader = styled.div`
  background: linear-gradient(to right, var(--primary-color), var(--accent-color));
  color: white;
  padding: 2rem;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='rgba(255,255,255,0.05)' fill-rule='evenodd'/%3E%3C/svg%3E");
    opacity: 0.2;
  }
`;

const HeaderContent = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  position: relative;
  z-index: 2;
  
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const TitleSection = styled.div``;

const ContactTitle = styled.h3`
  font-size: 1.75rem;
  margin-bottom: 0.5rem;
  font-weight: 700;
  color: white;
`;

const ContactSubtitle = styled.p`
  font-size: 1rem;
  opacity: 0.9;
  color: white;
  margin-bottom: 0;
`;

const HeaderContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const HeaderContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: white;
  font-size: 0.9rem;
`;

const HeaderContactIcon = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 0.9rem;
  flex-shrink: 0;
`;

const HeaderContactText = styled.div`
  flex: 1;
`;

const HeaderContactLink = styled.a`
  color: white;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;


const ContactCardBody = styled.div`
  padding: 2.5rem;
`;


const DecorativeCircle = styled.div`
  position: absolute;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: linear-gradient(to right, var(--primary-color), var(--accent-color));
  opacity: 0.03;
  z-index: 0;
  
  &.top-left {
    top: -150px;
    left: -150px;
  }
  
  &.bottom-right {
    bottom: -150px;
    right: -150px;
  }
`;

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const Contact = () => {

  return (
    <StyledContactSection id="contact">
      <DecorativeCircle className="top-left" />
      <DecorativeCircle className="bottom-right" />
      
      <div className="container">
        <SectionHeader>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <SectionTitle>Get In Touch</SectionTitle>
            <SectionSubtitle>
              Feel free to reach out if you're looking for a developer, have a question, or just want to connect
            </SectionSubtitle>
          </motion.div>
        </SectionHeader>
        
        <ContactCard
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeIn}
        >
          <ContactCardHeader>
            <HeaderContent>
              <TitleSection>
                <ContactTitle>A.J. Skidmore</ContactTitle>
                <ContactSubtitle>Software & UX Engineer</ContactSubtitle>
              </TitleSection>
              
              <HeaderContactInfo>
                <HeaderContactItem>
                  <HeaderContactIcon>
                    <FaEnvelope />
                  </HeaderContactIcon>
                  <HeaderContactText>
                    <HeaderContactLink href="mailto:hello@ajskidmore.com">
                      hello@ajskidmore.com
                    </HeaderContactLink>
                  </HeaderContactText>
                </HeaderContactItem>
                
                <HeaderContactItem>
                  <HeaderContactIcon>
                    <FaPhone />
                  </HeaderContactIcon>
                  <HeaderContactText>
                    <HeaderContactLink href="tel:+15176685268">
                      (517) 668-5268
                    </HeaderContactLink>
                  </HeaderContactText>
                </HeaderContactItem>
                
                <HeaderContactItem>
                  <HeaderContactIcon>
                    <FaLinkedinIn />
                  </HeaderContactIcon>
                  <HeaderContactText>
                    <HeaderContactLink href="https://linkedin.com/in/aj-skidmore" target="_blank" rel="noopener noreferrer">
                      LinkedIn Profile
                    </HeaderContactLink>
                  </HeaderContactText>
                </HeaderContactItem>
                
              </HeaderContactInfo>
            </HeaderContent>
          </ContactCardHeader>
          
          <ContactCardBody>
            <CompactContactForm />
          </ContactCardBody>
        </ContactCard>
      </div>
    </StyledContactSection>
  );
};

export default Contact;