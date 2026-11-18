// src/components/sections/Projects.js
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaChevronRight } from 'react-icons/fa';
import ThemeBackground from '../theme/ThemeBackground';
import { ThemeContext } from '../../contexts/ThemeContext';
import { featuredProjects } from '../../data/projects';

const StyledProjectsSection = styled(ThemeBackground)`
  padding: 7rem 0;
  position: relative;
  overflow: hidden;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 4rem;
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

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2.5rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const ProjectCard = styled(motion.div)`
  background-color: var(--card-bg);
  border-radius: var(--border-radius);
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  transition: all 0.4s ease;
  position: relative;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
  }
`;

const ProjectImageContainer = styled.div`
  position: relative;
  overflow: hidden;
  aspect-ratio: 16 / 8; /* Maintains consistent ratio across all project cards */
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProjectImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
  transition: transform 0.5s ease;

  ${ProjectCard}:hover & {
    transform: scale(1.05);
  }
`;

const ProjectOverlay = styled.div`
  /* Light shade only, so the project screenshots keep their real colors */
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 70%, rgba(0, 0, 0, 0.08) 100%);
  border-bottom: 1px solid var(--border-color);
  pointer-events: none;
`;

const ProjectContent = styled.div`
  padding: 1.75rem;
`;

const ProjectCategory = styled.span`
  display: inline-block;
  padding: 0.35rem 0.8rem;
  background-color: rgba(59, 130, 246, 0.1);
  color: var(--primary-color);
  border-radius: 30px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 1rem;
`;

const ProjectTitle = styled.h2`
  margin-bottom: 0.75rem;
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--secondary-color);
  transition: color 0.3s ease;
  
  ${ProjectCard}:hover & {
    color: var(--primary-color);
  }
`;

const ProjectSummary = styled.p`
  margin-bottom: 1.25rem;
  color: var(--text-color);
  line-height: 1.6;
  font-size: 1rem;
`;

const ProjectTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-bottom: 1.5rem;
`;

const ProjectTag = styled.span`
  padding: 0.35rem 0.75rem;
  background-color: ${props => props.$isLight ? '#f0f4f8' : 'rgba(255, 255, 255, 0.1)'};
  border-radius: 4px;
  font-size: 0.8rem;
  color: var(--secondary-color);
  transition: all 0.3s ease;
  
  ${ProjectCard}:hover & {
    background-color: rgba(59, 130, 246, 0.1);
    color: var(--primary-color);
  }
`;

const ProjectDetailsLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  color: var(--primary-color);
  font-weight: 600;
  font-size: 0.95rem;
  margin-top: 0.5rem;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;

  svg {
    margin-left: 0.5rem;
    transition: transform 0.3s ease;
  }

  &:hover {
    color: var(--accent-color);

    svg {
      transform: translateX(3px);
    }
  }
`;

const DecorativeShape = styled.div`
  position: absolute;
  opacity: 0.03;
  z-index: 0;
  
  &.shape-1 {
    top: 10%;
    right: -100px;
    width: 300px;
    height: 300px;
    border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
    background-color: var(--primary-fill);
  }
  
  &.shape-2 {
    bottom: 5%;
    left: -150px;
    width: 350px;
    height: 350px;
    border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
    background-color: var(--accent-fill);
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
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 }
  }
};

const Projects = () => {
  const { isLight } = useContext(ThemeContext);

  return (
    <>
      <StyledProjectsSection id="projects">
        <DecorativeShape className="shape-1" aria-hidden="true" />
        <DecorativeShape className="shape-2" aria-hidden="true" />
        
        <div className="container">
          <SectionHeader>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, amount: 0.2 }}
            >
              <SectionTitle>Featured Projects</SectionTitle>
              <SectionSubtitle>
                Products I designed and built end to end, from research and interface design to production code
              </SectionSubtitle>
            </motion.div>
          </SectionHeader>
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            <ProjectsGrid role="list">
              {featuredProjects.map((project) => (
                <motion.div key={project.id} variants={itemVariants} role="listitem">
                  <ProjectCard>
                    <ProjectImageContainer>
                      <ProjectImage
                        src={project.imageUrl}
                        alt=""
                        width="1440"
                        height="720"
                        loading="lazy"
                      />
                      <ProjectOverlay />
                    </ProjectImageContainer>
                    
                    <ProjectContent>
                      <ProjectCategory>{project.category}</ProjectCategory>
                      <ProjectTitle>{project.name}</ProjectTitle>
                      <ProjectSummary>{project.summary}</ProjectSummary>
                      <ProjectTags aria-label={`Tools used for ${project.name}`}>
                        {project.tools.slice(0, 4).map((tool) => (
                          <ProjectTag key={tool} $isLight={isLight}>{tool}</ProjectTag>
                        ))}
                      </ProjectTags>
                      <ProjectDetailsLink to={`/projects/${project.id}`}>
                        View project<span className="visually-hidden">: {project.name}</span> <FaChevronRight aria-hidden="true" />
                      </ProjectDetailsLink>
                    </ProjectContent>
                  </ProjectCard>
                </motion.div>
              ))}
            </ProjectsGrid>
          </motion.div>
        </div>
      </StyledProjectsSection>
    </>
  );
};

export default Projects;
