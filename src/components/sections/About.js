import React, { useContext } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaCode, FaDesktop, FaMobileAlt, FaBriefcase, FaGraduationCap } from 'react-icons/fa';
import ThemeBackground from '../theme/ThemeBackground';
import { ThemeContext } from '../../contexts/ThemeContext';

// Wrap the section with ThemeBackground
const StyledAboutSection = styled(ThemeBackground)`
  padding: 7rem 0;
  position: relative;
  overflow: hidden;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
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

const AboutGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  
  @media (min-width: 992px) {
    grid-template-columns: 5fr 7fr;
    align-items: start;
  }
`;

const AboutImageWrapper = styled(motion.div)`
  position: relative;
  border-radius: var(--border-radius);
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  aspect-ratio: 1 / 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--card-bg);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: var(--border-radius);
  }
  
  &::after {
    content: '';
    position: absolute;
    width: 150px;
    height: 150px;
    border: 15px solid var(--primary-color);
    border-radius: 50%;
    bottom: -75px;
    right: -75px;
    opacity: 0.1;
    z-index: -1;
  }
`;

const AboutImage = styled.div`
  width: 70%;
  height: 70%;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
  border: 4px solid var(--primary-color);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }
  
  &:hover img {
    transform: scale(1.05);
  }
`;

const Experience = styled.div`
  position: absolute;
  bottom: 30px;
  left: 30px;
  background: var(--primary-color);
  color: white;
  padding: 1rem;
  border-radius: var(--border-radius);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  
  span {
    display: block;
    text-align: center;
  }
  
  .years {
    font-size: 2.5rem;
    font-weight: 700;
    line-height: 1;
  }
  
  .text {
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
`;

const AboutContent = styled(motion.div)`
  display: flex;
  flex-direction: column;
`;

const AboutTitle = styled.h3`
  margin-bottom: 1.5rem;
  font-size: 2rem;
  position: relative;
  color: var(--secondary-color);
  
  span {
    color: var(--primary-color);
  }
`;

const AboutText = styled.p`
  margin-bottom: 1.5rem;
  line-height: 1.8;
  color: var(--text-color);
  font-size: 1.1rem;
`;

const HightlightText = styled.span`
  color: var(--primary-color);
  font-weight: 600;
`;

const FocusAreas = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
`;

const FocusArea = styled(motion.div)`
  padding: 1.5rem;
  background-color: var(--card-bg);
  border-radius: var(--border-radius);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease, background-color 0.5s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  }
`;

const FocusAreaIcon = styled.div`
  font-size: 2rem;
  color: var(--primary-color);
  margin-bottom: 1rem;
`;

const FocusAreaTitle = styled.h4`
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: var(--secondary-color);
`;

const FocusAreaText = styled.p`
  font-size: 0.95rem;
  color: var(--text-color);
`;

// New components for Experience & Education sections
const ExperienceSection = styled(motion.div)`
  margin-top: 4rem;
`;

const ExperienceTitle = styled.h3`
  font-size: 1.75rem;
  margin-bottom: 1.5rem;
  color: var(--secondary-color);
  position: relative;
  display: inline-block;
  padding-bottom: 0.5rem;
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 40px;
    height: 3px;
    background: linear-gradient(to right, var(--secondary-color), var(--primary-color));
  }
`;

const TimelineContainer = styled.div`
  position: relative;
  
  &:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 2px;
    height: 100%;
    background-color: var(--primary-color-light);
    opacity: 0.5;
  }
`;

const TimelineItem = styled(motion.div)`
  position: relative;
  padding-left: 2rem;
  padding-bottom: 2rem;
  
  &:last-child {
    padding-bottom: 0;
  }
  
  &:before {
    content: '';
    position: absolute;
    left: -6px;
    top: 0;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background-color: var(--primary-color);
  }
`;

const TimelinePeriod = styled.div`
  display: inline-block;
  padding: 0.3rem 0.8rem;
  background-color: var(--primary-color-light);
  color: var(--primary-color);
  border-radius: 20px;
  font-size: 0.85rem;
  margin-bottom: 0.5rem;
