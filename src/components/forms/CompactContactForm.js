import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { FaUser, FaEnvelope, FaPaperPlane, FaCheck } from 'react-icons/fa';
import { ThemeContext } from '../../contexts/ThemeContext';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase/config';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  
  @media (min-width: 576px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const FormGroup = styled.div`
  position: relative;
`;

const InputContainer = styled.div`
  position: relative;
`;

const InputIcon = styled.div`
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-color);
  opacity: 0.7;
  font-size: 0.9rem;
  z-index: 2;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 0.75rem 0.75rem 2.5rem;
  border: 2px solid ${props => props.isLight ? '#e5e7eb' : '#374151'};
  border-radius: var(--border-radius);
  background-color: ${props => props.isLight ? '#ffffff' : 'var(--card-bg-dark, #2a2a2a)'};
  color: var(--text-color);
  font-size: 0.9rem;
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
  padding: 0.75rem 0.75rem 0.75rem 2.5rem;
  border: 2px solid ${props => props.isLight ? '#e5e7eb' : '#374151'};
  border-radius: var(--border-radius);
  background-color: ${props => props.isLight ? '#ffffff' : 'var(--card-bg-dark, #2a2a2a)'};
  color: var(--text-color);
  font-size: 0.9rem;
  min-height: 100px;
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
  padding: 0.75rem 1.5rem;
  border-radius: var(--border-radius);
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  
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

const SuccessMessage = styled.div`
  background-color: #10b981;
  color: white;
  padding: 0.75rem;
  border-radius: var(--border-radius);
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-weight: 600;
  font-size: 0.9rem;
`;

const ErrorMessage = styled.div`
  background-color: #ef4444;
  color: white;
  padding: 0.75rem;
  border-radius: var(--border-radius);
  text-align: center;
  font-weight: 600;
  font-size: 0.9rem;
`;

const CompactContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
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
        phone: '', // No phone field in compact form
        timestamp: serverTimestamp(),
        read: false
      });

      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
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
    <>
      <Form onSubmit={handleSubmit}>
        <FormRow>
          <FormGroup>
            <InputContainer>
              <InputIcon>
                <FaUser />
              </InputIcon>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                required
                isLight={isLight}
              />
            </InputContainer>
          </FormGroup>
          
          <FormGroup>
            <InputContainer>
              <InputIcon>
                <FaEnvelope />
              </InputIcon>
              <Input
                type="email"
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
        
        <FormGroup>
          <InputContainer>
            <InputIcon>
              <FaEnvelope />
            </InputIcon>
            <Input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Subject"
              required
              isLight={isLight}
            />
          </InputContainer>
        </FormGroup>
        
        <FormGroup>
          <InputContainer>
            <InputIcon style={{ top: '1rem' }}>
              <FaPaperPlane />
            </InputIcon>
            <TextArea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your message..."
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
        <SuccessMessage>
          <FaCheck />
          Message sent successfully!
        </SuccessMessage>
      )}
      
      {submitStatus === 'error' && (
        <ErrorMessage>
          Sorry, there was an error. Please try again.
        </ErrorMessage>
      )}
    </>
  );
};

export default CompactContactForm;