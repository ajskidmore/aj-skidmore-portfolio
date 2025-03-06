import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Initialize with system preference or saved preference
  const [isLight, setIsLight] = useState(() => {
    const savedTheme = localStorage.getItem('siteTheme');
    
    if (savedTheme) {
      return savedTheme === 'light';
    } 
    
    // Default to dark if no preference saved (changed from your original)
    return false;
  });
  
  // Function to toggle theme
  const toggleTheme = () => {
    setIsLight(prevState => {
      const newThemeState = !prevState;
      // Save to localStorage (more persistent than sessionStorage)
      localStorage.setItem('siteTheme', newThemeState ? 'light' : 'dark');
      return newThemeState;
    });
  };
  
  // Apply theme to body immediately on mount and when theme changes
  useEffect(() => {
    if (isLight) {
      document.body.classList.remove('dark-theme');
    } else {
      document.body.classList.add('dark-theme');
    }
  }, [isLight]);
  
  return (
    <ThemeContext.Provider value={{ isLight, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};