`;

const TimelineTitle = styled.h4`
  font-size: 1.2rem;
  margin-bottom: 0.25rem;
  color: var(--secondary-color);
`;

const TimelineSubtitle = styled.h5`
  font-size: 1rem;
  margin-bottom: 0.5rem;
  color: var(--primary-color);
  font-weight: 500;
`;

const TimelineText = styled.p`
  font-size: 0.95rem;
  color: var(--text-color);
  line-height: 1.6;
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
const fadeInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
};

const fadeInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
};

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 }
};

const About = () => {
  const { isLight } = useContext(ThemeContext);
  
  return (
    <StyledAboutSection id="about">
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
            <SectionTitle>About Me</SectionTitle>
            <SectionSubtitle>Get to know my background and what drives me</SectionSubtitle>
          </motion.div>
        </SectionHeader>
        
        <AboutGrid>
          <AboutImageWrapper
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInLeft}
          >
            <AboutImage>
              <img 
                src="assets/images/A.J. Skidmore Headshot.jpg" 
                alt="AJ Skidmore" 
                onError={(e) => {
                  e.target.src = "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"; // Modern professional avatar
                }}
              />
            </AboutImage>
            <Experience>
              <span className="years">3+</span>
              <span className="text">Years Exp</span>
            </Experience>
          </AboutImageWrapper>
          
          <AboutContent
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInRight}
          >
            <AboutTitle>
              Software & UX<span> Engineer</span>
            </AboutTitle>
            
            <AboutText>
              I'm a full-stack software engineer with <HightlightText>3+ years of experience</HightlightText> building 
              scalable web applications and user-centric interfaces. I specialize in React, Node.js, LAMP stack, 
              and cloud platforms with a proven track record of delivering  
              <HightlightText> 300+ public-facing projects</HightlightText> across healthcare, government, education, and retail sectors.
            </AboutText>
            
            <AboutText>
              What sets me apart is my unique background in <HightlightText>Experience Architecture </HightlightText> 
               from Michigan State University, combining UX design, user research, and technical development. This 
              interdisciplinary foundation allows me to <HightlightText>bridge the gap between design and 
              development</HightlightText>, ensuring applications are both technically robust and user-friendly. I was trained in Web Development and UX Design early in my career. They remain strong focus areas.
            </AboutText>
            

            
            <FocusAreas>
              <FocusArea
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={fadeInUp}
                transition={{ delay: 0.1 }}
              >
                <FocusAreaIcon>
                  <FaCode />
                </FocusAreaIcon>
                <FocusAreaTitle>Web Development</FocusAreaTitle>
                <FocusAreaText>
                  Building responsive, performant web applications with modern frameworks and best practices.
                </FocusAreaText>
              </FocusArea>
              
              <FocusArea
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={fadeInUp}
                transition={{ delay: 0.2 }}
              >
                <FocusAreaIcon>
                  <FaDesktop />
                </FocusAreaIcon>
                <FocusAreaTitle>UX Design</FocusAreaTitle>
                <FocusAreaText>
                  Creating intuitive interfaces with a focus on user experience, accessibility, and design systems.
                </FocusAreaText>
              </FocusArea>
              
              
            </FocusAreas>
          </AboutContent>
        </AboutGrid>
        
        {/* Experience Section */}
        <ExperienceSection
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true, amount: 0.1 }}
        >
          <ExperienceTitle>
            <FocusAreaIcon style={{ display: 'inline-block', marginRight: '10px', fontSize: '1.5rem' }}>
              <FaBriefcase />
            </FocusAreaIcon>
            Work Experience
          </ExperienceTitle>
          
          <TimelineContainer>
            <TimelineItem
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true, amount: 0.1 }}
            >
              <TimelinePeriod>October 2024 - Present</TimelinePeriod>
              <TimelineTitle>Software Engineer, Co-founder</TimelineTitle>
              <TimelineSubtitle>Eudo • Salt Lake City, UT (Remote) • Part-Time</TimelineSubtitle>
              <TimelineText>
                • Architected HR analytics dashboard using React, Node.js, and Azure, implementing proprietary framework 
                to measure employee satisfaction and predict turnover risk
              </TimelineText>
              <TimelineText>
                • Built interactive data visualization components in React, transforming complex HR metrics into 
                actionable insights for management decision-making
              </TimelineText>
              <TimelineText>
                • Designed full-stack architecture connecting real-time frontend interfaces with robust backend 
                data processing systems
              </TimelineText>
            </TimelineItem>
            
            <TimelineItem
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true, amount: 0.1 }}
            >
              <TimelinePeriod>July 2024 - Present</TimelinePeriod>
              <TimelineTitle>Software Engineer</TimelineTitle>
              <TimelineSubtitle>eFilmHub • Salt Lake City, UT (Remote) • Part-Time</TimelineSubtitle>
              <TimelineText>
                • Developed comprehensive film industry social platform combining IMDb and Backstage functionality 
                using React, Node.js, and Google Cloud Services
              </TimelineText>
              <TimelineText>
                • Engineered responsive frontend components for talent discovery and industry networking, 
                optimizing user experience across devices
              </TimelineText>
              <TimelineText>
                • Implemented scalable cloud architecture with GCP Cloud Storage and Real-time Database 
                to support user growth
              </TimelineText>
            </TimelineItem>
            
            <TimelineItem
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true, amount: 0.1 }}
            >
              <TimelinePeriod>January 2024 - Present</TimelinePeriod>
              <TimelineTitle>UX Engineer</TimelineTitle>
              <TimelineSubtitle>Shumaker Technology Group • Salt Lake City, UT (Remote) • Full-Time</TimelineSubtitle>
              <TimelineText>
                • Designed and developed user-centric interfaces for 50+ client websites serving thousands of monthly 
                users across healthcare, government, education, and retail
              </TimelineText>
              <TimelineText>
                • Collaborated with cross-functional teams in agile environment to deliver accessible, engaging web 
                solutions meeting client requirements and business objectives
              </TimelineText>
              <TimelineText>
                • Applied UX principles and accessibility standards to ensure optimal user experience and compliance
              </TimelineText>
            </TimelineItem>
            
            <TimelineItem
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true, amount: 0.1 }}
            >
              <TimelinePeriod>August 2022 - January 2024</TimelinePeriod>
              <TimelineTitle>Web Developer</TimelineTitle>
              <TimelineSubtitle>Shumaker Technology Group • Lansing, MI • Part-Time</TimelineSubtitle>
              <TimelineText>
                • Developed and deployed responsive websites using HTML5, CSS3, JavaScript, and modern frameworks, 
                creating engaging user experiences for diverse client base
              </TimelineText>
              <TimelineText>
                • Optimized complex web applications using PHP and SQL for platforms serving 5,000+ active users
              </TimelineText>
              <TimelineText>
                • Maintained and enhanced 300+ public web projects through security patches, updates, 
                and performance optimizations
              </TimelineText>
            </TimelineItem>
          </TimelineContainer>
        </ExperienceSection>
        
        {/* Education Section */}
        <ExperienceSection
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true, amount: 0.1 }}
        >
          <ExperienceTitle>
            <FocusAreaIcon style={{ display: 'inline-block', marginRight: '10px', fontSize: '1.5rem' }}>
              <FaGraduationCap />
            </FocusAreaIcon>
            Education
          </ExperienceTitle>
          
          <TimelineContainer>
            <TimelineItem
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true, amount: 0.1 }}
            >
              <TimelinePeriod>December 2023</TimelinePeriod>
              <TimelineTitle>Bachelors in Experience Architecture</TimelineTitle>
              <TimelineSubtitle>Michigan State University</TimelineSubtitle>
              <TimelineText>
                • Interdisciplinary major combining web development, UX design, and user research
              </TimelineText>
            </TimelineItem>
          </TimelineContainer>
        </ExperienceSection>
      </div>
    </StyledAboutSection>
  );
};

export default About;