import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaPhone, FaPaperPlane, FaCheck } from 'react-icons/fa';
import { ThemeContext } from '../../contexts/ThemeContext';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase/config';

const FormContainer = styled(motion.div)`
  background-color: var(--card-bg);
  border-radius: var(--border-radius);
  padding: 2.5rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
  margin-top: 2rem;
`;

const FormTitle = styled.h3`
  color: var(--secondary-color);
  font-size: 1.75rem;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const FormGroup = styled.div`
  position: relative;
`;

const Label = styled.label`
  display: block;
  color: var(--secondary-color);
  font-weight: 600;
  margin-bottom: 0.5rem;
  font-size: 0.95rem;
`;

const InputContainer = styled.div`
  position: relative;
`;

const InputIcon = styled.div`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-color);
  opacity: 0.7;
  font-size: 1rem;
  z-index: 2;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  border: 2px solid ${props => props.isLight ? '#e5e7eb' : '#374151'};
  border-radius: var(--border-radius);
  background-color: ${props => props.isLight ? '#ffffff' : 'var(--card-bg-dark, #2a2a2a)'};
  color: var(--text-color);
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
  
  &::placeholder {
    color: var(--text-color);
    opacity: 0.5;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  border: 2px solid ${props => props.isLight ? '#e5e7eb' : '#374151'};
  border-radius: var(--border-radius);
  background-color: ${props => props.isLight ? '#ffffff' : 'var(--card-bg-dark, #2a2a2a)'};
  color: var(--text-color);
  font-size: 1rem;
  min-height: 150px;
  resize: vertical;
  transition: all 0.3s ease;
  font-family: inherit;
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
  
  &::placeholder {
    color: var(--text-color);
    opacity: 0.5;
  }
`;

const SubmitButton = styled.button`
  background-color: var(--primary-color);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: var(--border-radius);
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
  
  &:hover {
    background-color: var(--accent-color);
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(59, 130, 246, 0.3);
  }
  
  &:disabled {
    background-color: #6b7280;
    cursor: not-allowed;
    transform: none;
  }
`;

const SuccessMessage = styled(motion.div)`
  background-color: #10b981;
  color: white;
  padding: 1rem;
  border-radius: var(--border-radius);
  text-align: center;
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-weight: 600;
`;

const ErrorMessage = styled(motion.div)`
  background-color: #ef4444;
  color: white;
  padding: 1rem;
  border-radius: var(--border-radius);
  text-align: center;
  margin-top: 1rem;
  font-weight: 600;
`;

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const { isLight } = useContext(ThemeContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      await addDoc(collection(db, 'contactSubmissions'), {
        ...formData,
        timestamp: serverTimestamp(),
        read: false
      });

      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormContainer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <FormTitle>Send Me a Message</FormTitle>
      
      <Form onSubmit={handleSubmit}>
        <FormRow>
          <FormGroup>
            <Label htmlFor="name">Full Name *</Label>
            <InputContainer>
              <InputIcon>
                <FaUser />
              </InputIcon>
              <Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your full name"
                required
                isLight={isLight}
              />
            </InputContainer>
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="email">Email Address *</Label>
            <InputContainer>
              <InputIcon>
                <FaEnvelope />
              </InputIcon>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                required
                isLight={isLight}
              />
            </InputContainer>
          </FormGroup>
        </FormRow>
        
        <FormRow>
          <FormGroup>
            <Label htmlFor="phone">Phone Number</Label>
            <InputContainer>
              <InputIcon>
                <FaPhone />
              </InputIcon>
              <Input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="(555) 123-4567"
                isLight={isLight}
              />
            </InputContainer>
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="subject">Subject *</Label>
            <InputContainer>
              <InputIcon>
                <FaEnvelope />
              </InputIcon>
              <Input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="What's this about?"
                required
                isLight={isLight}
              />
            </InputContainer>
          </FormGroup>
        </FormRow>
        
        <FormGroup>
          <Label htmlFor="message">Message *</Label>
          <InputContainer>
            <InputIcon style={{ top: '1.5rem' }}>
              <FaPaperPlane />
            </InputIcon>
            <TextArea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell me about your project or how I can help you..."
              required
              isLight={isLight}
            />
          </InputContainer>
        </FormGroup>
        
        <SubmitButton type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            'Sending...'
          ) : (
            <>
              <FaPaperPlane />
              Send Message
            </>
          )}
        </SubmitButton>
      </Form>
      
      {submitStatus === 'success' && (
        <SuccessMessage
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <FaCheck />
          Message sent successfully! I'll get back to you soon.
        </SuccessMessage>
      )}
      
      {submitStatus === 'error' && (
        <ErrorMessage
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          Sorry, there was an error sending your message. Please try again.
        </ErrorMessage>
      )}
    </FormContainer>
  );
};

export default ContactForm;