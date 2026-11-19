import React, { useEffect } from 'react';
import Contact from '../components/sections/Contact';
import useDocumentTitle from '../hooks/useDocumentTitle';

const ContactPage = () => {
  useDocumentTitle('Contact');

  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return <Contact />;
};

export default ContactPage;