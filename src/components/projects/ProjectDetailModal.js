// src/components/projects/ProjectDetailModal.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaTimes, FaEnvelope } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

// Use a portal for the modal to ensure it's outside the normal DOM hierarchy
const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8); /* Darker overlay for more contrast */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99999;
  padding: 40px 20px;
  overflow-y: auto;
  isolation: isolate;
`;

const ModalContent = styled(motion.div)`
  background-color: ${props => props.isLight ? 'var(--background-color)' : 'var(--card-bg)'};
  color: var(--text-color);
  border-radius: var(--border-radius);
  width: 100%;
  max-width: 1000px; /* Increased max-width */
  max-height: 90vh; /* Increased max-height */
  overflow-y: auto;
  position: relative;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
`;

const ModalHeader = styled.div`
  position: relative;
  padding: 2.5rem 2.5rem 2rem;
  border-bottom: 1px solid ${props => props.isLight ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.05)'};
`;

const HeaderLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const HeaderContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const ModalTitle = styled.h3`
  font-size: 2.25rem;
  margin-bottom: 0.75rem;
  color: ${props => props.isLight ? 'var(--secondary-color-light)' : 'var(--secondary-color-dark)'};
  font-weight: 700;
`;

const ModalCategory = styled.div`
  display: inline-block;
  background-color: rgba(59, 130, 246, 0.1);
  color: var(--primary-color);
  padding: 0.5rem 1rem;
  border-radius: 30px;
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const CloseButton = styled.button`
  position: fixed;
  top: 1rem;
  right: 1rem;
  background: rgba(0, 0, 0, 0.2);
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  z-index: 999999; /* Extremely high z-index to stay above the modal */
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.5);
    color: var(--primary-color);
    transform: rotate(90deg);
  }
`;

const ProjectImageContainer = styled.div`
  width: 100%;
  padding-top: 100%; /* Creates a perfect square */
  position: relative;
  overflow: hidden;
  border-radius: 12px; /* Increased border radius */
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  background-color: ${props => props.isLight ? '#f5f5f5' : '#1e1e1e'}; /* Filler color */
  
  @media (max-width: 768px) {
    margin-top: 1.5rem;
  }
`;

const ProjectImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  max-width: calc(100% - 32px);
  max-height: calc(100% - 32px);
  object-fit: contain; /* Shows full image without cropping */
  transition: transform 0.3s ease;
  border-radius: 5px; /* Specific 5px border radius as requested */
  border: 1px solid ${props => props.isLight ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)'};
  
  &:hover {
    transform: scale(1.05);
  }
`;

const ModalBody = styled.div`
  padding: 0 2.5rem 2rem;
  display: flex;
  flex-direction: column;
`;

const ContentLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 0;
`;

const ProjectDescription = styled.p`
  margin-top: 1rem;
  line-height: 1.8;
  color: var(--text-color);
  font-size: 1.1rem;
  
  @media (max-width: 768px) {
    margin-bottom: 1rem;
  }
`;

const SectionTitle = styled.h4`
  font-size: 1.4rem;
  margin-bottom: 1.25rem;
  color: ${props => props.isLight ? 'var(--secondary-color-light)' : 'var(--secondary-color-dark)'};
  font-weight: 600;
  position: relative;
  padding-bottom: 0.5rem;
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 60px;
    height: 3px;
    background-color: var(--primary-color);
    border-radius: 2px;
  }
`;

const TwoColumnLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const TechSection = styled.div``;

const TechList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 1rem;
`;

const TechItem = styled.div`
  background-color: ${props => props.isLight ? '#f0f4f8' : 'rgba(255, 255, 255, 0.1)'};
  color: ${props => props.isLight ? 'var(--secondary-color-light)' : 'var(--secondary-color-dark)'};
  padding: 0.6rem 1.2rem;
  border-radius: 6px;
  font-size: 0.95rem;
  font-weight: 500;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: rgba(59, 130, 246, 0.15);
    color: var(--primary-color);
    transform: translateY(-2px);
  }
`;

const FeaturesSection = styled.div``;

const FeaturesList = styled.ul`
  list-style-position: outside;
  margin-left: 1.25rem;
  
  li {
    margin-bottom: 0.8rem;
    line-height: 1.6;
    padding-left: 0.5rem;
    position: relative;
  }
  
  li::marker {
    color: var(--primary-color);
  }
