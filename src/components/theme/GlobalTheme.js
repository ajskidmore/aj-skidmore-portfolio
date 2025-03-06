import { useContext, useEffect } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';
import { createGlobalStyle } from 'styled-components';

// Global styles that change based on theme
const GlobalStyles = createGlobalStyle`
  body {
    transition: background-color 0.5s ease, color 0.5s ease;
  }
`;

// This component adds global styling and applies theme changes
const GlobalTheme = () => {
  const { isLight } = useContext(ThemeContext);
  
  useEffect(() => {
    // Apply dark-theme class to the body element when theme changes
    if (isLight) {
      document.body.classList.remove('dark-theme');
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      document.body.classList.add('dark-theme');
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, [isLight]);
  
  return <GlobalStyles />;
};

export default GlobalTheme;