// src/pages/ProjectsPage.js
import React, { useContext, useEffect } from 'react';
import Projects from '../components/sections/Projects';
import { ThemeContext } from '../contexts/ThemeContext';
import styled from 'styled-components';

const PageContainer = styled.div`
  padding-top: 80px; /* Add padding to account for fixed header */
  background-color: ${props => props.isLight ? 'var(--section-bg)' : 'var(--background-color)'};
  transition: background-color 0.5s ease;
  min-height: 100vh;
`;

const ProjectsPage = () => {
  const { isLight } = useContext(ThemeContext);
  
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageContainer isLight={isLight}>
      <Projects />
    </PageContainer>
  );
};

export default ProjectsPage;