import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  SiReact, SiJavascript, SiHtml5, SiCss3, SiFirebase, 
  SiNodedotjs, SiGit, SiFigma, SiTypescript, SiWordpress,
  SiNextdotjs, SiPhp, SiSqlite, SiAmazonwebservices, SiFramer,
  SiPython, SiTensorflow,
  SiCloud66,
  SiGooglecloud, 
  SiKeras,
  SiScikitlearn
} from 'react-icons/si';
import { FaAccessibleIcon, FaUser, FaMobileAlt, FaPencilRuler, FaSitemap, FaArrowUp, FaBrain } from 'react-icons/fa';
import { ThemeContext } from '../../contexts/ThemeContext';
import ThemeBackground from '../theme/ThemeBackground';

const StyledSkillsSection = styled(ThemeBackground)`
  padding: 7rem 0;
  position: relative;
  overflow: hidden;
  
  /* Add scroll margin to section anchors */
  [id] {
    scroll-margin-top: 8rem;
  }
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
  transition: color 0.5s ease;
  
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

const SkillsContainer = styled.div`
  margin-bottom: 4rem;
`;

const SkillCategoryTitle = styled.h3`
  margin-bottom: 2rem;
  font-size: 1.5rem;
  text-align: center;
  color: var(--secondary-color);
  transition: color 0.5s ease;
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 2rem;
  max-width: 800px;
  margin: 0 auto;
  justify-content: center;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  }
`;

const SkillCard = styled(motion.div)`
  background-color: ${props => props.isLight ? 'white' : 'var(--card-bg)'};
  padding: 1.5rem;
  border-radius: var(--border-radius);
  box-shadow: 0 5px 15px rgba(0, 0, 0, ${props => props.isLight ? '0.05' : '0.2'});
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease, background-color 0.5s ease;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(to right, var(--primary-color), var(--accent-color));
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s ease;
  }
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, ${props => props.isLight ? '0.1' : '0.3'});
    
    &::before {
      transform: scaleX(1);
    }
  }
`;

const SkillIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
  color: var(--primary-color);
  
  svg {
    filter: drop-shadow(0 2px 5px rgba(0, 0, 0, 0.1));
  }
`;

const SkillName = styled.h4`
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: var(--secondary-color);
  transition: color 0.5s ease;
`;

const SkillLevel = styled.div`
  width: 100%;
  height: 0.5rem;
  background-color: ${props => props.isLight ? '#f1f1f1' : 'rgba(255, 255, 255, 0.1)'};
  border-radius: 1rem;
  margin-top: 0.75rem;
  position: relative;
  overflow: hidden;
  transition: background-color 0.5s ease;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: ${props => props.level}%;
    background: linear-gradient(to right, var(--primary-color), var(--accent-color));
    border-radius: 1rem;
  }
`;

const CompetencyLink = styled.a`
  text-decoration: none;
  display: block;
  height: 100%;
  cursor: pointer;
`;

const CoreCompetencyCard = styled.div`
  background-color: ${props => props.isLight ? 'white' : 'var(--card-bg)'};
  border-radius: var(--border-radius);
  box-shadow: 0 5px 15px rgba(0, 0, 0, ${props => props.isLight ? '0.05' : '0.2'});
  padding: 1.5rem;
  position: relative;
  transition: transform 0.3s ease, box-shadow 0.3s ease, background-color 0.5s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, ${props => props.isLight ? '0.1' : '0.3'});
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: linear-gradient(to bottom, var(--primary-color), var(--accent-color));
    border-radius: var(--border-radius) 0 0 var(--border-radius);
  }
`;

const CompetencyTitle = styled.h4`
  font-size: 1.25rem;
  margin-bottom: 0.75rem;
  color: var(--secondary-color);
  font-weight: 600;
  transition: color 0.5s ease;
`;

const CompetencyDescription = styled.p`
  font-size: 0.95rem;
  color: var(--text-color);
  margin-bottom: 1.25rem;
  flex-grow: 1;
`;