`;

const ModalFooter = styled.div`
  padding: 1.5rem 2.5rem 2.5rem;
  display: flex;
  justify-content: center;
  border-top: 1px solid ${props => props.isLight ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.05)'};
  margin-top: 1rem;
`;

const ContactButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.875rem 2rem;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: var(--border-radius);
  font-weight: 600;
  font-size: 1.05rem;
  transition: all 0.3s ease;
  text-decoration: none;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  
  svg {
    margin-right: 0.75rem;
    font-size: 1.1rem;
  }
  
  &:hover {
    background-color: var(--accent-color);
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  }
`;

// Animation variants
const modalVariants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    y: 20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring',
      damping: 25,
      stiffness: 300,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 20,
    transition: {
      duration: 0.2,
    },
  },
};

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      duration: 0.3
    }
  },
  exit: { 
    opacity: 0,
    transition: {
      duration: 0.2
    }
  },
};

const ProjectDetailModal = ({ project, isOpen, onClose, isLight }) => {
  const navigate = useNavigate();
  
  // Function to reset body styling and navigate
  const handleContactClick = () => {
    // First reset the scroll
    document.body.style.overflow = 'auto';
    // Then close the modal
    onClose();
    // Then navigate
    navigate('/contact');
  };

  // Handle ESC key press to close modal
  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleEscKey);
    
    // When modal is open, disable scrolling on the body
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      // Make sure to reset when modal closes
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      window.removeEventListener('keydown', handleEscKey);
      // Re-enable scrolling when component unmounts
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);
  
  // Close modal when clicking outside content
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  
  if (!project) return null;

  return (
    <AnimatePresence>
                  {isOpen && (
        <ModalOverlay
          onClick={handleOverlayClick}
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <CloseButton onClick={onClose} aria-label="Close modal">
            <FaTimes />
          </CloseButton>
          <ModalContent
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            isLight={isLight}
            onClick={(e) => e.stopPropagation()}
          >
            <ModalHeader isLight={isLight}>
              <HeaderLayout>
                <HeaderContent>
                  <ModalCategory>{project.category}</ModalCategory>
                  <ModalTitle isLight={isLight}>{project.title}</ModalTitle>
                  <ProjectDescription>{project.description}</ProjectDescription>
                </HeaderContent>
                
                <ProjectImageContainer isLight={isLight}>
                  <ProjectImage 
                    src={project.imageUrl} 
                    alt={project.title}
                    isLight={isLight}
                    onError={(e) => {
                      // Try the corrected path with leading slash
                      if (project.id === 'peopleview') {
                        e.target.src = "/assets/images/peopleview.png";
                      } else if (project.id === 'efilmhub') {
                        e.target.src = "/assets/images/efilmhub.png";
                      } else if (project.id === 'ai-data-analyzer') {
                        e.target.src = "/assets/images/STG.png";
                      } else {
                        // If all else fails, use a fallback icon
                        e.target.src = "https://cdn-icons-png.flaticon.com/512/1356/1356479.png";
                      }
                    }}
                  />
                </ProjectImageContainer>
              </HeaderLayout>
            </ModalHeader>
            
            <ModalBody>
              <ContentLayout>
                
                <TwoColumnLayout>
                  <Column>
                    <FeaturesSection>
                      <SectionTitle isLight={isLight}>Key Features</SectionTitle>
                      <FeaturesList>
                        {project.features && project.features.map((feature, index) => (
                          <li key={index}>{feature}</li>
                        ))}
                      </FeaturesList>
                    </FeaturesSection>
                  </Column>
                  
                  <Column>
                    <TechSection>
                      <SectionTitle isLight={isLight}>Technologies Used</SectionTitle>
                      <TechList>
                        {project.technologies && project.technologies.map((tech, index) => (
                          <TechItem key={index} isLight={isLight}>{tech}</TechItem>
                        ))}
                      </TechList>
                    </TechSection>
                  </Column>
                </TwoColumnLayout>
              </ContentLayout>
            </ModalBody>
            
            <ModalFooter isLight={isLight}>
              <ContactButton onClick={handleContactClick}>
                <FaEnvelope /> Contact for More Information
              </ContactButton>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      )}
    </AnimatePresence>
  );
};

export default ProjectDetailModal;