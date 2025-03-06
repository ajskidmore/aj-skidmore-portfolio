import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import styled from 'styled-components';
import { FaArrowLeft, FaGithub, FaLink } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { ThemeContext } from '../contexts/ThemeContext';

const PageContainer = styled.div`
  padding-top: 80px; /* Add padding to account for fixed header */
  min-height: 100vh;
  background-color: ${props => props.isLight ? 'var(--background-color)' : 'var(--background-color)'};
  transition: background-color 0.5s ease;
`;

const ProjectDetailSection = styled.section`
  padding: 5rem 0;
`;

const ProjectHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const ProjectTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
  color: ${props => props.isLight ? 'var(--secondary-color-light)' : 'var(--secondary-color-dark)'};
  transition: color 0.5s ease;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const ProjectCategory = styled.div`
  display: inline-block;
  background-color: ${props => props.isLight ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0.2)'};
  color: var(--primary-color);
  padding: 0.5rem 1.5rem;
  border-radius: 30px;
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 1.5rem;
  transition: background-color 0.5s ease;
`;

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  color: ${props => props.isLight ? 'var(--text-color)' : 'var(--text-color)'};
  font-weight: 500;
  margin-bottom: 2rem;
  transition: color 0.3s ease;
  
  svg {
    margin-right: 0.5rem;
    transition: transform 0.3s ease;
  }
  
  &:hover {
    color: var(--primary-color);
    
    svg {
      transform: translateX(-3px);
    }
  }
`;

const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  
  @media (min-width: 992px) {
    grid-template-columns: 7fr 5fr;
  }
`;

const ProjectImageContainer = styled.div`
  border-radius: var(--border-radius);
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, ${props => props.isLight ? '0.1' : '0.3'});
  transition: box-shadow 0.5s ease;
`;

const ProjectImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
`;

const ProjectContent = styled.div``;

const ProjectDescription = styled.div`
  margin-bottom: 2.5rem;
  
  p {
    margin-bottom: 1.5rem;
    line-height: 1.8;
    color: var(--text-color);
    font-size: 1.1rem;
  }
`;

const ProjectSubtitle = styled.h3`
  font-size: 1.75rem;
  margin-bottom: 1.25rem;
  color: ${props => props.isLight ? 'var(--secondary-color-light)' : 'var(--secondary-color-dark)'};
  transition: color 0.5s ease;
`;

const TechStack = styled.div`
  margin-bottom: 2.5rem;
`;

const TechList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
`;

const TechItem = styled.div`
  background-color: ${props => props.isLight ? '#f0f4f8' : 'rgba(255, 255, 255, 0.1)'};
  color: ${props => props.isLight ? 'var(--secondary-color-light)' : 'var(--secondary-color-dark)'};
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 0.95rem;
  transition: all 0.3s ease, background-color 0.5s ease, color 0.5s ease;
  
  &:hover {
    background-color: ${props => props.isLight ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0.2)'};
    color: var(--primary-color);
    transform: translateY(-2px);
  }
`;

const ProjectFeatures = styled.div`
  margin-bottom: 2.5rem;
`;

const FeaturesList = styled.ul`
  list-style-position: inside;
  
  li {
    color: var(--text-color);
    margin-bottom: 0.75rem;
    line-height: 1.6;
  }
  
  li::marker {
    color: var(--primary-color);
  }
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const ProjectLink = styled.a`
  display: inline-flex;
  align-items: center;
  padding: 0.75rem 1.5rem;
  background-color: ${props => props.primary ? 'var(--primary-color)' : 'transparent'};
  color: ${props => props.primary ? 'white' : props.isLight ? 'var(--secondary-color-light)' : 'var(--secondary-color-dark)'};
  border: 2px solid ${props => props.primary ? 'var(--primary-color)' : props.isLight ? 'var(--secondary-color-light)' : 'var(--secondary-color-dark)'};
  border-radius: var(--border-radius);
  font-weight: 600;
  transition: all 0.3s ease, border-color 0.5s ease, color 0.5s ease;
  
  svg {
    margin-right: 0.5rem;
  }
  
  &:hover {
    background-color: ${props => props.primary ? 'var(--accent-color)' : props.isLight ? 'var(--secondary-color-light)' : 'var(--secondary-color-dark)'};
    color: white;
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    border-color: ${props => props.primary ? 'var(--accent-color)' : props.isLight ? 'var(--secondary-color-light)' : 'var(--secondary-color-dark)'};
  }
