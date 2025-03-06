// src/components/sections/Projects.js
import React, { useEffect, useState, useContext } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { db } from '../../firebase/config';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaChevronRight } from 'react-icons/fa';
import { createPortal } from 'react-dom'; // Import createPortal
import ProjectDetailModal from '../projects/ProjectDetailModal';
import ThemeBackground from '../theme/ThemeBackground';
import { ThemeContext } from '../../contexts/ThemeContext';

const StyledProjectsSection = styled(ThemeBackground)`
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

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2.5rem;
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
`;

const ProjectImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover; /* Changed back to cover to fill the container */
  object-position: center; /* Centers the image within the container */
  transition: transform 0.5s ease;
  
  ${ProjectCard}:hover & {
    transform: scale(1.05);
  }
`;

const ProjectOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.6) 100%);
  opacity: 0.7;
  transition: opacity 0.5s ease;
  
  ${ProjectCard}:hover & {
    opacity: 0.9;
  }
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

const ProjectTitle = styled.h3`
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
  background-color: ${props => props.isLight ? '#f0f4f8' : 'rgba(255, 255, 255, 0.1)'};
  border-radius: 4px;
  font-size: 0.8rem;
  color: var(--secondary-color);
  transition: all 0.3s ease;
  
  ${ProjectCard}:hover & {
    background-color: rgba(59, 130, 246, 0.1);
    color: var(--primary-color);
  }
`;

const ProjectDetailsLink = styled.button`
  display: inline-flex;
  align-items: center;
  color: var(--primary-color);
  font-weight: 600;
  font-size: 0.95rem;
  margin-top: 0.5rem;
  transition: all 0.3s ease;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  
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
    background-color: var(--primary-color);
  }
  
  &.shape-2 {
    bottom: 5%;
    left: -150px;
    width: 350px;
    height: 350px;
    border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
    background-color: var(--accent-color);
  }
