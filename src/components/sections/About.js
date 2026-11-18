import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaCode, FaDesktop, FaBriefcase, FaGraduationCap } from 'react-icons/fa';
import ThemeBackground from '../theme/ThemeBackground';
import useTypewriter from '../../hooks/useTypewriter';
import { featuredProjects } from '../../data/projects';

// Wrap the section with ThemeBackground
const StyledAboutSection = styled(ThemeBackground)`
  padding: 7rem 0;
  position: relative;
  overflow: hidden;

  @keyframes blink {
    0%, 50% {
      border-color: transparent;
    }
    50%, 100% {
      border-color: currentColor;
    }
  }
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const SectionTitle = styled.h1`
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
  background: var(--primary-fill);
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

const AboutTitle = styled.h2`
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

const FocusAreaTitle = styled.h3`
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

const ExperienceTitle = styled.h2`
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
    background-color: var(--primary-fill);
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

const TimelineTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.25rem;
  color: var(--secondary-color);
`;

const TimelineSubtitle = styled.p`
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

const WorkGroupTitle = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  color: var(--secondary-color);
  margin: 1.25rem 0 0.5rem;
`;

const WorkList = styled.ul`
  padding-left: 1.25rem;

  li {
    font-size: 0.95rem;
    color: var(--text-color);
    line-height: 1.6;
    margin-bottom: 0.4rem;
  }
`;

const ProjectLink = styled.span`
  color: var(--primary-color);
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    text-decoration: underline;
  }
`;

const CaseStudyLink = styled(Link)`
  color: var(--primary-color);
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    text-decoration: underline;
    color: var(--accent-color);
  }
`;

const TimelineNote = styled.p`
  font-size: 0.78rem;
  color: var(--text-color);
  opacity: 0.85;
  margin-top: 0.75rem;
  font-style: italic;
`;