`;

const LoadingContainer = styled.div`
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoadingSpinner = styled.div`
  width: 50px;
  height: 50px;
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top-color: var(--primary-color);
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 3rem 0;
  
  h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
    color: ${props => props.isLight ? 'var(--secondary-color-light)' : 'var(--secondary-color-dark)'};
    transition: color 0.5s ease;
  }
  
  p {
    font-size: 1.1rem;
    margin-bottom: 2rem;
    color: var(--text-color);
  }
`;

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isLight } = useContext(ThemeContext);

  // Fallback project data
  const customProjects = [
    {
      id: 'peopleview',
      title: 'PeopleView',
      category: 'HR Analytics',
      summary: 'An interactive dashboard focused on reducing employee turnover through data-driven insights.',
      description: 'PeopleView is a comprehensive HR analytics platform designed to help organizations identify and address factors contributing to employee turnover. The dashboard provides real-time visualization of key HR metrics and leverages machine learning algorithms to predict turnover risks and recommend retention strategies.',
      technologies: ['React', 'Node.js', 'Machine Learning', 'AI Integration', 'Azure', 'UX/UI Design'],
      imageUrl: 'https://via.placeholder.com/600x400?text=PeopleView',
      features: [
        'Interactive data visualizations',
        'Predictive turnover modeling',
        'Department-specific analytics',
        'Customizable reporting tools',
        'AI-powered retention recommendations'
      ],
      github: 'https://github.com/ajskidmore/peopleview',
      liveUrl: 'https://peopleview.demo.com'
    },
    {
      id: 'efilmhub',
      title: 'eFilmHub',
      category: 'Film Industry',
      summary: 'A comprehensive tool connecting filmmakers and providing a marketplace for hiring talent and trading equipment.',
      description: 'eFilmHub is a one-stop platform for the film industry, designed to streamline collaboration and resource management. The platform allows filmmakers to discover and connect with talent, post job opportunities, buy and sell equipment, and manage production workflows.',
      technologies: ['React', 'Node.js', 'Firebase', 'UX/UI Design', 'Cloud Storage', 'Real-time Database'],
      imageUrl: 'https://via.placeholder.com/600x400?text=eFilmHub',
      features: [
        'Talent discovery and hiring',
        'Equipment marketplace',
        'Project collaboration tools',
        'Production management features',
        'Industry networking forums'
      ],
      github: 'https://github.com/ajskidmore/efilmhub',
      liveUrl: 'https://efilmhub.demo.com'
    },
    {
      id: 'ai-data-analyzer',
      title: 'AI Data Analyzer',
      category: 'Machine Learning',
      summary: 'A personal project focused on AI integration and machine learning, analyzing complex datasets to generate customized insights.',
      description: 'The AI Data Analyzer is a sophisticated tool that leverages advanced machine learning algorithms to process and interpret complex datasets. Users can upload various data formats and specify the depth and focus of analysis they require.',
      technologies: ['Python', 'React', 'Machine Learning', 'Data Visualization', 'Natural Language Processing'],
      imageUrl: 'https://via.placeholder.com/600x400?text=AI+Data+Analyzer',
      features: [
        'Customizable analysis depth',
        'Multiple data format support',
        'Interactive visualization tools',
        'Natural language report generation',
        'Trend identification and prediction'
      ],
      github: 'https://github.com/ajskidmore/ai-data-analyzer',
      liveUrl: 'https://ai-analyzer.demo.com'
    }
  ];
  
  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        
        // Try to get project from Firebase
        const projectRef = doc(db, 'projects', id);
        const projectSnap = await getDoc(projectRef);
        
        if (projectSnap.exists()) {
          setProject({ id: projectSnap.id, ...projectSnap.data() });
        } else {
          // Look for project in custom projects
          const customProject = customProjects.find(p => p.id === id);
          
          if (customProject) {
            setProject(customProject);
          } else {
            setError('Project not found.');
          }
        }
      } catch (error) {
        console.error('Error fetching project:', error);
        
        // Try to use custom project as fallback
        const customProject = customProjects.find(p => p.id === id);
        
        if (customProject) {
          setProject(customProject);
        } else {
          setError('Failed to load project details.');
        }
      } finally {
        setLoading(false);
      }
    };
    
    fetchProject();
    
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <PageContainer isLight={isLight}>
        <div className="container">
          <LoadingContainer>
            <LoadingSpinner />
          </LoadingContainer>
        </div>
      </PageContainer>
    );
  }

  if (error || !project) {
    return (
      <PageContainer isLight={isLight}>
        <div className="container">
          <ErrorMessage isLight={isLight}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h2>Oops!</h2>
              <p>{error || 'Project not found.'}</p>
              <ProjectLink 
                as={Link} 
                to="/projects"
                primary={true}
              >
                <FaArrowLeft /> Back to Projects
              </ProjectLink>
            </motion.div>
          </ErrorMessage>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer isLight={isLight}>
      <ProjectDetailSection>
        <div className="container">
          <BackLink to="/projects" isLight={isLight}>
            <FaArrowLeft /> Back to Projects
          </BackLink>
          
          <ProjectHeader>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
            >
              <ProjectCategory isLight={isLight}>{project.category}</ProjectCategory>
              <ProjectTitle isLight={isLight}>{project.title}</ProjectTitle>
            </motion.div>
          </ProjectHeader>
          
          <ProjectGrid>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <ProjectImageContainer isLight={isLight}>
                <ProjectImage 
                  src={project.imageUrl} 
                  alt={project.title}
                  onError={(e) => {
                    if (project.id === 'peopleview') {
                      e.target.src = "https://cdn-icons-png.flaticon.com/512/2519/2519318.png"; 
                    } else if (project.id === 'efilmhub') {
                      e.target.src = "https://cdn-icons-png.flaticon.com/512/1038/1038100.png"; 
                    } else if (project.id === 'ai-data-analyzer') {
                      e.target.src = "https://cdn-icons-png.flaticon.com/512/2103/2103832.png"; 
                    } else {
                      e.target.src = "https://cdn-icons-png.flaticon.com/512/1356/1356479.png"; 
                    }
                  }}
                />
              </ProjectImageContainer>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <ProjectContent>
                <ProjectDescription>
                  <ProjectSubtitle isLight={isLight}>Project Overview</ProjectSubtitle>
                  <p>{project.description}</p>
                </ProjectDescription>
                
                <TechStack>
                  <ProjectSubtitle isLight={isLight}>Technologies Used</ProjectSubtitle>
                  <TechList>
                    {project.technologies && project.technologies.map((tech, index) => (
                      <TechItem key={index} isLight={isLight}>{tech}</TechItem>
                    ))}
                  </TechList>
                </TechStack>
                
                <ProjectFeatures>
                  <ProjectSubtitle isLight={isLight}>Key Features</ProjectSubtitle>
                  <FeaturesList>
                    {project.features && project.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </FeaturesList>
                </ProjectFeatures>
                
                <ProjectLinks>
                  {project.github && (
                    <ProjectLink 
                      href={project.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      primary={true}
                    >
                      <FaGithub /> View on GitHub
                    </ProjectLink>
                  )}
                  
                  {project.liveUrl && (
                    <ProjectLink 
                      href={project.liveUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      isLight={isLight}
                    >
                      <FaLink /> Visit Live Site
                    </ProjectLink>
                  )}
                </ProjectLinks>
              </ProjectContent>
            </motion.div>
          </ProjectGrid>
        </div>
      </ProjectDetailSection>
    </PageContainer>
  );
};

export default ProjectDetail;