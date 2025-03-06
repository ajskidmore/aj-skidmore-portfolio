import React, { useContext, useEffect } from 'react';
import Skills from '../components/sections/Skills';
import { ThemeContext } from '../contexts/ThemeContext';
import styled from 'styled-components';

const PageContainer = styled.div`
  padding-top: 80px; /* Add padding to account for fixed header */
  background-color: ${props => props.isLight ? 'white' : 'var(--background-color)'};
  transition: background-color 0.5s ease;
`;

const SkillsPage = () => {
  const { isLight } = useContext(ThemeContext);
  
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageContainer isLight={isLight}>
      <Skills />
    </PageContainer>
  );
};

export default SkillsPage;