// src/pages/ProjectDetail.js
// Simple project overview page for each featured project (/projects/:id).
// The older long-form case studies are archived in src/archive/case-studies/.
import React, { useEffect } from 'react';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaArrowLeft, FaExternalLinkAlt } from 'react-icons/fa';
import { getProjectById, ROLE } from '../data/projects';

const PageContainer = styled.div`
  padding: 120px 0 5rem;
  background-color: var(--background-color);
  min-height: 100vh;
`;

const Narrow = styled.div`
  max-width: 860px;
  margin: 0 auto;
`;

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  min-height: 44px;
  color: var(--primary-color);
  font-weight: 600;
  margin-bottom: 1.5rem;

  &:hover {
    text-decoration: underline;
  }
`;

const Category = styled.p`
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--primary-color);
  margin-bottom: 0.5rem;
`;

const Title = styled.h1`
  font-size: clamp(2.25rem, 5vw, 3rem);
  line-height: 1.15;
  color: var(--secondary-color);
  margin-bottom: 1rem;
`;

const Summary = styled.p`
  font-size: 1.25rem;
  color: var(--text-color);
  margin-bottom: 1.5rem;
`;

const MetaRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem 1.5rem;
  margin-bottom: 2.5rem;
`;

const RoleBadge = styled.p`
  display: inline-block;
  padding: 0.4rem 0.9rem;
  border-radius: 30px;
  border: 1px solid var(--primary-color);
  color: var(--secondary-color);
  font-weight: 600;
  font-size: 0.95rem;
`;

const LiveLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  min-height: 44px;
  padding: 0.6rem 1.25rem;
  border-radius: var(--border-radius);
  background-color: var(--primary-fill);
  color: var(--on-primary);
  font-weight: 600;

  &:hover {
    background-color: var(--accent-fill);
  }
`;

const Screenshot = styled.figure`
  margin: 0 0 3rem;
  border-radius: var(--border-radius);
  overflow: hidden;
  border: 1px solid var(--border-color);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);

  img {
    width: 100%;
    height: auto;
  }
`;

const Section = styled.section`
  margin-bottom: 2.5rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  color: var(--secondary-color);
  margin-bottom: 1rem;
`;

const Body = styled.p`
  font-size: 1.05rem;
  line-height: 1.75;
  color: var(--text-color);
`;

const FocusList = styled.ul`
  padding-left: 1.25rem;

  li {
    margin-bottom: 0.6rem;
    line-height: 1.6;
    color: var(--text-color);
  }
`;

const ToolList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  list-style: none;
  padding: 0;

  li {
    padding: 0.35rem 0.75rem;
    border-radius: 4px;
    border: 1px solid var(--border-color);
    color: var(--secondary-color);
    font-size: 0.9rem;
  }
`;

const NotFoundBox = styled.div`
  text-align: center;
  padding: 4rem 0;

  h1 {
    color: var(--secondary-color);
    margin-bottom: 1rem;
  }
`;

const ProjectDetail = () => {
  const { id } = useParams();
  const project = getProjectById(id);

  useDocumentTitle(project ? project.name : 'Project not found');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [project]);

  if (!project) {
    return (
      <PageContainer>
        <div className="container">
          <NotFoundBox>
            <h1>Project not found</h1>
            <BackLink to="/projects">
              <FaArrowLeft aria-hidden="true" /> Back to projects
            </BackLink>
          </NotFoundBox>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <div className="container">
        <Narrow>
          <BackLink to="/projects">
            <FaArrowLeft aria-hidden="true" /> Back to projects
          </BackLink>

          <Category>{project.category}</Category>
          <Title>{project.title}</Title>
          <Summary>{project.summary}</Summary>

          <MetaRow>
            <RoleBadge>Role: {ROLE}</RoleBadge>
            <LiveLink href={project.liveUrl} target="_blank" rel="noopener noreferrer">
              Visit {project.name}
              <FaExternalLinkAlt aria-hidden="true" />
              <span className="visually-hidden"> (opens in a new tab)</span>
            </LiveLink>
          </MetaRow>

          <Screenshot>
            <img src={project.imageUrl} alt={project.imageAlt} width="1440" height="720" />
          </Screenshot>

          <Section aria-labelledby="overview-heading">
            <SectionTitle id="overview-heading">Overview</SectionTitle>
            <Body>{project.overview}</Body>
          </Section>

          <Section aria-labelledby="design-heading">
            <SectionTitle id="design-heading">Design approach</SectionTitle>
            <FocusList>
              {project.designFocus.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </FocusList>
          </Section>

          <Section aria-labelledby="tools-heading">
            <SectionTitle id="tools-heading">Tools</SectionTitle>
            <ToolList>
              {project.tools.map((tool) => (
                <li key={tool}>{tool}</li>
              ))}
            </ToolList>
          </Section>
        </Narrow>
      </div>
    </PageContainer>
  );
};

export default ProjectDetail;