const DecorativeCircle = styled.div`
  position: absolute;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: linear-gradient(to right, var(--primary-fill), var(--accent-fill));
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
  // About page shows three featured projects, TravelCare+ first.
  // (The Projects page still shows all five.)
  const aboutProjects = ['travelcare', 'efilmhub', 'eudo']
    .map((id) => featuredProjects.find((p) => p.id === id))
    .filter(Boolean);

  // Types once and stops (no endless motion, WCAG 2.2.2)
  const displayedTitle = useTypewriter(['Full-Stack Engineer & UX Designer'], { loop: false });

  return (
    <StyledAboutSection id="about">
      <DecorativeCircle className="top-left" aria-hidden="true" />
      <DecorativeCircle className="bottom-right" aria-hidden="true" />
      
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
                src="/assets/images/A.J. Skidmore Headshot.jpg" 
                alt="A.J. Skidmore" 
                onError={(e) => {
                  e.target.src = "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"; // Modern professional avatar
                }}
              />
            </AboutImage>
            <Experience>
              <span className="years">4+</span>
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
              <span className="visually-hidden">Full-Stack Engineer and UX Designer</span>
              <span aria-hidden="true">{displayedTitle}</span>
            </AboutTitle>

            <AboutText>
              I'm a <HightlightText>full-stack engineer and UX designer</HightlightText> with a degree in <HightlightText>Experience Architecture</HightlightText> from Michigan State University, an interdisciplinary major combining UX &amp; UI design, user research and web development. Over <HightlightText>4+ years</HightlightText> I've delivered <HightlightText>30+ production sites and applications</HightlightText> for clients from small businesses to government, including recurring <HightlightText>WCAG accessibility audits</HightlightText>.
            </AboutText>
            <AboutText>
              Because I both design and build, I can take a product from <HightlightText>user research, wireframes and prototypes</HightlightText> through a design system to production code, and make sure the final product matches the design and stays accessible.
            </AboutText>
            <FocusAreas>
              <FocusArea
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={fadeInUp}
                transition={{ delay: 0.1 }}
              >
                <FocusAreaIcon aria-hidden="true">
                  <FaDesktop />
                </FocusAreaIcon>
                <FocusAreaTitle>UI/UX Design</FocusAreaTitle>
                <FocusAreaText>
                  Grounded in formal Experience Architecture training: user research and usability testing, wireframes and prototypes in Figma, design systems, and WCAG accessibility audits.
                </FocusAreaText>
              </FocusArea>


              <FocusArea
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={fadeInUp}
                transition={{ delay: 0.2 }}
              >
                <FocusAreaIcon aria-hidden="true">
                  <FaCode />
                </FocusAreaIcon>
                <FocusAreaTitle>Web Development</FocusAreaTitle>
                <FocusAreaText>
                  From WordPress and PHP for client sites to React, TypeScript, and Node.js for modern applications — delivering production sites for clients ranging from small businesses to government municipalities.
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
            <FocusAreaIcon aria-hidden="true" style={{ display: 'inline-block', marginRight: '10px', fontSize: '1.5rem' }}>
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
              <TimelinePeriod>August 2022 - Present</TimelinePeriod>
              <TimelineTitle>Full-Stack Engineer<sup style={{ fontSize: '0.7em', verticalAlign: 'super' }}>*</sup></TimelineTitle>
              <TimelineSubtitle>Shumaker Technology Group • Remote • Full-Time</TimelineSubtitle>
              <WorkGroupTitle>Design &amp; UX</WorkGroupTitle>
              <WorkList>
                <li>Designed and developed 30+ production websites and applications for public- and private-sector clients, including municipalities with 25,000+ residents, from stakeholder discovery and wireframes through launch.</li>
                <li>Translate stakeholder needs into user flows, wireframes and prototypes, then turn them into responsive, accessible interfaces.</li>
                <li>Designed the purchase and renewal experience for a Salesforce- and Stripe-integrated e-commerce platform serving a software company with $1M+ in funding.</li>
                <li>Helped create reusable design systems and component templates that speed up new builds and keep a consistent look across a 350+ site portfolio.</li>
                <li>Conduct recurring ADA and WCAG 2.1 AA audits of municipal sites by hand with screen readers such as NVDA, then guide remediation so public services are usable by residents with disabilities.</li>
              </WorkList>
              <WorkGroupTitle>Engineering &amp; Leadership</WorkGroupTitle>
              <WorkList>
                <li>Lead and give direction to a team of 5 developers across concurrent client projects, reviewing builds against designs and running code reviews and QA on production deliverables.</li>
                <li>Built the Salesforce CRM and Stripe payment integration for that e-commerce platform, along with its ongoing renewal invoicing and billing functionality.</li>
                <li>Manage 350+ WordPress sites, including coordinating a fleet-wide response to a critical Elementor Pro security vulnerability (CVSS 9.0), and handle server administration for client infrastructure.</li>
                <li>Serve as the primary technical escalation point for complex legacy codebases, including a large-scale e-commerce platform with thousands of SKUs inherited from a prior development team.</li>
              </WorkList>
              <TimelineNote>* Web Developer → Full-Stack Engineer → Lead Full-Stack Engineer</TimelineNote>
            </TimelineItem>
          </TimelineContainer>
        </ExperienceSection>

        {/* Featured Projects Section */}
        <ExperienceSection
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true, amount: 0.1 }}
        >
          <ExperienceTitle>
            <FocusAreaIcon aria-hidden="true" style={{ display: 'inline-block', marginRight: '10px', fontSize: '1.5rem' }}>
              <FaBriefcase />
            </FocusAreaIcon>
            Featured Projects
          </ExperienceTitle>

          <TimelineContainer>
            {aboutProjects.map((project, index) => (
              <TimelineItem
                key={project.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
                viewport={{ once: true, amount: 0.1 }}
              >
                <TimelineTitle>
                  <ProjectLink as={Link} to={`/projects/${project.id}`}>
                    {project.name}
                  </ProjectLink>
                </TimelineTitle>
                <TimelineText>{project.summary}</TimelineText>
                <TimelineText>
                  <CaseStudyLink to={`/projects/${project.id}`}>
                    View project<span className="visually-hidden">: {project.name}</span>
                  </CaseStudyLink>
                </TimelineText>
              </TimelineItem>
            ))}
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
            <FocusAreaIcon aria-hidden="true" style={{ display: 'inline-block', marginRight: '10px', fontSize: '1.5rem' }}>
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
              <TimelineTitle>Bachelor's in Experience Architecture</TimelineTitle>
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