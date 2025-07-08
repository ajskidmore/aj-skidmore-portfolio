import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isAutoMode, setIsAutoMode] = useState(() => {
    const savedAutoMode = localStorage.getItem('autoThemeMode');
    return savedAutoMode === null ? true : savedAutoMode === 'true'; // Default to auto mode
  });
  
  const [manualTheme, setManualTheme] = useState(() => {
    const savedTheme = localStorage.getItem('manualTheme');
    return savedTheme ? savedTheme === 'light' : false;
  });

  // Function to determine if it's daytime based on user's local time
  const isDaytime = () => {
    const now = new Date();
    const hour = now.getHours();
    // Consider daytime as 6 AM to 6 PM (18:00)
    return hour >= 6 && hour < 18;
  };

  // Calculate current theme based on mode
  const isLight = isAutoMode ? isDaytime() : manualTheme;
  
  // Function to toggle between auto and manual mode, or toggle manual theme
  const toggleTheme = () => {
    if (isAutoMode) {
      // Switch to manual mode with opposite of current auto theme
      setIsAutoMode(false);
      const newManualTheme = !isDaytime();
      setManualTheme(newManualTheme);
      localStorage.setItem('autoThemeMode', 'false');
      localStorage.setItem('manualTheme', newManualTheme ? 'light' : 'dark');
    } else {
      // Toggle manual theme
      setManualTheme(prevTheme => {
        const newTheme = !prevTheme;
        localStorage.setItem('manualTheme', newTheme ? 'light' : 'dark');
        return newTheme;
      });
    }
  };

  // Function to reset to auto mode
  const resetToAutoMode = () => {
    setIsAutoMode(true);
    localStorage.setItem('autoThemeMode', 'true');
  };
  
  // Auto-update theme every minute when in auto mode
  useEffect(() => {
    if (!isAutoMode) return;

    const interval = setInterval(() => {
      // Force re-render to update theme based on current time
      setIsAutoMode(true);
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [isAutoMode]);
  
  // Apply theme to body immediately on mount and when theme changes
  useEffect(() => {
    if (isLight) {
      document.body.classList.remove('dark-theme');
    } else {
      document.body.classList.add('dark-theme');
    }
  }, [isLight]);
  
  return (
    <ThemeContext.Provider value={{ 
      isLight, 
      isAutoMode,
      toggleTheme,
      resetToAutoMode
    }}>
      {children}
    </ThemeContext.Provider>
  );
};