const CompetencyProgress = styled.div`
  width: 100%;
  height: 0.5rem;
  background-color: ${props => props.isLight ? '#f1f1f1' : 'rgba(255, 255, 255, 0.1)'};
  border-radius: 1rem;
  position: relative;
  overflow: hidden;
  transition: background-color 0.5s ease;
  margin-top: auto;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: ${props => props.percentage};
    background: linear-gradient(to right, var(--primary-color), var(--accent-color));
    border-radius: 1rem;
  }
`;

const CompetencyPercentage = styled.div`
  position: absolute;
  top: 0;
  right: 1.5rem;
  background: linear-gradient(to right, var(--primary-color), var(--accent-color));
  color: white;
  font-weight: 600;
  padding: 0.3rem 0.8rem;
  border-radius: 0 0 0.5rem 0.5rem;
  font-size: 0.85rem;
`;

const CoreCompetenciesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1.5rem;
  margin-bottom: 3rem;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: 992px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const DecorativeShape = styled.div`
  position: absolute;
  opacity: 0.03;
  z-index: 0;
  
  &.shape-1 {
    top: 20%;
    left: -100px;
    width: 300px;
    height: 300px;
    border-radius: 53% 47% 52% 48% / 36% 41% 59% 64%;
    background-color: var(--primary-color);
  }
  
  &.shape-2 {
    bottom: 10%;
    right: -100px;
    width: 250px;
    height: 250px;
    border-radius: 41% 59% 48% 52% / 50% 51% 49% 50%;
    background-color: var(--accent-color);
  }
`;

// Scroll To Top Button Styles
const ScrollToTopButton = styled(motion.button)`
  position: fixed;
  top: 6rem;
  right: 2rem;
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  background: linear-gradient(to right, var(--primary-color), var(--accent-color));
  color: white;
  border: none;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(5px);
  }
  
  svg {
    font-size: 1.5rem;
  }
`;

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

const buttonVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: 20, transition: { duration: 0.3 } }
};