`;

// Loading component
const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  
  .spinner {
    width: 40px;
    height: 40px;
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-radius: 50%;
    border-top-color: var(--primary-color);
    animation: spin 1s ease-in-out infinite;
  }
  
  @keyframes spin {
    to { transform: rotate(360deg); }
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

// Function to create a modal container if it doesn't exist
const getOrCreateModalContainer = () => {
  let modalRoot = document.getElementById('modal-root');
  if (!modalRoot) {
    modalRoot = document.createElement('div');
    modalRoot.setAttribute('id', 'modal-root');
    document.body.appendChild(modalRoot);
  }
  return modalRoot;
};

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const { isLight } = useContext(ThemeContext);
  
  // Updated project data with correct image paths
  const customProjects = [
    {
      id: 'peopleview',
      title: 'HR Analytics Dashboard',
      category: 'Software Engineer',
      summary: 'An interactive dashboard focused on reducing employee turnover through data-driven insights.',
      description: 'PeopleView is a comprehensive HR analytics platform designed to help organizations identify and address factors contributing to employee turnover. The dashboard provides real-time visualization of key HR metrics and leverages machine learning algorithms to predict turnover risks and recommend retention strategies.',
      technologies: ['React', 'Node.js', 'Machine Learning', 'AI Integration', 'Azure', 'UX/UI Design'],
      imageUrl: '/assets/images/peopleview.png',
      features: [
        'Interactive data visualizations',
        'Predictive turnover modeling',
        'Department-specific analytics',
        'Customizable reporting tools',
        'AI-powered retention recommendations'
      ]
    },
    {
      id: 'efilmhub',
      title: 'Film Industry Platform',
      category: 'Software Engineer',
      summary: 'A comprehensive tool connecting filmmakers and providing a marketplace for hiring talent and trading equipment.',
      description: 'eFilmHub is a one-stop platform for the film industry, designed to streamline collaboration and resource management. The platform allows filmmakers to discover and connect with talent, post job opportunities, buy and sell equipment, and manage production workflows.',
      technologies: ['React', 'Node.js', 'Firebase', 'UX/UI Design', 'Cloud Storage', 'Real-time Database'],
      imageUrl: '/assets/images/efilmhub.png',
      features: [
        'Talent discovery and hiring',
        'Equipment marketplace',
        'Project collaboration tools',
        'Production management features',
        'Industry networking forums'
      ]
    },
    {
      id: 'ai-data-analyzer',
      title: 'Tech Firm Website',
      category: 'UX Engineer',
      summary: 'Complete redesign and development of a web development company website with modern UI/UX principles.',
      description: 'This project involved a full-scale redesign of a web development company\'s online presence. The client specializes in creating websites and web applications for businesses across multiple industries. The redesign focused on showcasing their portfolio, streamlining user flows, and implementing modern design principles to reflect their expertise.',
      technologies: ['Figma', 'HTML/CSS', 'JavaScript', 'WordPress', 'Responsive Design', 'SEO Optimization'],
      imageUrl: '/assets/images/stg.png',
      features: [
        'Custom WordPress theme development',
        'Portfolio showcase with case studies',
        'Interactive service descriptions',
        'Client testimonial integration',
        'Optimized for performance and SEO'
      ]
    }
  ];
  
  // Ensure modal container is available
  useEffect(() => {
    getOrCreateModalContainer();
  }, []);
  
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // Try to get projects from Firebase
        const projectsCollection = collection(db, 'projects');
        const projectsSnapshot = await getDocs(projectsCollection);
        const projectsList = projectsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        if (projectsList.length > 0) {
          setProjects(projectsList);
        } else {
          // Use the custom projects if Firebase is empty or fails
          setProjects(customProjects);
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
        // Use the custom projects if Firebase fails
        setProjects(customProjects);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProjects();
  }, []);
  
  const openProjectModal = (project) => {
    setSelectedProject(project);
    setModalOpen(true);
    // Add a class to prevent body scrolling when modal is open
    document.body.classList.add('modal-open');
  };
  
  const closeProjectModal = () => {
    setModalOpen(false);
    // Remove the class to allow body scrolling when modal is closed
    document.body.classList.remove('modal-open');
  };

  return (
    <>
      <StyledProjectsSection id="projects">
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
              <SectionTitle>Featured Projects</SectionTitle>
              <SectionSubtitle>
                A selection of my most recent and impactful work
              </SectionSubtitle>
            </motion.div>
          </SectionHeader>
          
          {loading ? (
            <LoadingSpinner>
              <div className="spinner"></div>
            </LoadingSpinner>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              <ProjectsGrid>
                {projects.map((project) => (
                  <motion.div key={project.id} variants={itemVariants}>
                    <ProjectCard>
                      <ProjectImageContainer>
                        <ProjectImage 
                          src={project.imageUrl} 
                          alt={project.title}
                          onError={(e) => {
                            // Fixed fallback image paths
                            if (project.id === 'peopleview') {
                              e.target.src = "/assets/images/peopleview.png"; // Try the correct path first
                            } else if (project.id === 'efilmhub') {
                              e.target.src = "/assets/images/efilmhub.png"; // Try the correct path first
                            } else if (project.id === 'ai-data-analyzer') {
                              e.target.src = "/assets/images/stg.png"; // Try the correct path first
                            } else {
                              // If all else fails, use an icon from a CDN
                              e.target.src = "https://cdn-icons-png.flaticon.com/512/1356/1356479.png";
                            }
                          }}
                        />
                        <ProjectOverlay />
                      </ProjectImageContainer>
                      
                      <ProjectContent>
                        <ProjectCategory>{project.category}</ProjectCategory>
                        <ProjectTitle>{project.title}</ProjectTitle>
                        <ProjectSummary>{project.summary}</ProjectSummary>
                        <ProjectTags>
                          {project.technologies && project.technologies.slice(0, 4).map((tech, techIndex) => (
                            <ProjectTag key={techIndex} isLight={isLight}>{tech}</ProjectTag>
                          ))}
                        </ProjectTags>
                        <ProjectDetailsLink onClick={() => openProjectModal(project)}>
                          View Project Details <FaChevronRight />
                        </ProjectDetailsLink>
                      </ProjectContent>
                    </ProjectCard>
                  </motion.div>
                ))}
              </ProjectsGrid>
            </motion.div>
          )}
        </div>
      </StyledProjectsSection>
      
      {/* Use React Portal for the modal */}
      {modalOpen && selectedProject && createPortal(
        <ProjectDetailModal 
          project={selectedProject}
          isOpen={modalOpen}
          onClose={closeProjectModal}
          isLight={isLight}
        />,
        getOrCreateModalContainer()
      )}
    </>
  );
};

export default Projects;