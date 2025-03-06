import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaArrowLeft } from 'react-icons/fa';
import { ThemeContext } from '../contexts/ThemeContext';

const NotFoundContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem;
  background-color: ${props => props.isLight ? 'var(--background-color)' : 'var(--background-color)'};
  color: ${props => props.isLight ? 'var(--text-color)' : 'var(--text-color)'};
  transition: background-color 0.5s ease, color 0.5s ease;
`;

const NotFoundTitle = styled.h1`
  font-size: 6rem;
  margin-bottom: 1rem;
  color: var(--primary-color);

  @media (max-width: 768px) {
    font-size: 4rem;
  }
`;

const NotFoundSubtitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 2rem;
  color: ${props => props.isLight ? 'var(--secondary-color)' : 'white'};
  transition: color 0.5s ease;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const NotFoundText = styled.p`
  font-size: 1.25rem;
  max-width: 600px;
  margin-bottom: 2rem;
  color: ${props => props.isLight ? 'var(--text-color)' : 'var(--text-color)'};
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const HomeButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  padding: 0.875rem 1.75rem;
  background-color: var(--primary-color);
  color: white;
  border-radius: var(--border-radius);
  font-weight: 600;
  font-size: 1.125rem;
  box-shadow: 0 4px 14px rgba(0, 118, 255, 0.25);
  transition: all 0.3s ease;
  
  svg {
    margin-right: 0.5rem;
    transition: transform 0.3s ease;
  }
  
  &:hover {
    background-color: var(--accent-color);
    color: white;
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(0, 118, 255, 0.35);
    
    svg {
      transform: translateX(-3px);
    }
  }
`;

const NotFound = () => {
  const { isLight } = useContext(ThemeContext);

  return (
    <NotFoundContainer isLight={isLight}>
      <NotFoundTitle>404</NotFoundTitle>
      <NotFoundSubtitle isLight={isLight}>Page Not Found</NotFoundSubtitle>
      <NotFoundText isLight={isLight}>
        The page you are looking for doesn't exist or has been moved.
      </NotFoundText>
      <HomeButton to="/">
        <FaArrowLeft /> Back to Home
      </HomeButton>
    </NotFoundContainer>
  );
};

export default NotFound;