const Skills = () => {
  const { isLight } = useContext(ThemeContext);
  const [showScrollButton, setShowScrollButton] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      // Show/hide button based on scroll position
      if (window.scrollY > 500) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  // UX & UI Design skills
  const uxUiSkills = [
    { name: "Figma", icon: <SiFigma />, level: 90 },
    { name: "Framer", icon: <SiFramer />, level: 85 },
    { name: "User Research", icon: <FaUser />, level: 85 },
    { name: "Wireframing", icon: <FaSitemap />, level: 92 },
    { name: "Prototyping", icon: <FaPencilRuler />, level: 88 },
    { name: "Accessibility", icon: <FaAccessibleIcon />, level: 80 },
    { name: "Responsive Design", icon: <FaMobileAlt />, level: 90 }
  ];
  
  // Frontend skills
  const frontendSkills = [
    { name: "React", icon: <SiReact />, level: 95 },
    { name: "JavaScript", icon: <SiJavascript />, level: 90 },
    { name: "HTML5", icon: <SiHtml5 />, level: 95 },
    { name: "CSS3", icon: <SiCss3 />, level: 90 },
    { name: "TypeScript", icon: <SiTypescript />, level: 85 },
    { name: "Next.js", icon: <SiNextdotjs />, level: 90 },
    { name: "Wordpress", icon: <SiWordpress />, level: 80 }
  ];
  
  // Backend skills
  const backendSkills = [
    { name: "Node.js", icon: <SiNodedotjs />, level: 75 },
    { name: "PHP", icon: <SiPhp />, level: 70 },
    { name: "SQL", icon: <SiSqlite />, level: 70 },
    { name: "Firebase", icon: <SiFirebase />, level: 75 },
    { name: "Python", icon: <SiPython />, level: 72 }
  ];
  
  // Other Technical skills
  const technicalSkills = [
    { name: "Git", icon: <SiGit />, level: 90 },
    { name: "Cloud (AWS/Azure/GCP)", icon: <SiGooglecloud />, level: 65 },
    { name: "Machine Learning", icon: <FaBrain />, level: 70 },
    { name: "AI Integration", icon: <SiTensorflow />, level: 65 }
  ];
  
  // Core competencies
  const coreCompetencies = [
    { 
      name: "UX & UI Design", 
      description: "Creating intuitive and engaging user experiences", 
      percentage: "95%",
      id: "ux-ui-design"
    },
    { 
      name: "Frontend Development", 
      description: "Building responsive, accessible and performant user interfaces", 
      percentage: "90%",
      id: "frontend-development"
    },
    { 
      name: "Backend Development", 
      description: "Connecting frontends with robust data solutions", 
      percentage: "75%",
      id: "backend-development"
    },
    { 
      name: "Other Technical Skills", 
      description: "Additional expertise to complete the full development lifecycle", 
      percentage: "85%",
      id: "technical-skills"
    }
  ];
  
  return (
    <StyledSkillsSection id="skills">
      <DecorativeShape className="shape-1" />
      <DecorativeShape className="shape-2" />
      
      <div className="container">
        <SectionHeader>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <SectionTitle>My Skills</SectionTitle>
            <SectionSubtitle>
              Technologies and methodologies I work with to create exceptional digital experiences
            </SectionSubtitle>
          </motion.div>
        </SectionHeader>
        
        <SkillsContainer>
          <SkillCategoryTitle>Core Competencies</SkillCategoryTitle>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            <CoreCompetenciesGrid>
              {coreCompetencies.map((competency, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <CompetencyLink href={`#${competency.id}`}>
                    <CoreCompetencyCard isLight={isLight}>
                      <CompetencyPercentage>{competency.percentage}</CompetencyPercentage>
                      <CompetencyTitle>{competency.name}</CompetencyTitle>
                      <CompetencyDescription>{competency.description}</CompetencyDescription>
                      <CompetencyProgress isLight={isLight} percentage={competency.percentage} />
                    </CoreCompetencyCard>
                  </CompetencyLink>
                </motion.div>
              ))}
            </CoreCompetenciesGrid>
          </motion.div>
        </SkillsContainer>
        
        <SkillsContainer id="ux-ui-design">
          <SkillCategoryTitle>UX & UI Design</SkillCategoryTitle>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            <SkillsGrid>
              {uxUiSkills.map((skill, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <SkillCard isLight={isLight}>
                    <SkillIcon>{skill.icon}</SkillIcon>
                    <SkillName>{skill.name}</SkillName>
                    <SkillLevel level={skill.level} isLight={isLight} />
                  </SkillCard>
                </motion.div>
              ))}
            </SkillsGrid>
          </motion.div>
        </SkillsContainer>
        
        <SkillsContainer id="frontend-development">
          <SkillCategoryTitle>Frontend Development</SkillCategoryTitle>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            <SkillsGrid>
              {frontendSkills.map((skill, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <SkillCard isLight={isLight}>
                    <SkillIcon>{skill.icon}</SkillIcon>
                    <SkillName>{skill.name}</SkillName>
                    <SkillLevel level={skill.level} isLight={isLight} />
                  </SkillCard>
                </motion.div>
              ))}
            </SkillsGrid>
          </motion.div>
        </SkillsContainer>
        
        <SkillsContainer id="backend-development">
          <SkillCategoryTitle>Backend Development</SkillCategoryTitle>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            <SkillsGrid>
              {backendSkills.map((skill, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <SkillCard isLight={isLight}>
                    <SkillIcon>{skill.icon}</SkillIcon>
                    <SkillName>{skill.name}</SkillName>
                    <SkillLevel level={skill.level} isLight={isLight} />
                  </SkillCard>
                </motion.div>
              ))}
            </SkillsGrid>
          </motion.div>
        </SkillsContainer>
        
        <SkillsContainer id="technical-skills">
          <SkillCategoryTitle>Other Technical Skills</SkillCategoryTitle>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            <SkillsGrid>
              {technicalSkills.map((skill, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <SkillCard isLight={isLight}>
                    <SkillIcon>{skill.icon}</SkillIcon>
                    <SkillName>{skill.name}</SkillName>
                    <SkillLevel level={skill.level} isLight={isLight} />
                  </SkillCard>
                </motion.div>
              ))}
            </SkillsGrid>
          </motion.div>
        </SkillsContainer>
      </div>
      
      {/* Scroll To Top Button */}
      <AnimatePresence>
        {showScrollButton && (
          <ScrollToTopButton
            onClick={scrollToTop}
            variants={buttonVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaArrowUp />
          </ScrollToTopButton>
        )}
      </AnimatePresence>
    </StyledSkillsSection>
  );
};

export default Skills;