import React, { useContext } from 'react';
import styled from 'styled-components';
import { FiSun, FiMoon } from 'react-icons/fi';
import { ThemeContext } from '../../contexts/ThemeContext';

const ToggleButton = styled.button`
  background: ${props => {
    if (props.isAuto) {
      return props.isLight ? 'linear-gradient(45deg, var(--primary-color), var(--accent-color))' : 'linear-gradient(45deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1))';
    }
    return props.isLight ? 'var(--primary-color)' : 'rgba(255, 255, 255, 0.2)';
  }};
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
    background: ${props => {
      if (props.isAuto) {
        return props.isLight ? 'linear-gradient(45deg, var(--accent-color), var(--primary-color))' : 'linear-gradient(45deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.2))';
      }
      return props.isLight ? 'var(--accent-color)' : 'rgba(255, 255, 255, 0.3)';
    }};
  }
  
  /* Add a subtle animation effect on click */
  &:active::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    transform: translate(-50%, -50%) scale(0);
    animation: ripple 0.6s linear;
  }
  
  @keyframes ripple {
    to {
      transform: translate(-50%, -50%) scale(3);
      opacity: 0;
    }
  }
`;

const ThemeToggle = () => {
  const { isLight, isAutoMode, toggleTheme } = useContext(ThemeContext);
  
  const getTooltipText = () => {
    if (isAutoMode) {
      return `Auto mode: ${isLight ? 'Day' : 'Night'} (Click to override)`;
    }
    return `Manual mode: ${isLight ? 'Light' : 'Dark'} (Click to toggle)`;
  };
  
  const getIcon = () => {
    return isLight ? <FiMoon /> : <FiSun />;
  };
  
  return (
    <ToggleButton 
      onClick={toggleTheme} 
      isLight={isLight}
      isAuto={isAutoMode}
      aria-label={getTooltipText()}
      title={getTooltipText()}
    >
      {getIcon()}
    </ToggleButton>
  );
};

export default ThemeToggle;