import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import styled from 'styled-components';
import { MotionConfig } from 'framer-motion';

// Layout components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import GlobalTheme from './components/theme/GlobalTheme';
// import Chatbot from './components/chat/Chatbot'; // Temporarily disabled

// Pages
import Home from './pages/Home';
import AboutPage from './pages/AboutPage';
// Skills page hidden for now; restore this import and the route below to bring it back.
// import SkillsPage from './pages/SkillsPage';
import ProjectsPage from './pages/ProjectsPage';
import ContactPage from './pages/ContactPage';
import ProjectDetail from './pages/ProjectDetail';
import NotFound from './pages/NotFound';

// Styles
import './styles/global.css';
import './styles/variables.css';

// Styled components for proper stacking
const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
  z-index: 1;
`;

const MainContent = styled.main`
  flex: 1;
  position: relative;
  z-index: 1;
`;

// This ensures the modal container is created on app load
const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 0;
  z-index: 99999;
  pointer-events: none;
`;

function App() {
  // Create modal container if it doesn't exist
  useEffect(() => {
    const modalRoot = document.getElementById('modal-root');
    if (!modalRoot) {
      const container = document.createElement('div');
      container.id = 'modal-root';
      document.body.appendChild(container);
    }
    
    return () => {
      // Clean up on unmount (if needed)
      const modalRoot = document.getElementById('modal-root');
      if (modalRoot && modalRoot.parentNode) {
        modalRoot.parentNode.removeChild(modalRoot);
      }
    };
  }, []);

  return (
    <ThemeProvider>
        <Router>
          <MotionConfig reducedMotion="user">
          <GlobalTheme />
          <a className="skip-link" href="#main-content">Skip to main content</a>
          <AppContainer>
            <Header />
            <MainContent id="main-content" tabIndex={-1}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<AboutPage />} />
                {/* <Route path="/skills" element={<SkillsPage />} /> */}
                <Route path="/skills" element={<Navigate to="/about" replace />} />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/projects/:id" element={<ProjectDetail />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </MainContent>
            <Footer />
            {/* <Chatbot /> */} {/* Temporarily disabled */}
          </AppContainer>
          {/* This is a fallback container that will be used if the useEffect doesn't run */}
          <ModalContainer id="modal-root-fallback" />
          </MotionConfig>
        </Router>
    </ThemeProvider>
  );
}

export default App;