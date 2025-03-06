import React, { useEffect } from 'react';
import Contact from '../components/sections/Contact';

const ContactPage = () => {
  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Contact />
    </>
  );
};

export default ContactPage;