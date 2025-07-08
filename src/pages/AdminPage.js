import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaCalendarAlt, FaCheck, FaTrash } from 'react-icons/fa';
import { ThemeContext } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { collection, query, orderBy, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useNavigate } from 'react-router-dom';
import ThemeBackground from '../components/theme/ThemeBackground';

const AdminContainer = styled(ThemeBackground)`
  min-height: 100vh;
  padding: 6rem 0 2rem 0;
`;

const AdminHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const AdminTitle = styled.h1`
  color: var(--secondary-color);
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const AdminSubtitle = styled.p`
  color: var(--text-color);
  font-size: 1.2rem;
`;

const SubmissionsContainer = styled.div`
  display: grid;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const SubmissionCard = styled(motion.div)`
  background-color: var(--card-bg);
  border-radius: var(--border-radius);
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border-left: 4px solid ${props => props.read ? '#10b981' : 'var(--primary-color)'};
  position: relative;
`;

const SubmissionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const SubmissionInfo = styled.div`
  flex: 1;
`;

const SubmissionName = styled.h3`
  color: var(--secondary-color);
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
`;

const SubmissionMeta = styled.div`
  display: flex;
  gap: 1.5rem;
  color: var(--text-color);
  font-size: 0.9rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  svg {
    color: var(--primary-color);
  }
`;

const SubmissionSubject = styled.h4`
  color: var(--secondary-color);
  font-size: 1.2rem;
  margin-bottom: 1rem;
`;

const SubmissionMessage = styled.p`
  color: var(--text-color);
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const ActionButton = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: var(--border-radius);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  
  &.mark-read {
    background-color: #10b981;
    color: white;
    
    &:hover {
      background-color: #059669;
    }
  }
  
  &.delete {
    background-color: #ef4444;
    color: white;
    
    &:hover {
      background-color: #dc2626;
    }
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  color: var(--text-color);
  font-size: 1.2rem;
  padding: 4rem 2rem;
`;

const LoadingState = styled.div`
  text-align: center;
  color: var(--text-color);
  font-size: 1.2rem;
  padding: 4rem 2rem;
`;

const AdminPage = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();
  const { isLight } = useContext(ThemeContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
      return;
    }

    const q = query(collection(db, 'contactSubmissions'), orderBy('timestamp', 'desc'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const submissionsData = [];
      querySnapshot.forEach((doc) => {
        submissionsData.push({ id: doc.id, ...doc.data() });
      });
      setSubmissions(submissionsData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [isAuthenticated, navigate]);

  const markAsRead = async (id) => {
    try {
      await updateDoc(doc(db, 'contactSubmissions', id), {
        read: true
      });
    } catch (error) {
      console.error('Error marking as read:', error);
    }
  };

  const deleteSubmission = async (id) => {
    if (window.confirm('Are you sure you want to delete this submission?')) {
      try {
        await deleteDoc(doc(db, 'contactSubmissions', id));
      } catch (error) {
        console.error('Error deleting submission:', error);
      }
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'No date';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <AdminContainer>
      <div className="container">
        <AdminHeader>
          <AdminTitle>Admin Dashboard</AdminTitle>
          <AdminSubtitle>Manage contact form submissions</AdminSubtitle>
        </AdminHeader>

        {loading ? (
          <LoadingState>Loading submissions...</LoadingState>
        ) : submissions.length === 0 ? (
          <EmptyState>No contact submissions yet.</EmptyState>
        ) : (
          <SubmissionsContainer>
            {submissions.map((submission, index) => (
              <SubmissionCard
                key={submission.id}
                read={submission.read}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <SubmissionHeader>
                  <SubmissionInfo>
                    <SubmissionName>{submission.name}</SubmissionName>
                    <SubmissionMeta>
                      <MetaItem>
                        <FaEnvelope />
                        <a href={`mailto:${submission.email}`}>{submission.email}</a>
                      </MetaItem>
                      {submission.phone && (
                        <MetaItem>
                          <FaPhone />
                          <a href={`tel:${submission.phone}`}>{submission.phone}</a>
                        </MetaItem>
                      )}
                      <MetaItem>
                        <FaCalendarAlt />
                        {formatDate(submission.timestamp)}
                      </MetaItem>
                    </SubmissionMeta>
                  </SubmissionInfo>
                </SubmissionHeader>

                <SubmissionSubject>{submission.subject}</SubmissionSubject>
                <SubmissionMessage>{submission.message}</SubmissionMessage>

                <ActionButtons>
                  {!submission.read && (
                    <ActionButton 
                      className="mark-read"
                      onClick={() => markAsRead(submission.id)}
                    >
                      <FaCheck />
                      Mark as Read
                    </ActionButton>
                  )}
                  <ActionButton 
                    className="delete"
                    onClick={() => deleteSubmission(submission.id)}
                  >
                    <FaTrash />
                    Delete
                  </ActionButton>
                </ActionButtons>
              </SubmissionCard>
            ))}
          </SubmissionsContainer>
        )}
      </div>
    </AdminContainer>
  );
};

export default AdminPage;