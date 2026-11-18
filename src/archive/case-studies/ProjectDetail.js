import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import styled from 'styled-components';
import { FaArrowLeft, FaExternalLinkAlt, FaEnvelope } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { ThemeContext } from '../contexts/ThemeContext';

const PageContainer = styled.div`
  padding-top: 80px;
  min-height: 100vh;
  background-color: ${props => props.isLight ? 'var(--background-color)' : 'var(--background-color)'};
  transition: background-color 0.5s ease;
`;

const HeroSection = styled.div`
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--accent-color) 100%);
  padding: 4rem 0 6rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='rgba(255,255,255,0.05)' fill-rule='evenodd'/%3E%3C/svg%3E");
    opacity: 0.3;
  }
`;

const BackLink = styled.button`
  display: inline-flex;
  align-items: center;
  color: white;
  font-weight: 500;
  margin-bottom: 2rem;
  transition: all 0.3s ease;
  position: relative;
  z-index: 2;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;

  svg {
    margin-right: 0.5rem;
    transition: transform 0.3s ease;
  }

  &:hover {
    transform: translateX(-5px);

    svg {
      transform: translateX(-3px);
    }
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  text-align: center;
  color: white;
`;

const ProjectCategory = styled.div`
  display: inline-block;
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
  padding: 0.5rem 1.5rem;
  border-radius: 30px;
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const ProjectTitle = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
  color: white;
  font-weight: 700;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const ProjectSummary = styled.p`
  font-size: 1.25rem;
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.8;
  opacity: 0.95;
`;

const ImageSection = styled.div`
  margin-top: -3rem;
  position: relative;
  z-index: 3;
  padding: 0 0 4rem;
`;

const ProjectImageContainer = styled.div`
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
  background-color: ${props => props.isLight ? '#f5f5f5' : '#1e1e1e'};
  max-width: 1000px;
  margin: 0 auto;
`;

const ProjectImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
  object-fit: contain;
`;

const ContentSection = styled.section`
  padding: 3rem 0 5rem;
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 4rem;

  @media (min-width: 992px) {
    grid-template-columns: 1fr 280px;
  }
`;

const MainContent = styled.div`
  max-width: 900px;
`;

const TableOfContents = styled.div`
  display: none;

  @media (min-width: 992px) {
    display: block;
    position: sticky;
    top: 120px;
    align-self: start;
    max-height: calc(100vh - 150px);
    overflow-y: auto;
    padding: 1.5rem;
    background-color: var(--card-bg);
    border-radius: var(--border-radius);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  }
`;

const TOCTitle = styled.h3`
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: ${props => props.isLight ? 'var(--secondary-color-light)' : 'var(--secondary-color-dark)'};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const TOCList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const TOCItem = styled.li`
  margin-bottom: 0.75rem;
`;

const TOCLink = styled.a`
  display: block;
  font-size: 0.9rem;
  color: var(--text-color);
  text-decoration: none;
  padding: 0.4rem 0;
  transition: all 0.2s ease;
  border-left: 2px solid transparent;
  padding-left: 0.75rem;
  line-height: 1.4;

  &:hover {
    color: var(--primary-color);
    border-left-color: var(--primary-color);
    padding-left: 1rem;
  }

  &.active {
    color: var(--primary-color);
    font-weight: 600;
    border-left-color: var(--primary-color);
  }
`;

const TOCSubItem = styled(TOCItem)`
  margin-left: 1rem;
  font-size: 0.85rem;

  ${TOCLink} {
    opacity: 0.8;
  }
`;

const Section = styled.div`
  margin-bottom: 3rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.75rem;
  margin-bottom: 1.5rem;
  color: ${props => props.isLight ? 'var(--secondary-color-light)' : 'var(--secondary-color-dark)'};
  font-weight: 700;
  position: relative;
  padding-bottom: 0.75rem;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 60px;
    height: 3px;
    background: linear-gradient(to right, var(--primary-color), var(--accent-color));
  }
`;

const SectionContent = styled.div`
  line-height: 1.9;
  color: var(--text-color);
  font-size: 1.05rem;

  strong {
    font-weight: 700;
    font-size: 1.05rem;
    color: ${props => props.isLight ? 'var(--secondary-color-light)' : 'var(--secondary-color-dark)'};
  }

  p {
    margin-bottom: 1.25rem;
  }

  ul {
    margin: 1rem 0 1.5rem 1.5rem;

    li {
      margin-bottom: 0.5rem;
      position: relative;
      padding-left: 0.5rem;

      &::marker {
        color: var(--primary-color);
      }
    }
  }

  ol {
    margin: 1rem 0 1.5rem 1.5rem;

    li {
      margin-bottom: 0.5rem;
      position: relative;
      padding-left: 0.5rem;

      &::marker {
        color: var(--primary-color);
        font-weight: 600;
      }
    }
  }

  /* Case study h2 headings - override any default spacing */
  h2 {
    font-size: 1.75rem !important;
    font-weight: 700 !important;
    margin: 2rem 0 0.5rem 0 !important;
    padding-top: 1rem !important;
    border-top: 2px solid rgba(59, 130, 246, 0.2) !important;
    color: var(--secondary-color) !important;
    scroll-margin-top: 120px;
  }

  /* Case study h3 headings - override any default spacing */
  h3 {
    font-size: 1.2rem !important;
    font-weight: 600 !important;
    margin: 1.5rem 0 0.5rem 0 !important;
    color: var(--secondary-color) !important;
    scroll-margin-top: 120px;
  }

  /* Inline paragraphs for subsections */
  p strong {
    display: inline;
    font-size: 1.05rem;
  }
`;

const CaseStudyImage = styled.img`
  width: 100%;
  max-width: 800px;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  margin: 2rem 0;
  display: block;
  object-fit: contain;
  background-color: ${props => props.isLight ? '#f5f5f5' : '#1e1e1e'};
`;

const ImageCaption = styled.p`
  font-size: 0.9rem;
  color: var(--text-color);
  opacity: 0.7;
  font-style: italic;
  text-align: center;
  margin-top: -1rem;
  margin-bottom: 2rem;
`;

// Mobile screenshot styles
const MobileScreenshot = styled.img`
  max-width: 280px;
  height: auto;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  margin: 1.5rem auto;
  display: block;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: ${props => props.isLight ? '#f5f5f5' : '#1e1e1e'};

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.25);
  }

  @media (max-width: 768px) {
    max-width: 240px;
  }
`;

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin: 2rem 0;
  justify-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const ImageModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.95);
  z-index: 999999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  cursor: pointer;
`;

const ModalImage = styled.img`
  max-width: 90%;
  max-height: 90vh;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
`;

const CloseModalButton = styled.button`
  position: fixed;
  top: 2rem;
  right: 2rem;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid white;
  color: white;
  font-size: 2rem;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 1000000;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: rotate(90deg);
  }
`;

const SidebarCard = styled.div`
  background-color: var(--card-bg);
  border-radius: var(--border-radius);
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  margin-bottom: 2rem;
`;

const SidebarTitle = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 1.25rem;
  color: ${props => props.isLight ? 'var(--secondary-color-light)' : 'var(--secondary-color-dark)'};
  font-weight: 600;
`;

const TechList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
`;

const TechItem = styled.div`
  background-color: ${props => props.isLight ? '#f0f4f8' : 'rgba(255, 255, 255, 0.1)'};
  color: ${props => props.isLight ? 'var(--secondary-color-light)' : 'var(--secondary-color-dark)'};
  padding: 0.6rem 1.2rem;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s ease;

  &:hover {
    background-color: rgba(59, 130, 246, 0.15);
    color: var(--primary-color);
    transform: translateY(-2px);
  }
`;

const FeaturesList = styled.ul`
  list-style-position: outside;
  margin-left: 1.25rem;

  li {
    margin-bottom: 1rem;
    line-height: 1.6;
    color: var(--text-color);
    padding-left: 0.5rem;

    &::marker {
      color: var(--primary-color);
    }
  }
`;

const CTASection = styled.div`
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--accent-color) 100%);
  padding: 3rem 2rem;
  border-radius: 12px;
  text-align: center;
  color: white;
`;

const CTATitle = styled.h3`
  font-size: 1.75rem;
  margin-bottom: 1rem;
  font-weight: 700;
`;

const CTAText = styled.p`
  font-size: 1.1rem;
  margin-bottom: 2rem;
  opacity: 0.95;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
`;

const Button = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 2rem;
  background-color: ${props => props.primary ? 'white' : 'transparent'};
  color: ${props => props.primary ? 'var(--primary-color)' : 'white'};
  border: 2px solid white;
  border-radius: var(--border-radius);
  font-weight: 600;
  font-size: 1.05rem;
  transition: all 0.3s ease;
  text-decoration: none;
  cursor: pointer;

  svg {
    margin-right: ${props => props.primary ? '0.75rem' : '0'};
    margin-left: ${props => props.primary ? '0' : '0.75rem'};
    font-size: 1rem;
  }

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    background-color: ${props => props.primary ? '#f0f0f0' : 'white'};
    color: var(--primary-color);
  }
`;

const LoadingContainer = styled.div`
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoadingSpinner = styled.div`
  width: 50px;
  height: 50px;
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top-color: var(--primary-color);
  animation: spin 1s linear infinite;

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 3rem 0;

  h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
    color: ${props => props.isLight ? 'var(--secondary-color-light)' : 'var(--secondary-color-dark)'};
  }

  p {
    font-size: 1.1rem;
    margin-bottom: 2rem;
    color: var(--text-color);
  }
`;

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalImage, setModalImage] = useState(null);
  const { isLight } = useContext(ThemeContext);

  const handleBackToProjects = () => {
    window.location.href = '/projects';
  };

  // Fallback project data
  const customProjects = [
    {
      id: 'eudo',
      title: 'HR Analytics & Experimentation Platform',
      category: 'UX Engineer & Co-Founder',
      summary: 'Internal analytics tool designed to streamline HR experiment delivery and measurement using difference-in-differences methodology.',
      description: `**The Challenge: Inefficient HR Analytics Delivery**

HR consultancies spend 10+ hours manually setting up experiment tracking systems for each client. Without standardized tools, the process of designing controlled experiments, organizing data, and calculating impact metrics is time-consuming, error-prone, and difficult to scale.

Eudo was created to solve this internal efficiency problem by building a web application that standardizes experiment setup, automates data processing, and showcases our analytical methodology to potential clients.

**My Role: Co-Founder & Software Engineer**

I joined Eudo as a co-founder in October 2024 in my official role as Software Engineer. In this capacity, I designed and developed the entire platform—owning both the user experience design and technical implementation.

**Responsibilities:**

- Designing the complete UX/UI for the HR analytics web application in Figma
- Developing the full-stack application using React, TypeScript, Next.js, Node.js, Firebase, and BigQuery
- Refining and improving usability of the founder's initial Google AI Studio prototypes
- Translating founder feedback from HR professional conversations into product features
- Creating technical tools for complex HR measurement and experiment tracking
- Leveraging AI tools to accelerate development while maintaining code quality and user experience

**Timeline:** October 2024 to Present (4 months and ongoing)

**Current Status:** In active development. Platform not yet live. Building internal tool to increase delivery efficiency and showcase methodology.

**[IMAGE: Main Dashboard]**

**Discovery & Requirements Gathering**

Working directly with the founder (who conducts all HR professional conversations), I receive secondhand insights about HR professional needs. The founder communicates feedback from HR professionals, which I translate into UX requirements and product features.

**The Context:**

The founder is currently gathering feedback from HR professionals about the overall concept and methodology. We plan to deliver HR analytics services initially without the fully functional web app. The web app is being built primarily to:

- Increase internal efficiency when delivering analytics to clients
- Showcase our methodology and capabilities to potential clients
- Standardize the experiment setup and tracking process
- Eventually transition to a client-facing SaaS platform

**Building on Initial Prototypes**

The founder created initial UI concepts using Google AI Studio. My role has been to:

- Refine those initial concepts into a cohesive, usable application
- Improve information architecture and user flows
- Design all components and screens for the complete platform
- Ensure the UX supports complex statistical methodology while remaining accessible
- Develop the application using AI-assisted full-stack development

**Design Approach**

Given my dual role as both designer and developer on a startup with limited resources, I focused on:

1. **Efficiency First:** Designing workflows that minimize setup time and reduce errors
2. **Data Integrity:** Ensuring every design decision supports accurate experimental methodology
3. **Progressive Complexity:** Revealing advanced features only when users need them
4. **Internal Tool Mindset:** Prioritizing functionality and accuracy over marketing polish
5. **Scalability:** Building foundations that can transition to client-facing use

**Information Architecture: The Experiment Lifecycle**

I designed an 8-phase intervention management system to standardize how we set up and track client experiments:

1. **Diagnostic:** Baseline employee experience measurement
2. **Pilot Design:** Hypothesis and intervention definition
3. **Organization:** Treatment and control group assignment
4. **Periods:** Timeline configuration for before/after measurement
5. **Metrics:** KPI definition and tracking setup
6. **Financials:** ROI calculation framework
7. **Data Intake:** Client data upload and processing
8. **Pilot Results:** Difference-in-differences analysis output

**[IMAGE: Diagnostic Dashboard]**

**Key Design Challenges & Solutions**

**Challenge 1: Making Statistical Methodology Accessible**

Problem: Difference-in-differences analysis is complex. How do we make it usable for our internal team and eventually for clients?

Solution: I designed guided workflows with clear prompts at each step. Instead of presenting users with blank forms, the interface asks specific questions ("What metric do you expect to change?" "By how much?") that guide proper experimental design.

**[IMAGE: Pilot Design]**

**Challenge 2: Preventing Configuration Errors**

Problem: Manual experiment setup led to timeline misalignments, missing control groups, and invalid comparisons.

Solution: I created validation checkpoints and auto-generation tools. For example, the Period Wizard automatically generates quarterly timelines aligned to intervention dates, eliminating manual calculation errors.

**Challenge 3: Visualizing Multi-Dimensional Data**

Problem: HR data needs to be filtered by department, location, job level, and other dimensions. How do we make this intuitive without overwhelming users?

Solution: I designed a card-based diagnostic dashboard with collapsible filters. Users see high-level insights immediately, then can drill down into specific employee segments when needed.

**Challenge 4: Balancing Speed with Rigor**

Problem: We need to work fast internally, but we can't compromise on experimental validity.

Solution: I built templates and wizards that speed up common tasks while enforcing proper methodology. The interface won't let you proceed without proper control groups or valid timelines.

**[IMAGE: Organization Setup]**

**Technical Implementation**

As the AI-assisted full-stack developer, I'm building the platform using:

- **Frontend:** React for component-based UI
- **Backend:** Node.js for API and data processing
- **Database:** Firebase for real-time data management
- **Analytics:** BigQuery for large-scale statistical analysis

**My Development Process:**

1. Design UX/UI in Figma (when time allows) or directly in code
2. Use AI assistance to implement complex features quickly
3. Iterate based on founder feedback from HR professional conversations
4. Test workflows internally to identify friction points
5. Refine and optimize for our delivery process

**[IMAGE: Period Configuration]**

**Current Progress & Learnings**

**What's Working:**

- The experiment lifecycle structure provides clear progression through complex setup
- Auto-generation tools (like Period Wizard) significantly reduce setup time
- Card-based data visualization makes insights quickly scannable
- Founder feedback loop allows rapid iteration on features

**What I'm Still Refining:**

- Data upload and validation workflows need more error handling
- Complex filtering interactions require UX simplification
- ROI calculation interface needs clearer guidance
- Mobile responsiveness for future client-facing use

**[IMAGE: Metrics Definition]**

**What This Project Has Taught Me**

**Designing Without Direct User Access:**

This project taught me to design based on secondhand feedback. I don't talk directly to HR professionals; I receive insights filtered through the founder. This requires asking better questions, validating assumptions through competitive research, and designing with flexibility for future iteration when we do get direct user feedback.

**Startup Constraints Drive Creativity:**

Limited resources forced me to be ruthlessly pragmatic. Every feature needs to justify its development time. I learned to design the simplest solution that solves the core problem, then iterate only when feedback demands it.

**Dual Role Benefits:**

Being both designer and developer fundamentally changed my design process. I consider technical feasibility at every step. I know which designs will be quick to build vs. which will require complex logic. This makes me a more pragmatic, efficient designer.

**Building for Two Audiences:**

Designing an internal tool that will eventually become client-facing requires thinking two steps ahead. Current decisions affect how easily we can transition to self-service. I'm learning to build scalable foundations even when current needs are simple.

**Development Constraints & Solutions**

As designer and developer, I balanced UX vision with technical realities. Each constraint required creative problem-solving:

- **Constraint:** Limited development experience
- **Solution:** Used AI-assisted coding to implement all designs effectively

- **Constraint:** Complex multi-platform functionality
- **Solution:** Built features incrementally, testing each before adding the next

- **Constraint:** Budget and timeline limitations
- **Solution:** Prioritized features based on stakeholder needs, delivering core functionality first

- **Constraint:** Need for statistical rigor
- **Solution:** Implemented validation checkpoints and automated wizards to enforce proper methodology

**Next Steps**

**Immediate Priorities:**

- Complete core experiment tracking features
- Improve data upload and validation workflows
- Add export functionality for client deliverables
- Test platform with pilot client experiments

**Future Vision:**

Once we validate the methodology and land initial clients using the internal tool, we'll transition to a client-facing SaaS platform. The UX groundwork I'm laying now will determine how smooth that transition is.

**Reflection**

This project is teaching me what it means to design and build a product from scratch as a co-founder. There's no formal research budget, no established users, and no design team. Just me, the founder, and the challenge of creating something valuable with limited resources. It's messy, it's iterative, and it's incredibly educational.`,
      technologies: ['React', 'Node.js', 'Firebase', 'BigQuery', 'Figma', 'Data Visualization', 'Information Architecture', 'AI-Assisted Development', 'UX Design', 'Full-Stack Development'],
      imageUrl: '/assets/images/eudo/eudo7.png',
      projectUrl: 'https://eudo.co',
      features: [
        'Co-founder role combining UX design and AI-assisted development',
        'Complete UX/UI design for HR analytics web application',
        'Refined Google AI Studio prototypes into cohesive platform',
        '8-phase experiment lifecycle management system',
        'React, Node.js, Firebase, and BigQuery technical stack',
        'Card-based diagnostic dashboard with multi-dimensional filtering',
        'Automated Period Wizard for timeline configuration',
        'Internal tool designed for delivery efficiency and client showcase',
        'Designing based on founder feedback from HR professionals',
        'Building scalable foundation for future client-facing transition'
      ]
    },
    {
      id: 'efilmhub',
      title: 'eFilmHub: All-in-One Film Industry Platform for Africa',
      category: 'Product Design & Development',
      summary: 'Designed and built a comprehensive platform consolidating film industry tools for African filmmakers, combining portfolio hosting, talent discovery, job posting, equipment marketplace, and social networking.',
      description: `**The Challenge: Fragmented Tools for African Filmmakers**

African filmmakers face a unique infrastructure challenge: existing platforms like IMDb, Backstage, and FilmFreeway are built for Western markets and don't address the specific needs of African film professionals. The continent has limited internet connectivity (~37%), restricted payment infrastructure, expensive data costs, and no centralized platform designed specifically for African filmmakers.

Without dedicated infrastructure, African film professionals rely on fragmented WhatsApp groups, informal Facebook networks, and word-of-mouth connections. Production teams struggle to find crew, equipment sharing is risky, and talented professionals remain undiscovered.

eFilmHub was created to solve this problem. Africa's first all-in-one film industry platform combining the functionality of multiple existing tools into one streamlined experience tailored to African filmmakers' needs.

**My Role: Software & UX Engineer**

I served in my official role as Software & UX Engineer, designing and developing the entire platform. Working in close collaboration with eFilmHub's CTO and CFO, I owned both the user experience design and technical implementation—translating stakeholder requirements into a fully functional web application.

**Responsibilities:**

- Translating stakeholder business requirements into user experience designs in Figma
- Conducting competitive analysis of IMDb, Backstage, and other film platforms
- Developing the full-stack application using React, TypeScript, Next.js, Node.js, and GCP
- Designing and building responsive frontend components for talent discovery and networking
- Iterative feature design and implementation based on stakeholder feedback
- Leveraging AI tools to accelerate development while maintaining code quality
- Testing functionality and fixing bugs throughout development

**Timeline:** 8 months from initial design to launch

**Discovery & Requirements Gathering**

Working directly with eFilmHub's leadership team (CTO and CFO), I gathered detailed requirements about what the platform needed to accomplish:

**Business Goals Communicated by Stakeholders:**

- Create a one-stop platform for African film professionals
- Combine functionality that currently requires 5+ different tools
- Support filmmaker portfolios, talent discovery, job posting, equipment rental, and networking
- Build trust infrastructure (ratings, verification) for safe equipment sharing
- Enable cross-border collaboration within African film communities

**The African Film Industry Context:**

Through stakeholder discussions and industry research, I learned about the systemic barriers facing African filmmakers:

- Limited payment infrastructure (though mobile payments like M-Pesa exist)
- Limited internet connectivity (~37% in sub-Saharan Africa)
- High data costs relative to income levels
- Existing platforms (FilmFreeway, Backstage, IMDb) don't serve African market needs
- Film industry infrastructure gaps, with fewer than 2,000 cinema screens across the continent
- Explosive growth potential, as Nollywood is the world's second-largest film industry by volume

**Competitive Analysis**

I analyzed existing platforms to identify UI/UX patterns and opportunities:

**IMDb:**

- Strengths: Comprehensive film database, robust rating system, professional credibility
- Gaps: No hiring tools, no networking features, not Africa-focused
- UX Lessons: Clean information hierarchy, visual film cards, rating/review systems

**Backstage:**

- Strengths: Casting and job posting tools, talent search
- Gaps: US-centric, expensive, limited portfolio features
- UX Lessons: Job posting flows, talent filtering, application tracking

**Key Insight:** No platform combines discovery, hiring, social networking, and equipment marketplace, especially not tailored to African filmmakers. eFilmHub's opportunity was to consolidate these into one platform.

**The UX Challenge: Integrating Multiple Platforms**

The core design challenge was integrating functionality from multiple platforms (IMDb's film ratings, Backstage's casting tools, LinkedIn's networking, marketplace features) into one coherent user experience without overwhelming users.

**Approach:**

- Designed features one at a time based on stakeholder priorities
- Created the homepage first as the central hub, implementing each section iteratively
- Used competitive best practices adapted for African users' needs
- Prioritized mobile-first design given connectivity constraints

**Information Architecture: The Hub Model**

I designed a hub-and-spoke architecture organizing platform functionality into integrated modules:

**1. User Profiles & Portfolios**

Film is a visual medium, so I designed profiles to showcase work first, credentials second. Each profile includes visual media galleries, filmography with project links and ratings, skills and certifications, availability status, and social following metrics.

**[IMAGE: Profile Page]**

**2. Talent Discovery & Search**

The search interface needed to support complex filtering while remaining accessible on mobile devices. I implemented advanced filtering by role, location, skills, and availability, with visual portfolio browsing and saved search capabilities.

**[IMAGE: Search & Filter]**

**3. Job Board & Casting**

Stakeholders emphasized the need to streamline job posting for busy production teams. I created job posting templates for common roles (Director, DP, Gaffer, etc.) with application tracking, messaging integration, and budget transparency features to reduce negotiation friction.

**[IMAGE: Job Posting Flow]**

**4. Equipment Marketplace**

One of the biggest challenges African filmmakers face is accessing quality equipment. I designed a marketplace with detailed equipment listings including photos, specifications, and rates. The booking calendar prevents scheduling conflicts, and the rating system builds trust between renters and owners. Rental agreement templates protect both parties.

**[IMAGE: Equipment Grid]**

**5. Social & Community Features**

Rather than creating generic social networking, I integrated community features contextually. Users can follow other professionals, post updates, join community chat groups (pre-made topics or custom groups), send direct messages, and rate films they've worked on or watched.

**[IMAGE: Messaging Interface]**

**Iterative Design Process**

My design process followed a tight stakeholder collaboration loop:

**Step 1: Stakeholder Requirements**

Stakeholders provided specific, detailed functionality requests. For example: "The hub community chats should have pre-made conversations based on film topics, and users should be able to create new groups."

**Step 2: Design in Figma**

I translated each requirement into UI/UX designs, applying:

- Competitive best practices from IMDb and Backstage
- Mobile-first design principles
- Visual-first layouts prioritizing media over text
- Clear navigation and information hierarchy

**Step 3: AI-Assisted Development**

As the developer with limited hand-coding experience, I used AI assistance to:

- Implement designs as fully functional features
- Integrate complex functionality across the platform
- Debug and test each feature
- Handle constraints of timeline and budget

**Step 4: Stakeholder Feedback & Iteration**

After implementing each feature, I presented it to stakeholders who:

- Used the functionality and provided feedback
- Identified bugs and necessary adjustments
- Requested new features or refinements

This feedback loop continued throughout the project, shaping the final product.

**Key Design Decisions**

**1. Mobile-First Everything**

Given Africa's smartphone-primary internet access and connectivity constraints, every feature was designed mobile-first:

- Touch-friendly UI (minimum 44px tap targets)
- Bottom navigation for thumb-reachable actions
- Infinite scroll instead of pagination
- Collapsed filters with progressive disclosure
- Optimized image loading for slow connections

**2. Visual Portfolios Over Text**

Film is a visual medium, so profiles prioritize media:

- Hero video reels showcasing work
- Grid layouts with visual project previews
- Photo galleries instead of text-heavy descriptions
- Quick visual assessment of talent

**3. Trust & Verification Systems**

To address safety concerns with equipment rental and hiring:

- 5-star rating systems for users and equipment
- Verified profile badges
- Rental agreement templates
- Review and endorsement features
- Dispute resolution processes

**4. Consolidated Navigation**

Integrating multiple platform types required clear navigation:

- Persistent bottom nav on mobile (Home, Discover, Messages, Profile)
- Tabbed interfaces within sections
- Breadcrumb navigation for complex flows
- Search functionality across all content types

**Design System**

Created a scalable design system to maintain consistency across all features:

- **Colors:** Cinematic Gold (warmth/creativity), Deep Charcoal (professionalism), Vibrant Teal (CTAs)
- **Typography:** Montserrat for headings, Inter for body text (mobile-optimized)
- **Components:** Reusable profile cards, filter chips, media galleries, action buttons
- **Spacing:** Consistent 8px grid system, touch-friendly spacing on mobile

**Development Constraints & Solutions**

As designer and developer, I balanced UX vision with technical realities. Each constraint required creative problem-solving:

**Constraint:** Limited development experience
**Solution:** Used AI-assisted coding to implement all designs effectively

**Constraint:** Complex multi-platform functionality
**Solution:** Built features incrementally, testing each before adding the next

**Constraint:** Budget and timeline limitations
**Solution:** Prioritized features based on stakeholder needs, delivering core functionality first

**Constraint:** African connectivity challenges
**Solution:** Implemented lazy loading, image optimization, and progressive enhancement

**Platform Launch & Impact**

**Current Traction:**

- **100+ active users** on the platform
- **13 active businesses** using eFilmHub for their operations
- **Active partnership discussions** with agencies and film organizations
- **African-based users** connecting with other film industry professionals across the continent

**User Feedback:**

Many early users are partnered with eFilmHub to provide feedback and help with debugging, contributing to ongoing platform refinement. Their insights have been invaluable in identifying edge cases and improving core workflows.

**What This Project Taught Me**

**Translating Stakeholder Requirements into User-Centered Design:**
Without formal user research, I had to rely heavily on stakeholder expertise and industry knowledge. This taught me to ask better questions, validate assumptions through competitive analysis, and design with empathy based on contextual understanding rather than direct user feedback.

**Designing for Underserved Markets:**
This project deepened my understanding of designing for emerging markets. Western UX patterns don't always translate. Mobile-first isn't optional, data efficiency matters, and trust infrastructure is critical where formal systems don't exist. The constraints forced me to be more thoughtful about every design decision.

**Balancing Multiple Platform Paradigms:**
Consolidating IMDb's database structure, Backstage's job flows, LinkedIn's networking, and marketplace functionality into one coherent experience was the core UX challenge. I learned to create clear information hierarchy and navigation that doesn't overwhelm users despite the platform's breadth.

**The Dual Role Challenge:**
Being both designer and developer shaped my design process fundamentally. I had to consider technical feasibility at every step, which made me a more pragmatic designer. I learned to prioritize ruthlessly, focusing on features that delivered maximum impact within development constraints. This dual perspective helped me create designs that were both user-friendly and technically achievable.

**Working Within Real Constraints:**
Budget and timeline limitations forced me to make hard decisions about feature prioritization. I learned that shipping a focused, well-executed core feature set is better than trying to build everything at once. The stakeholder feedback loop helped validate these decisions iteratively.

**Next Steps**

eFilmHub continues to evolve based on user feedback and business goals. The platform represents a significant step toward creating the centralized ecosystem African filmmakers need to compete globally, consolidating fragmented tools into one platform tailored specifically to their needs. As the user base grows, we'll continue refining core features and exploring new opportunities to serve the African film community.

`,
      technologies: ['Figma', 'Product Design', 'Stakeholder Collaboration', 'Competitive Analysis', 'Information Architecture', 'Mobile-First Design', 'Design Systems', 'AI-Assisted Development', 'React', 'Firebase', 'Responsive Design', 'UX Strategy'],
      imageUrl: '/assets/images/efilmhub.png',
      projectUrl: 'https://efilmhub.com',
      features: [
        'Stakeholder collaboration translating business requirements into UX',
        'Competitive analysis of IMDb, Backstage, and film industry platforms',
        'Information architecture consolidating 5+ platform types',
        'Mobile-first responsive design optimized for African connectivity',
        'Visual portfolio system with media galleries and film ratings',
        'Job posting and talent discovery with advanced filtering',
        'Equipment marketplace with trust infrastructure and ratings',
        'Social networking with community chats and individual messaging',
        'Full-stack AI-assisted development and deployment',
        'Iterative design based on stakeholder feedback'
      ]
    },
    {
      id: 'lpwealthgroup',
      title: 'LP Wealth Group: Financial Services Website Redesign',
      category: 'UX Design & Development',
      summary: 'Complete website redesign and development for a financial services firm targeting student athletes and investors, transforming a self-made site into a professional platform that confidently communicates complex financial services.',
      description: `**The Challenge: Unprofessional Web Presence Limiting Growth**

LP Wealth Group, a financial services firm specializing in high cash value life insurance for student athletes and investors, faced a critical problem: their self-made website wasn't representing their expertise or supporting their business growth.

The owner had built the original website himself, but it had significant issues that were holding the business back. The site was text-heavy and cluttered, not mobile-friendly at all, and lacked the structure needed to effectively communicate their dual-audience value proposition. The navigation was confusing and didn't allow for enough pages to properly organize their services. Most critically, the site didn't contain enough information about their unique approach to financial planning for athletes and investors.

As LP Wealth Group began pursuing partnerships with universities and attending trade shows to connect with student athletes, they needed a professional website they could confidently share with prospects, partners, and institutional clients.

**My Role: UX Engineer**

I served in my official role as UX Engineer, designing and developing the complete website. Working directly with the business owner (who came through a referral and knew I was a UX engineer), I owned both the user experience design and technical implementation—transforming his vision into a professional web presence.

**Responsibilities:**

- Stakeholder collaboration to understand dual-audience needs
- Competitive analysis of financial services websites
- Information architecture for 10-page website structure
- UI/UX design in Figma with complete mockups and 5 rounds of iteration
- WordPress development using Elementor to build the entire site
- Integration with third-party tools (Calendly, Google Analytics)
- SEO setup and ongoing hosting, security, and backups

**Timeline:** 3 months from initial meeting to launch (November 2024)

**[IMAGE: Homepage]**

**Discovery & Requirements Gathering**

Working directly with the owner, I learned about his specific vision and the problems with his current site. He was very clear about what he needed:

**Business Goals:**

- Create a professional website to confidently share with university partners and prospects
- Clearly differentiate services for two distinct audiences: student athletes and investors
- Provide comprehensive information about high cash value life insurance as a wealth-building tool
- Make it easy for prospects to schedule consultations
- Establish credibility through partner logos, testimonials, and educational content
- Ensure mobile responsiveness for sharing information on phones during meetings

**Design Direction:**

The owner provided specific design references showing the color scheme he wanted: orange and black, like other financial sites he admired. I used his exact hex codes to match his vision while ensuring proper contrast and accessibility.

**The Dual-Audience Challenge**

The core UX challenge was creating a website that effectively served two very different audiences with distinct needs:

**Student Athletes:**
- Just beginning their earning potential (NIL money, early contracts)
- Need income protection from day one
- Interested in leveraging insurance for business ventures (apparel lines, investments)
- Volatile earning patterns requiring flexible financial planning

**Investors:**
- Established professionals looking for capital storage between deals
- Need tax-advantaged liquidity for real estate and private investments
- Want alternatives to traditional lending with better cash flow control
- Seeking stability that outpaces market volatility

Both audiences needed to understand how high cash value life insurance works as a wealth-building tool, but with messaging tailored to their specific circumstances.

**Information Architecture: Audience-First Structure**

Based on the owner's requirements and my research into financial services UX patterns, I designed a 10-page structure organizing content around the two primary audiences:

**Main Navigation:**

- Home (overview with clear paths for each audience)
- Athletes ("Protect Your Bag From Day One")
- Investors ("Stability That Outpaces Volatility")
- Financial Education (resources benefiting both audiences)
- About (establishing credibility and trust)
- Services (detailed breakdown of offerings)
- Partners (institutional credibility)
- Testimonials (social proof)
- Blog (thought leadership)
- Contact (easy consultation scheduling)

This structure solved the navigation problem from the old site by giving each service area dedicated space while maintaining clear pathways for both audience types.

**[IMAGE: Athletes Section]**

**[IMAGE: Investors Section]**

**Iterative Design Process**

**Step 1: Understanding the Content**

The owner provided core messaging and content, which I expanded upon to create clear, benefit-focused copy. I researched life insurance for student athletes, a relatively unique market, using information he provided about the specific benefits for this demographic.

**Step 2: Figma Mockups**

I created complete Figma mockups for all 10 pages, designing the visual hierarchy, layout, and user flows before any development. This allowed the owner to see exactly what he was getting and provide feedback early.

**Step 3: Iterative Refinement (5 Rounds)**

We went through approximately 5 iterations before finalizing the design. Key changes included:

- **Homepage expansion:** He wanted additional sections on the homepage to provide more context
- **Testimonials adjustment:** Changed from image-based testimonials to text-only format for cleaner presentation
- **Financial Education section:** Added a dedicated section after realizing both audiences needed educational resources
- **Contact form fields:** Refined form fields to capture the right qualifying information
- **Page structure:** Adjusted layout and spacing based on his feedback about information hierarchy

**Step 4: WordPress Development**

Once the designs were approved, I built the site using WordPress and Elementor, implementing custom CSS for polished interactions (border radius refinements, loading animations) and integrating Calendly forms on virtually every page to make scheduling frictionless.

**[IMAGE: Mobile View]**

**Key Design Decisions**

**1. Mobile-First Responsive Design**

Since the old site wasn't mobile-friendly and the owner mentioned sharing the website on phones during meetings, I prioritized mobile responsiveness from the start:

- Touch-friendly navigation and CTAs
- Readable typography on small screens
- Optimized images for fast mobile loading
- Responsive grid layouts that adapt to any screen size
- Mobile-optimized contact forms

**2. Dual-Audience Navigation**

To serve both athletes and investors effectively, I created clear visual pathways on the homepage:

- Distinct hero sections for each audience
- Color-coded or visually differentiated sections
- Benefit-focused headlines that immediately communicate value
- Direct CTAs leading to audience-specific pages

**3. Trust & Credibility Elements**

For a financial services firm, establishing trust is critical:

- Partner carousel showing major insurance carriers (Guardian, New York Life, Nationwide)
- Testimonials from real clients
- Professional photography and consistent branding
- Clear, transparent information about services
- Educational content positioning the firm as experts

**4. Conversion-Optimized User Flows**

Every page includes clear next steps:

- Prominent "Schedule a Consultation" CTAs
- Calendly integration embedded throughout the site
- Multiple contact points (form, calendar, phone)
- Logical information progression from problem → solution → action

**[IMAGE: Partners Carousel]**

**Design System**

Created a professional design system reflecting financial services industry standards:

- **Colors:** Orange and black (client-specified) with strategic use of white space
- **Typography:** Professional, readable fonts optimized for financial content
- **Components:** Reusable section templates, consistent button styles, standardized spacing
- **Imagery:** Professional, diverse imagery representing both target audiences

**Technical Implementation**

**Platform:** WordPress with Elementor page builder

**Key Features:**

- Calendly integration for seamless consultation scheduling
- Google Analytics implementation for tracking visitor behavior
- SEO optimization (ongoing maintenance by client's marketing manager)
- Daily automated backups
- Security hardening and SSL implementation
- Blog functionality for content marketing
- Contact forms with custom field validation
- Partner logo carousel
- Responsive testimonial sections

**Ongoing Maintenance:**

I handle hosting, daily backups, and security updates. The owner and his marketing manager update content as needed. No major updates have been required since launch, as the site was designed right the first time.

**Platform Launch & Impact**

**Launch:** November 2024 (4 months ago)

**Real-World Usage:**

The owner reports that the website now contains "everything he needs to share information confidently." He actively uses it during trade shows and university meetings, pulling it up on his phone to share specific information with prospects and partners.

**Business Development:**

Since launch, LP Wealth Group has been:

- Taking meetings with 5+ universities to establish financial education programs for student athletes
- Attending trade shows with confidence in their online presence
- Using the website as a credible reference point in partnership discussions
- Converting more prospects through the easier consultation scheduling process

**Client Feedback:**

The owner expressed satisfaction that the website finally matches the professionalism of his services. He can now confidently direct potential clients, institutional partners, and student athletes to the website knowing they'll find comprehensive, well-organized information.

**What This Project Taught Me**

**Designing for Dual Audiences:**

This project reinforced the importance of clear information architecture when serving multiple user segments. Rather than creating a one-size-fits-all experience, I learned to structure content so each audience can immediately find their relevant information while still accessing shared resources like testimonials and partner credentials.

**Stakeholder Collaboration:**

Working directly with one decision-maker who had a clear vision taught me how to balance client preferences with UX best practices. The owner knew his brand (orange and black) and his audiences (athletes and investors), but needed my expertise to structure the information effectively and create professional, conversion-optimized user flows.

**From Self-Made to Professional:**

Transforming a self-made website into a professional platform highlighted the value of proper information architecture, mobile responsiveness, and strategic content organization. The owner had the right content ideas but lacked the UX skills to present them effectively. This project showed me how good design amplifies good content.

**Technical Versatility:**

Balancing design vision with WordPress/Elementor capabilities taught me to work within platform constraints while still delivering polished custom features. Not every project requires custom code. Sometimes the right combination of tools and integrations delivers the best result.

**Next Steps**

The website continues to serve LP Wealth Group's business development needs as they expand their university partnerships and athlete client base. The solid foundation allows for easy content updates by their marketing team while I maintain the technical infrastructure through hosting, backups, and security updates.

`,
      technologies: ['Figma', 'WordPress', 'Elementor', 'UX Design', 'Responsive Design', 'HTML/CSS', 'SEO', 'Google Analytics', 'Calendly Integration', 'Stakeholder Collaboration'],
      imageUrl: '/assets/images/lpwealthgroup/lpwealthgroup.png',
      projectUrl: 'https://lpwealthgroup.com',
      features: [
        'Complete 10-page website redesign and development',
        'Dual-audience information architecture for athletes and investors',
        'Mobile-first responsive design replacing non-mobile-friendly site',
        'Figma mockups and 5 rounds of iterative refinement',
        'WordPress and Elementor implementation with custom CSS',
        'Calendly integration for seamless consultation scheduling',
        'Partner carousel, testimonials, and trust-building elements',
        'Google Analytics and SEO optimization',
        'Ongoing hosting, security, and daily backups',
        'Professional brand elevation for trade shows and university partnerships'
      ]
    }
  ];

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);

        // Try to get project from Firebase
        const projectRef = doc(db, 'projects', id);
        const projectSnap = await getDoc(projectRef);

        if (projectSnap.exists()) {
          setProject({ id: projectSnap.id, ...projectSnap.data() });
        } else {
          // Look for project in custom projects
          const customProject = customProjects.find(p => p.id === id);

          if (customProject) {
            setProject(customProject);
          } else {
            setError('Project not found.');
          }
        }
      } catch (error) {
        console.error('Error fetching project:', error);

        // Try to use custom project as fallback
        const customProject = customProjects.find(p => p.id === id);

        if (customProject) {
          setProject(customProject);
        } else {
          setError('Failed to load project details.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProject();

    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <PageContainer isLight={isLight}>
        <div className="container">
          <LoadingContainer>
            <LoadingSpinner />
          </LoadingContainer>
        </div>
      </PageContainer>
    );
  }

  if (error || !project) {
    return (
      <PageContainer isLight={isLight}>
        <div className="container">
          <ErrorMessage isLight={isLight}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h2>Oops!</h2>
              <p>{error || 'Project not found.'}</p>
              <Button
                onClick={handleBackToProjects}
                primary={true}
              >
                <FaArrowLeft /> Back to Projects
              </Button>
            </motion.div>
          </ErrorMessage>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer isLight={isLight}>
      {/* Hero Section */}
      <HeroSection>
        <div className="container">
          <BackLink onClick={handleBackToProjects}>
            <FaArrowLeft /> Back to Projects
          </BackLink>

          <HeroContent>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
            >
              <ProjectCategory>{project.category}</ProjectCategory>
              <ProjectTitle>{project.title}</ProjectTitle>
              <ProjectSummary>{project.summary}</ProjectSummary>
            </motion.div>
          </HeroContent>
        </div>
      </HeroSection>

      {/* Project Image */}
      <ImageSection>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <ProjectImageContainer isLight={isLight}>
              <ProjectImage
                src={project.imageUrl}
                alt={project.title}
                onError={(e) => {
                  if (project.id === 'peopleview') {
                    e.target.src = "https://cdn-icons-png.flaticon.com/512/2519/2519318.png";
                  } else if (project.id === 'efilmhub') {
                    e.target.src = "https://cdn-icons-png.flaticon.com/512/1038/1038100.png";
                  } else if (project.id === 'ai-data-analyzer') {
                    e.target.src = "https://cdn-icons-png.flaticon.com/512/2103/2103832.png";
                  } else {
                    e.target.src = "https://cdn-icons-png.flaticon.com/512/1356/1356479.png";
                  }
                }}
              />
            </ProjectImageContainer>
          </motion.div>
        </div>
      </ImageSection>

      {/* Main Content */}
      <ContentSection>
        <div className="container">
          <ContentGrid>
            <MainContent>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Section>
                  <SectionTitle isLight={isLight}>Case Study</SectionTitle>
                  <SectionContent isLight={isLight}>
                    {project.id === 'eudo' ? (
                      <>
                        <div dangerouslySetInnerHTML={{
                          __html: project.description
                            // Main section headings for NEW Eudo case study
                            .replace(/\*\*The Challenge: Inefficient HR Analytics Delivery\*\*/g, '<h2 id="challenge" style="font-size: 1.75rem !important; font-weight: 700 !important; margin: 2rem 0 0.5rem 0 !important; padding-top: 1rem; border-top: 2px solid rgba(59, 130, 246, 0.2); color: var(--secondary-color) !important;">The Challenge: Inefficient HR Analytics Delivery</h2>')
                            .replace(/\*\*My Role: Co-Founder & Software Engineer\*\*/g, '<h2 id="role" style="font-size: 1.75rem !important; font-weight: 700 !important; margin: 2rem 0 0.5rem 0 !important; padding-top: 1rem; border-top: 2px solid rgba(59, 130, 246, 0.2); color: var(--secondary-color) !important;">My Role: Co-Founder & Software Engineer</h2>')
                            .replace(/\*\*Discovery & Requirements Gathering\*\*/g, '<h2 id="discovery" style="font-size: 1.75rem !important; font-weight: 700 !important; margin: 2rem 0 0.5rem 0 !important; padding-top: 1rem; border-top: 2px solid rgba(59, 130, 246, 0.2); color: var(--secondary-color) !important;">Discovery & Requirements Gathering</h2>')
                            .replace(/\*\*Building on Initial Prototypes\*\*/g, '<h2 id="prototypes" style="font-size: 1.75rem !important; font-weight: 700 !important; margin: 2rem 0 0.5rem 0 !important; padding-top: 1rem; border-top: 2px solid rgba(59, 130, 246, 0.2); color: var(--secondary-color) !important;">Building on Initial Prototypes</h2>')
                            .replace(/\*\*Design Approach\*\*/g, '<h2 id="approach" style="font-size: 1.75rem !important; font-weight: 700 !important; margin: 2rem 0 0.5rem 0 !important; padding-top: 1rem; border-top: 2px solid rgba(59, 130, 246, 0.2); color: var(--secondary-color) !important;">Design Approach</h2>')
                            .replace(/\*\*Information Architecture: The Experiment Lifecycle\*\*/g, '<h2 id="architecture" style="font-size: 1.75rem !important; font-weight: 700 !important; margin: 2rem 0 0.5rem 0 !important; padding-top: 1rem; border-top: 2px solid rgba(59, 130, 246, 0.2); color: var(--secondary-color) !important;">Information Architecture: The Experiment Lifecycle</h2>')
                            .replace(/\*\*Key Design Challenges & Solutions\*\*/g, '<h2 id="challenges" style="font-size: 1.75rem !important; font-weight: 700 !important; margin: 2rem 0 0.5rem 0 !important; padding-top: 1rem; border-top: 2px solid rgba(59, 130, 246, 0.2); color: var(--secondary-color) !important;">Key Design Challenges & Solutions</h2>')
                            .replace(/\*\*Technical Implementation\*\*/g, '<h2 id="technical" style="font-size: 1.75rem !important; font-weight: 700 !important; margin: 2rem 0 0.5rem 0 !important; padding-top: 1rem; border-top: 2px solid rgba(59, 130, 246, 0.2); color: var(--secondary-color) !important;">Technical Implementation</h2>')
                            .replace(/\*\*Current Progress & Learnings\*\*/g, '<h2 id="progress" style="font-size: 1.75rem !important; font-weight: 700 !important; margin: 2rem 0 0.5rem 0 !important; padding-top: 1rem; border-top: 2px solid rgba(59, 130, 246, 0.2); color: var(--secondary-color) !important;">Current Progress & Learnings</h2>')
                            .replace(/\*\*What This Project Has Taught Me\*\*/g, '<h2 id="learnings" style="font-size: 1.75rem !important; font-weight: 700 !important; margin: 2rem 0 0.5rem 0 !important; padding-top: 1rem; border-top: 2px solid rgba(59, 130, 246, 0.2); color: var(--secondary-color) !important;">What This Project Has Taught Me</h2>')
                            .replace(/\*\*Development Constraints & Solutions\*\*/g, '<h2 id="constraints" style="font-size: 1.75rem !important; font-weight: 700 !important; margin: 2rem 0 0.5rem 0 !important; padding-top: 1rem; border-top: 2px solid rgba(59, 130, 246, 0.2); color: var(--secondary-color) !important;">Development Constraints & Solutions</h2>')
                            .replace(/\*\*Next Steps\*\*/g, '<h2 id="next-steps" style="font-size: 1.75rem !important; font-weight: 700 !important; margin: 2rem 0 0.5rem 0 !important; padding-top: 1rem; border-top: 2px solid rgba(59, 130, 246, 0.2); color: var(--secondary-color) !important;">Next Steps</h2>')
                            .replace(/\*\*Reflection\*\*/g, '<h2 id="reflection" style="font-size: 1.75rem !important; font-weight: 700 !important; margin: 2rem 0 0.5rem 0 !important; padding-top: 1rem; border-top: 2px solid rgba(59, 130, 246, 0.2); color: var(--secondary-color) !important;">Reflection</h2>')

                            // H3 subsections
                            .replace(/\*\*Responsibilities:\*\*/g, '<h3 style="font-size: 1.15rem !important; font-weight: 600 !important; margin: 1.5rem 0 0.5rem 0 !important; color: var(--primary-color) !important;">Responsibilities:</h3>')
                            .replace(/\*\*The Context:\*\*/g, '<h3 style="font-size: 1.15rem !important; font-weight: 600 !important; margin: 1.5rem 0 0.5rem 0 !important; color: var(--primary-color) !important;">The Context:</h3>')
                            .replace(/\*\*My Development Process:\*\*/g, '<h3 style="font-size: 1.15rem !important; font-weight: 600 !important; margin: 1.5rem 0 0.5rem 0 !important; color: var(--primary-color) !important;">My Development Process:</h3>')
                            .replace(/\*\*What's Working:\*\*/g, '<h3 style="font-size: 1.15rem !important; font-weight: 600 !important; margin: 1.5rem 0 0.5rem 0 !important; color: var(--primary-color) !important;">What\'s Working:</h3>')
                            .replace(/\*\*What I'm Still Refining:\*\*/g, '<h3 style="font-size: 1.15rem !important; font-weight: 600 !important; margin: 1.5rem 0 0.5rem 0 !important; color: var(--primary-color) !important;">What I\'m Still Refining:</h3>')
                            .replace(/\*\*Designing Without Direct User Access:\*\*/g, '<h3 style="font-size: 1.1rem !important; font-weight: 600 !important; margin: 1.5rem 0 0.5rem 0 !important; color: var(--primary-color) !important;">Designing Without Direct User Access:</h3>')
                            .replace(/\*\*Startup Constraints Drive Creativity:\*\*/g, '<h3 style="font-size: 1.1rem !important; font-weight: 600 !important; margin: 1.5rem 0 0.5rem 0 !important; color: var(--primary-color) !important;">Startup Constraints Drive Creativity:</h3>')
                            .replace(/\*\*Dual Role Benefits:\*\*/g, '<h3 style="font-size: 1.1rem !important; font-weight: 600 !important; margin: 1.5rem 0 0.5rem 0 !important; color: var(--primary-color) !important;">Dual Role Benefits:</h3>')
                            .replace(/\*\*Building for Two Audiences:\*\*/g, '<h3 style="font-size: 1.1rem !important; font-weight: 600 !important; margin: 1.5rem 0 0.5rem 0 !important; color: var(--primary-color) !important;">Building for Two Audiences:</h3>')
                            .replace(/\*\*Immediate Priorities:\*\*/g, '<h3 style="font-size: 1.15rem !important; font-weight: 600 !important; margin: 1.5rem 0 0.5rem 0 !important; color: var(--primary-color) !important;">Immediate Priorities:</h3>')
                            .replace(/\*\*Future Vision:\*\*/g, '<h3 style="font-size: 1.15rem !important; font-weight: 600 !important; margin: 1.5rem 0 0.5rem 0 !important; color: var(--primary-color) !important;">Future Vision:</h3>')
                            .replace(/\*\*Challenge 1: Making Statistical Methodology Accessible\*\*/g, '<h3 style="font-size: 1.15rem !important; font-weight: 600 !important; margin: 1.5rem 0 0.5rem 0 !important; color: var(--primary-color) !important;">Challenge 1: Making Statistical Methodology Accessible</h3>')
                            .replace(/\*\*Challenge 2: Preventing Configuration Errors\*\*/g, '<h3 style="font-size: 1.15rem !important; font-weight: 600 !important; margin: 1.5rem 0 0.5rem 0 !important; color: var(--primary-color) !important;">Challenge 2: Preventing Configuration Errors</h3>')
                            .replace(/\*\*Challenge 3: Visualizing Multi-Dimensional Data\*\*/g, '<h3 style="font-size: 1.15rem !important; font-weight: 600 !important; margin: 1.5rem 0 0.5rem 0 !important; color: var(--primary-color) !important;">Challenge 3: Visualizing Multi-Dimensional Data</h3>')
                            .replace(/\*\*Challenge 4: Balancing Speed with Rigor\*\*/g, '<h3 style="font-size: 1.15rem !important; font-weight: 600 !important; margin: 1.5rem 0 0.5rem 0 !important; color: var(--primary-color) !important;">Challenge 4: Balancing Speed with Rigor</h3>')

                            // Add images
                            .replace(/\*\*\[IMAGE: Main Dashboard\]\*\*/g, '<img src="/assets/images/eudo/eudo1.png" alt="Main Dashboard" style="width: 100%; max-width: 800px; height: auto; border-radius: 8px; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15); margin: 2rem auto; display: block; object-fit: contain;" /><p style="font-size: 0.9rem; opacity: 0.7; font-style: italic; text-align: center; margin: -1rem 0 2rem 0;">Intervention management dashboard with experiment lifecycle tracking</p>')
                            .replace(/\*\*\[IMAGE: Diagnostic Dashboard\]\*\*/g, '<img src="/assets/images/eudo/eudo2.png" alt="Diagnostic Dashboard" style="width: 100%; max-width: 800px; height: auto; border-radius: 8px; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15); margin: 2rem auto; display: block; object-fit: contain;" /><p style="font-size: 0.9rem; opacity: 0.7; font-style: italic; text-align: center; margin: -1rem 0 2rem 0;">Card-based diagnostic dashboard with collapsible filters</p>')
                            .replace(/\*\*\[IMAGE: Pilot Design\]\*\*/g, '<img src="/assets/images/eudo/eudo3.png" alt="Pilot Design" style="width: 100%; max-width: 800px; height: auto; border-radius: 8px; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15); margin: 2rem auto; display: block; object-fit: contain;" /><p style="font-size: 0.9rem; opacity: 0.7; font-style: italic; text-align: center; margin: -1rem 0 2rem 0;">Guided workflow with clear prompts for experiment design</p>')
                            .replace(/\*\*\[IMAGE: Organization Setup\]\*\*/g, '<img src="/assets/images/eudo/eudo4.png" alt="Organization Setup" style="width: 100%; max-width: 800px; height: auto; border-radius: 8px; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15); margin: 2rem auto; display: block; object-fit: contain;" /><p style="font-size: 0.9rem; opacity: 0.7; font-style: italic; text-align: center; margin: -1rem 0 2rem 0;">Treatment and control group assignment interface</p>')
                            .replace(/\*\*\[IMAGE: Period Configuration\]\*\*/g, '<img src="/assets/images/eudo/eudo5.png" alt="Period Configuration" style="width: 100%; max-width: 800px; height: auto; border-radius: 8px; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15); margin: 2rem auto; display: block; object-fit: contain;" /><p style="font-size: 0.9rem; opacity: 0.7; font-style: italic; text-align: center; margin: -1rem 0 2rem 0;">Period Wizard for automated timeline generation</p>')
                            .replace(/\*\*\[IMAGE: Metrics Definition\]\*\*/g, '<img src="/assets/images/eudo/eudo6.png" alt="Metrics Definition" style="width: 100%; max-width: 800px; height: auto; border-radius: 8px; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15); margin: 2rem auto; display: block; object-fit: contain;" /><p style="font-size: 0.9rem; opacity: 0.7; font-style: italic; text-align: center; margin: -1rem 0 2rem 0;">KPI definition and tracking setup interface</p>')

                            // Design Approach 5-item numbered list - specific replacement BEFORE generic list conversion
                            .replace(/Given my dual role as both designer and developer on a startup with limited resources, I focused on:\n\n1\. \*\*Efficiency First:\*\* Designing workflows that minimize setup time and reduce errors\n2\. \*\*Data Integrity:\*\* Ensuring every design decision supports accurate experimental methodology\n3\. \*\*Progressive Complexity:\*\* Revealing advanced features only when users need them\n4\. \*\*Internal Tool Mindset:\*\* Prioritizing functionality and accuracy over marketing polish\n5\. \*\*Scalability:\*\* Building foundations that can transition to client-facing use/g,
                              'Given my dual role as both designer and developer on a startup with limited resources, I focused on:<ol style="margin: 0.5rem 0 1rem 1.5rem; line-height: 1.8;"><li><strong>Efficiency First:</strong> Designing workflows that minimize setup time and reduce errors</li><li><strong>Data Integrity:</strong> Ensuring every design decision supports accurate experimental methodology</li><li><strong>Progressive Complexity:</strong> Revealing advanced features only when users need them</li><li><strong>Internal Tool Mindset:</strong> Prioritizing functionality and accuracy over marketing polish</li><li><strong>Scalability:</strong> Building foundations that can transition to client-facing use</li></ol>')

                            // 8-phase numbered list - specific replacement BEFORE generic list conversion
                            .replace(/I designed an 8-phase intervention management system to standardize how we set up and track client experiments:\n\n1\. \*\*Diagnostic:\*\* Baseline employee experience measurement\n2\. \*\*Pilot Design:\*\* Hypothesis and intervention definition\n3\. \*\*Organization:\*\* Treatment and control group assignment\n4\. \*\*Periods:\*\* Timeline configuration for before\/after measurement\n5\. \*\*Metrics:\*\* KPI definition and tracking setup\n6\. \*\*Financials:\*\* ROI calculation framework\n7\. \*\*Data Intake:\*\* Client data upload and processing\n8\. \*\*Pilot Results:\*\* Difference-in-differences analysis output/g,
                              'I designed an 8-phase intervention management system to standardize how we set up and track client experiments:<ol style="margin: 0.5rem 0 1rem 1.5rem; line-height: 1.8;"><li><strong>Diagnostic:</strong> Baseline employee experience measurement</li><li><strong>Pilot Design:</strong> Hypothesis and intervention definition</li><li><strong>Organization:</strong> Treatment and control group assignment</li><li><strong>Periods:</strong> Timeline configuration for before/after measurement</li><li><strong>Metrics:</strong> KPI definition and tracking setup</li><li><strong>Financials:</strong> ROI calculation framework</li><li><strong>Data Intake:</strong> Client data upload and processing</li><li><strong>Pilot Results:</strong> Difference-in-differences analysis output</li></ol>')

                            // Constraint/Solution pairs - specific replacement BEFORE generic list conversion
                            .replace(/As designer and developer, I balanced UX vision with technical realities\. Each constraint required creative problem-solving:\n\n- \*\*Constraint:\*\* Limited development experience\n- \*\*Solution:\*\* Used AI-assisted coding to implement all designs effectively\n\n- \*\*Constraint:\*\* Complex multi-platform functionality\n- \*\*Solution:\*\* Built features incrementally, testing each before adding the next\n\n- \*\*Constraint:\*\* Budget and timeline limitations\n- \*\*Solution:\*\* Prioritized features based on stakeholder needs, delivering core functionality first\n\n- \*\*Constraint:\*\* Need for statistical rigor\n- \*\*Solution:\*\* Implemented validation checkpoints and automated wizards to enforce proper methodology/g,
                              'As designer and developer, I balanced UX vision with technical realities. Each constraint required creative problem-solving:<ul style="margin: 0.5rem 0 1rem 1.5rem; line-height: 1.8;"><li><strong>Constraint:</strong> Limited development experience<br/><strong>Solution:</strong> Used AI-assisted coding to implement all designs effectively</li><li><strong>Constraint:</strong> Complex multi-platform functionality<br/><strong>Solution:</strong> Built features incrementally, testing each before adding the next</li><li><strong>Constraint:</strong> Budget and timeline limitations<br/><strong>Solution:</strong> Prioritized features based on stakeholder needs, delivering core functionality first</li><li><strong>Constraint:</strong> Need for statistical rigor<br/><strong>Solution:</strong> Implemented validation checkpoints and automated wizards to enforce proper methodology</li></ul>')

                            // Convert dashes to proper bullet lists
                            .replace(/- ([^\n]+)/g, '<li>$1</li>')
                            .replace(/(<li>.*<\/li>\n?)+/g, '<ul style="margin: 0.5rem 0 1rem 1.5rem; line-height: 1.6;">$&</ul>')

                            // Convert remaining bold text to inline emphasis
                            .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
                        }} />
                      </>
                    ) : project.id === 'efilmhub' ? (
                      <>
                        <div dangerouslySetInnerHTML={{
                          __html: project.description
                            // Main section headings - eFilmHub
                            .replace(/\*\*The Challenge: Fragmented Tools for African Filmmakers\*\*/g, '<h2 id="challenge" style="font-size: 1.75rem !important; font-weight: 700 !important; margin: 2rem 0 0.5rem 0 !important; padding-top: 1rem; border-top: 2px solid rgba(59, 130, 246, 0.2); color: var(--secondary-color) !important;">The Challenge: Fragmented Tools for African Filmmakers</h2>')
                            .replace(/\*\*My Role: Software & UX Engineer\*\*/g, '<h2 id="role" style="font-size: 1.75rem !important; font-weight: 700 !important; margin: 2rem 0 0.5rem 0 !important; padding-top: 1rem; border-top: 2px solid rgba(59, 130, 246, 0.2); color: var(--secondary-color) !important;">My Role: Software & UX Engineer</h2>')
                            .replace(/\*\*Discovery & Requirements Gathering\*\*/g, '<h2 id="discovery" style="font-size: 1.75rem !important; font-weight: 700 !important; margin: 2rem 0 0.5rem 0 !important; padding-top: 1rem; border-top: 2px solid rgba(59, 130, 246, 0.2); color: var(--secondary-color) !important;">Discovery & Requirements Gathering</h2>')
                            .replace(/\*\*The UX Challenge: Integrating Multiple Platforms\*\*/g, '<h2 id="ux-challenge" style="font-size: 1.75rem !important; font-weight: 700 !important; margin: 2rem 0 0.5rem 0 !important; padding-top: 1rem; border-top: 2px solid rgba(59, 130, 246, 0.2); color: var(--secondary-color) !important;">The UX Challenge: Integrating Multiple Platforms</h2>')
                            .replace(/\*\*Information Architecture: The Hub Model\*\*/g, '<h2 id="architecture" style="font-size: 1.75rem !important; font-weight: 700 !important; margin: 2rem 0 0.5rem 0 !important; padding-top: 1rem; border-top: 2px solid rgba(59, 130, 246, 0.2); color: var(--secondary-color) !important;">Information Architecture: The Hub Model</h2>')
                            .replace(/\*\*Iterative Design Process\*\*/g, '<h2 id="process" style="font-size: 1.75rem !important; font-weight: 700 !important; margin: 2rem 0 0.5rem 0 !important; padding-top: 1rem; border-top: 2px solid rgba(59, 130, 246, 0.2); color: var(--secondary-color) !important;">Iterative Design Process</h2>')
                            .replace(/\*\*Key Design Decisions\*\*/g, '<h2 id="design-decisions" style="font-size: 1.75rem !important; font-weight: 700 !important; margin: 2rem 0 0.5rem 0 !important; padding-top: 1rem; border-top: 2px solid rgba(59, 130, 246, 0.2); color: var(--secondary-color) !important;">Key Design Decisions</h2>')
                            .replace(/\*\*Design System\*\*/g, '<h2 id="design-system" style="font-size: 1.75rem !important; font-weight: 700 !important; margin: 2rem 0 0.5rem 0 !important; padding-top: 1rem; border-top: 2px solid rgba(59, 130, 246, 0.2); color: var(--secondary-color) !important;">Design System</h2>')
                            .replace(/\*\*Development Constraints & Solutions\*\*/g, '<h2 id="constraints" style="font-size: 1.75rem !important; font-weight: 700 !important; margin: 2rem 0 0.5rem 0 !important; padding-top: 1rem; border-top: 2px solid rgba(59, 130, 246, 0.2); color: var(--secondary-color) !important;">Development Constraints & Solutions</h2>')
                            .replace(/\*\*Platform Launch & Impact\*\*/g, '<h2 id="impact" style="font-size: 1.75rem !important; font-weight: 700 !important; margin: 2rem 0 0.5rem 0 !important; padding-top: 1rem; border-top: 2px solid rgba(59, 130, 246, 0.2); color: var(--secondary-color) !important;">Platform Launch & Impact</h2>')
                            .replace(/\*\*What This Project Taught Me\*\*/g, '<h2 id="learnings" style="font-size: 1.75rem !important; font-weight: 700 !important; margin: 2rem 0 0.5rem 0 !important; padding-top: 1rem; border-top: 2px solid rgba(59, 130, 246, 0.2); color: var(--secondary-color) !important;">What This Project Taught Me</h2>')
                            .replace(/\*\*Next Steps\*\*/g, '<h2 id="next-steps" style="font-size: 1.75rem !important; font-weight: 700 !important; margin: 2rem 0 0.5rem 0 !important; padding-top: 1rem; border-top: 2px solid rgba(59, 130, 246, 0.2); color: var(--secondary-color) !important;">Next Steps</h2>')

                            // Add images for eFilmHub (all mobile screenshots, sized like job posting)
                            .replace(/\*\*\[IMAGE: Profile Page\]\*\*/g, '<div style="display: flex; justify-content: center; margin: 2rem 0;"><img src="/assets/images/efilmhub/profile-page.png" alt="eFilmHub Profile Page" style="max-width: 280px; width: 100%; height: auto; border-radius: 8px; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15); object-fit: contain;" /></div><p style="font-size: 0.9rem; opacity: 0.7; font-style: italic; text-align: center; margin: -1rem 0 2rem 0;">Film professional profile showcasing visual media galleries and filmography</p>')
                            .replace(/\*\*\[IMAGE: Search & Filter\]\*\*/g, '<div style="display: flex; justify-content: center; margin: 2rem 0;"><img src="/assets/images/efilmhub/search-filter.png" alt="eFilmHub Search & Filter" style="max-width: 280px; width: 100%; height: auto; border-radius: 8px; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15); object-fit: contain;" /></div><p style="font-size: 0.9rem; opacity: 0.7; font-style: italic; text-align: center; margin: -1rem 0 2rem 0;">Talent discovery interface with advanced filtering and visual portfolio browsing</p>')
                            .replace(/\*\*\[IMAGE: Job Posting Flow\]\*\*/g, '<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem; margin: 2rem 0; max-width: 900px; margin-left: auto; margin-right: auto;"><img src="/assets/images/efilmhub/job-posting-1.png" alt="Job Posting Step 1" style="width: 100%; height: auto; border-radius: 8px; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15); object-fit: contain;" /><img src="/assets/images/efilmhub/job-posting-2.png" alt="Job Posting Step 2" style="width: 100%; height: auto; border-radius: 8px; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15); object-fit: contain;" /><img src="/assets/images/efilmhub/job-posting-3.png" alt="Job Posting Step 3" style="width: 100%; height: auto; border-radius: 8px; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15); object-fit: contain;" /></div><p style="font-size: 0.9rem; opacity: 0.7; font-style: italic; text-align: center; margin: -1rem 0 2rem 0;">Streamlined job posting flow with templates and budget transparency</p>')
                            .replace(/\*\*\[IMAGE: Equipment Grid\]\*\*/g, '<div style="display: flex; justify-content: center; margin: 2rem 0;"><img src="/assets/images/efilmhub/equipment-grid.png" alt="eFilmHub Equipment Marketplace" style="max-width: 280px; width: 100%; height: auto; border-radius: 8px; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15); object-fit: contain;" /></div><p style="font-size: 0.9rem; opacity: 0.7; font-style: italic; text-align: center; margin: -1rem 0 2rem 0;">Equipment marketplace with ratings, specifications, and booking calendar</p>')
                            .replace(/\*\*\[IMAGE: Messaging Interface\]\*\*/g, '<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem; margin: 2rem 0; max-width: 600px; margin-left: auto; margin-right: auto;"><img src="/assets/images/efilmhub/messaging-1.png" alt="Messaging Interface 1" style="width: 100%; height: auto; border-radius: 8px; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15); object-fit: contain;" /><img src="/assets/images/efilmhub/messaging-2.png" alt="Messaging Interface 2" style="width: 100%; height: auto; border-radius: 8px; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15); object-fit: contain;" /></div><p style="font-size: 0.9rem; opacity: 0.7; font-style: italic; text-align: center; margin: -1rem 0 2rem 0;">Project-based messaging with quick actions and file sharing</p>')

                            // Subsection headings
                            .replace(/\*\*Responsibilities:\*\*/g, '<h3 style="font-size: 1.15rem !important; font-weight: 600 !important; margin: 1.5rem 0 0.5rem 0 !important; color: var(--primary-color) !important;">Responsibilities:</h3>')
                            .replace(/\*\*Business Goals Communicated by Stakeholders:\*\*/g, '<h3 style="font-size: 1.15rem !important; font-weight: 600 !important; margin: 1.5rem 0 0.5rem 0 !important; color: var(--primary-color) !important;">Business Goals Communicated by Stakeholders:</h3>')
                            .replace(/\*\*The African Film Industry Context:\*\*/g, '<h3 style="font-size: 1.15rem !important; font-weight: 600 !important; margin: 1.5rem 0 0.5rem 0 !important; color: var(--primary-color) !important;">The African Film Industry Context:</h3>')
                            .replace(/\*\*IMDb:\*\*/g, '<h3 style="font-size: 1.1rem !important; font-weight: 600 !important; margin: 1.5rem 0 0.5rem 0 !important; color: var(--primary-color) !important;">IMDb:</h3>')
                            .replace(/\*\*Backstage:\*\*/g, '<h3 style="font-size: 1.1rem !important; font-weight: 600 !important; margin: 1.5rem 0 0.5rem 0 !important; color: var(--primary-color) !important;">Backstage:</h3>')
                            .replace(/\*\*Approach:\*\*/g, '<h3 style="font-size: 1.15rem !important; font-weight: 600 !important; margin: 1.5rem 0 0.5rem 0 !important; color: var(--primary-color) !important;">Approach:</h3>')

                            // Information Architecture numbered sections - must come BEFORE generic numbered replacements
                            .replace(/\*\*1\. User Profiles & Portfolios\*\*/g, '<h3 style="font-size: 1.15rem !important; font-weight: 600 !important; margin: 1.5rem 0 0.5rem 0 !important; color: var(--primary-color) !important;">1. User Profiles & Portfolios</h3>')
                            .replace(/\*\*2\. Talent Discovery & Search\*\*/g, '<h3 style="font-size: 1.15rem !important; font-weight: 600 !important; margin: 1.5rem 0 0.5rem 0 !important; color: var(--primary-color) !important;">2. Talent Discovery & Search</h3>')
                            .replace(/\*\*3\. Job Board & Casting\*\*/g, '<h3 style="font-size: 1.15rem !important; font-weight: 600 !important; margin: 1.5rem 0 0.5rem 0 !important; color: var(--primary-color) !important;">3. Job Board & Casting</h3>')
                            .replace(/\*\*4\. Equipment Marketplace\*\*/g, '<h3 style="font-size: 1.15rem !important; font-weight: 600 !important; margin: 1.5rem 0 0.5rem 0 !important; color: var(--primary-color) !important;">4. Equipment Marketplace</h3>')
                            .replace(/\*\*5\. Social & Community Features\*\*/g, '<h3 style="font-size: 1.15rem !important; font-weight: 600 !important; margin: 1.5rem 0 0.5rem 0 !important; color: var(--primary-color) !important;">5. Social & Community Features</h3>')

                            .replace(/\*\*Step 1: Stakeholder Requirements\*\*/g, '<h3 style="font-size: 1.1rem !important; font-weight: 600 !important; margin: 1.5rem 0 0.5rem 0 !important; color: var(--primary-color) !important;">Step 1: Stakeholder Requirements</h3>')
                            .replace(/\*\*Step 2: Design in Figma\*\*/g, '<h3 style="font-size: 1.1rem !important; font-weight: 600 !important; margin: 1.5rem 0 0.5rem 0 !important; color: var(--primary-color) !important;">Step 2: Design in Figma</h3>')
                            .replace(/\*\*Step 3: AI-Assisted Development\*\*/g, '<h3 style="font-size: 1.1rem !important; font-weight: 600 !important; margin: 1.5rem 0 0.5rem 0 !important; color: var(--primary-color) !important;">Step 3: AI-Assisted Development</h3>')
                            .replace(/\*\*Step 4: Stakeholder Feedback & Iteration\*\*/g, '<h3 style="font-size: 1.1rem !important; font-weight: 600 !important; margin: 1.5rem 0 0.5rem 0 !important; color: var(--primary-color) !important;">Step 4: Stakeholder Feedback & Iteration</h3>')
                            .replace(/\*\*1\. Mobile-First Everything\*\*/g, '<h3 style="font-size: 1.15rem !important; font-weight: 600 !important; margin: 1.5rem 0 0.5rem 0 !important; color: var(--primary-color) !important;">1. Mobile-First Everything</h3>')
                            .replace(/\*\*2\. Visual Portfolios Over Text\*\*/g, '<h3 style="font-size: 1.15rem !important; font-weight: 600 !important; margin: 1.5rem 0 0.5rem 0 !important; color: var(--primary-color) !important;">2. Visual Portfolios Over Text</h3>')
                            .replace(/\*\*3\. Trust & Verification Systems\*\*/g, '<h3 style="font-size: 1.15rem !important; font-weight: 600 !important; margin: 1.5rem 0 0.5rem 0 !important; color: var(--primary-color) !important;">3. Trust & Verification Systems</h3>')
                            .replace(/\*\*4\. Consolidated Navigation\*\*/g, '<h3 style="font-size: 1.15rem !important; font-weight: 600 !important; margin: 1.5rem 0 0.5rem 0 !important; color: var(--primary-color) !important;">4. Consolidated Navigation</h3>')
                            .replace(/\*\*Current Traction:\*\*/g, '<h3 style="font-size: 1.15rem !important; font-weight: 600 !important; margin: 1.5rem 0 0.5rem 0 !important; color: var(--primary-color) !important;">Current Traction:</h3>')
                            .replace(/\*\*User Feedback:\*\*/g, '<h3 style="font-size: 1.15rem !important; font-weight: 600 !important; margin: 1.5rem 0 0.5rem 0 !important; color: var(--primary-color) !important;">User Feedback:</h3>')
                            .replace(/\*\*Translating Stakeholder Requirements into User-Centered Design:\*\*/g, '<h3 style="font-size: 1.1rem !important; font-weight: 600 !important; margin: 1.5rem 0 0.5rem 0 !important; color: var(--primary-color) !important;">Translating Stakeholder Requirements into User-Centered Design:</h3>')
                            .replace(/\*\*Designing for Underserved Markets:\*\*/g, '<h3 style="font-size: 1.1rem !important; font-weight: 600 !important; margin: 1.5rem 0 0.5rem 0 !important; color: var(--primary-color) !important;">Designing for Underserved Markets:</h3>')
                            .replace(/\*\*Balancing Multiple Platform Paradigms:\*\*/g, '<h3 style="font-size: 1.1rem !important; font-weight: 600 !important; margin: 1.5rem 0 0.5rem 0 !important; color: var(--primary-color) !important;">Balancing Multiple Platform Paradigms:</h3>')
                            .replace(/\*\*The Dual Role Challenge:\*\*/g, '<h3 style="font-size: 1.1rem !important; font-weight: 600 !important; margin: 1.5rem 0 0.5rem 0 !important; color: var(--primary-color) !important;">The Dual Role Challenge:</h3>')
                            .replace(/\*\*Working Within Real Constraints:\*\*/g, '<h3 style="font-size: 1.1rem !important; font-weight: 600 !important; margin: 1.5rem 0 0.5rem 0 !important; color: var(--primary-color) !important;">Working Within Real Constraints:</h3>')

                            // Convert dashes to proper bullet lists
                            .replace(/- ([^\n]+)/g, '<li>$1</li>')
                            .replace(/(<li>.*<\/li>\n?)+/g, '<ul style="margin: 0.5rem 0 1rem 1.5rem; line-height: 1.6;">$&</ul>')

                            // Remove old heading patterns
                            .replace(/\*\*My Role\*\*/g, '')
                            .replace(/\*\*Research & Discovery: Understanding the African Film Ecosystem\*\*/g, '')
                            .replace(/\*\*Key Research Insights:\*\*/g, '')
                            .replace(/\*\*User Personas\*\*/g, '')
                            .replace(/\*\*Competitive Analysis\*\*/g, '')
                            .replace(/\*\*Design Principles\*\*/g, '<h2 id="design-principles" style="font-size: 1.75rem !important; font-weight: 700 !important; margin: 2rem 0 0.5rem 0 !important; padding-top: 1rem; border-top: 2px solid rgba(59, 130, 246, 0.2); color: var(--secondary-color) !important;">Design Principles</h2>')
                            .replace(/\*\*Information Architecture: The Hub Model\*\*/g, '<h2 id="architecture" style="font-size: 1.75rem !important; font-weight: 700 !important; margin: 2rem 0 0.5rem 0 !important; padding-top: 1rem; border-top: 2px solid rgba(59, 130, 246, 0.2); color: var(--secondary-color) !important;">Information Architecture</h2><p style="margin: 0 0 0.5rem 0 !important; font-style: italic; color: var(--text-color);">The Hub Model</p>')
                            .replace(/\*\*Key UX Innovations\*\*/g, '<h2 id="innovations" style="font-size: 1.75rem !important; font-weight: 700 !important; margin: 2rem 0 0.5rem 0 !important; padding-top: 1rem; border-top: 2px solid rgba(59, 130, 246, 0.2); color: var(--secondary-color) !important;">Key UX Innovations</h2>')
                            .replace(/\*\*Design System & Visual Language\*\*/g, '<h2 id="design-system" style="font-size: 1.75rem !important; font-weight: 700 !important; margin: 2rem 0 0.5rem 0 !important; padding-top: 1rem; border-top: 2px solid rgba(59, 130, 246, 0.2); color: var(--secondary-color) !important;">Design System & Visual Language</h2>')
                            .replace(/\*\*Responsive Design Strategy\*\*/g, '<h2 id="responsive" style="font-size: 1.75rem !important; font-weight: 700 !important; margin: 2rem 0 0.5rem 0 !important; padding-top: 1rem; border-top: 2px solid rgba(59, 130, 246, 0.2); color: var(--secondary-color) !important;">Responsive Design Strategy</h2>')
                            .replace(/\*\*Prototyping & Usability Testing\*\*/g, '<h2 id="testing" style="font-size: 1.75rem !important; font-weight: 700 !important; margin: 2rem 0 0.5rem 0 !important; padding-top: 1rem; border-top: 2px solid rgba(59, 130, 246, 0.2); color: var(--secondary-color) !important;">Prototyping & Usability Testing</h2>')
                            .replace(/\*\*Technical Implementation Considerations\*\*/g, '<h2 id="technical" style="font-size: 1.75rem !important; font-weight: 700 !important; margin: 2rem 0 0.5rem 0 !important; padding-top: 1rem; border-top: 2px solid rgba(59, 130, 246, 0.2); color: var(--secondary-color) !important;">Technical Implementation Considerations</h2>')
                            .replace(/\*\*Impact & Outcomes\*\*/g, '<h2 id="impact" style="font-size: 1.75rem !important; font-weight: 700 !important; margin: 2rem 0 0.5rem 0 !important; padding-top: 1rem; border-top: 2px solid rgba(59, 130, 246, 0.2); color: var(--secondary-color) !important;">Impact & Outcomes</h2>')
                            .replace(/\*\*Next Steps: Platform Evolution\*\*/g, '<h2 id="next-steps" style="font-size: 1.75rem !important; font-weight: 700 !important; margin: 2rem 0 0.5rem 0 !important; padding-top: 1rem; border-top: 2px solid rgba(59, 130, 246, 0.2); color: var(--secondary-color) !important;">Next Steps</h2><p style="margin: 0 0 0.5rem 0 !important; font-style: italic; color: var(--text-color);">Platform Evolution</p>')
                            .replace(/\*\*Reflection: Designing for an Underserved Market\*\*/g, '<h2 id="reflection" style="font-size: 1.75rem !important; font-weight: 700 !important; margin: 2rem 0 0.5rem 0 !important; padding-top: 1rem; border-top: 2px solid rgba(59, 130, 246, 0.2); color: var(--secondary-color) !important;">Reflection</h2><p style="margin: 0 0 0.5rem 0 !important; font-style: italic; color: var(--text-color);">Designing for an Underserved Market</p>')
                            .replace(/\*\*The Bigger Picture\*\*/g, '<h2 id="bigger-picture" style="font-size: 1.75rem !important; font-weight: 700 !important; margin: 2rem 0 0.5rem 0 !important; padding-top: 1rem; border-top: 2px solid rgba(59, 130, 246, 0.2); color: var(--secondary-color) !important;">The Bigger Picture</h2>')

                            // H3 subsections
                            .replace(/\*\*Finding ([0-9]+): ([^*]+)\*\*/g, '<h3 style="font-size: 1.15rem !important; font-weight: 600 !important; margin: 1.5rem 0 0.5rem 0 !important; color: var(--primary-color) !important;">Finding $1: $2</h3>')
                            .replace(/\*\*1\. Portfolio-First Profile Design\*\*/g, '<h3 id="innovation-1" style="font-size: 1.2rem !important; font-weight: 600 !important; margin: 1.5rem 0 0.5rem 0 !important; color: var(--secondary-color) !important;">1. Portfolio-First Profile Design</h3>')
                            .replace(/\*\*2\. Advanced Filtering System\*\*/g, '<h3 id="innovation-2" style="font-size: 1.2rem !important; font-weight: 600 !important; margin: 1.5rem 0 0.5rem 0 !important; color: var(--secondary-color) !important;">2. Advanced Filtering System</h3>')
                            .replace(/\*\*3\. Streamlined Job Posting Flow\*\*/g, '<h3 id="innovation-3" style="font-size: 1.2rem !important; font-weight: 600 !important; margin: 1.5rem 0 0.5rem 0 !important; color: var(--secondary-color) !important;">3. Streamlined Job Posting Flow</h3>')
                            .replace(/\*\*4\. Equipment Marketplace with Trust Infrastructure\*\*/g, '<h3 id="innovation-4" style="font-size: 1.2rem !important; font-weight: 600 !important; margin: 1.5rem 0 0.5rem 0 !important; color: var(--secondary-color) !important;">4. Equipment Marketplace with Trust Infrastructure</h3>')
                            .replace(/\*\*5\. Contextual Messaging Integration\*\*/g, '<h3 id="innovation-5" style="font-size: 1.2rem !important; font-weight: 600 !important; margin: 1.5rem 0 0.5rem 0 !important; color: var(--secondary-color) !important;">5. Contextual Messaging Integration</h3>')

                            // Personas
                            .replace(/\*\*Persona 1: ([^*]+)\*\*/g, '<p style="margin: 1.5rem 0 0.5rem 0 !important;"><span style="font-size: 1.1rem; font-weight: 600; color: var(--primary-color); display: inline-block;">Persona 1: $1</span><br/>')
                            .replace(/\*\*Persona 2: ([^*]+)\*\*/g, '</p><p style="margin: 1.5rem 0 0.5rem 0 !important;"><span style="font-size: 1.1rem; font-weight: 600; color: var(--primary-color); display: inline-block;">Persona 2: $1</span><br/>')
                            .replace(/\*\*Persona 3: ([^*]+)\*\*/g, '</p><p style="margin: 1.5rem 0 0.5rem 0 !important;"><span style="font-size: 1.1rem; font-weight: 600; color: var(--primary-color); display: inline-block;">Persona 3: $1</span><br/>')
                            .replace(/\*\*Persona 4: ([^*]+)\*\*/g, '</p><p style="margin: 1.5rem 0 0.5rem 0 !important;"><span style="font-size: 1.1rem; font-weight: 600; color: var(--primary-color); display: inline-block;">Persona 4: $1</span><br/>')
                            .replace(/\*\*Persona 5: ([^*]+)\*\*/g, '</p><p style="margin: 1.5rem 0 0.5rem 0 !important;"><span style="font-size: 1.1rem; font-weight: 600; color: var(--primary-color); display: inline-block;">Persona 5: $1</span><br/>')
                            .replace(/\*\*Persona 6: ([^*]+)\*\*/g, '</p><p style="margin: 1.5rem 0 0.5rem 0 !important;"><span style="font-size: 1.1rem; font-weight: 600; color: var(--primary-color); display: inline-block;">Persona 6: $1</span><br/>')
                            .replace(/Behavior: Eager learner, limited portfolio, seeks mentorship and networking/g, 'Behavior: Eager learner, limited portfolio, seeks mentorship and networking</p>')

                            // Format Competitive Analysis section
                            .replace(/Analyzed existing platforms to identify opportunities:\n\n\*\*IMDb\*\*: Comprehensive database but lacks hiring, networking, and African market focus\n\*\*Backstage\*\*: Strong casting tools but US-centric, expensive, limited portfolio features\n\*\*LinkedIn\*\*: Professional networking but lacks film-specific features and visual portfolios\n\*\*Instagram\/YouTube\*\*: Portfolio sharing but no hiring integration or professional credibility\n\*\*WhatsApp Groups\*\*: Informal networking but chaotic, unsearchable, no verification\n\n\*\*Gap Identified\*\*: No platform combines discovery, hiring, collaboration, and marketplace functionality tailored to African film markets\./g,
                              'Analyzed existing platforms to identify opportunities:<ul style="margin: 0.5rem 0 1rem 1.5rem; line-height: 1.8;"><li><strong>IMDb</strong>: Comprehensive database but lacks hiring, networking, and African market focus</li><li><strong>Backstage</strong>: Strong casting tools but US-centric, expensive, limited portfolio features</li><li><strong>LinkedIn</strong>: Professional networking but lacks film-specific features and visual portfolios</li><li><strong>Instagram/YouTube</strong>: Portfolio sharing but no hiring integration or professional credibility</li><li><strong>WhatsApp Groups</strong>: Informal networking but chaotic, unsearchable, no verification</li></ul><p style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid var(--primary-color); padding: 1rem; margin: 1rem 0; border-radius: 4px;"><strong style="color: var(--primary-color);">Gap Identified:</strong> No platform combines discovery, hiring, collaboration, and marketplace functionality tailored to African film markets.</p>')

                            // Format Design Principles as numbered list
                            .replace(/1\. \*\*Mobile-First, Always\*\*: Optimize every interaction for smartphone usage with limited connectivity\n2\. \*\*Visual Storytelling\*\*: Prioritize media-rich portfolios over text-heavy profiles\n3\. \*\*Trust Through Verification\*\*: Build credibility systems with ratings, endorsements, and verified work\n4\. \*\*Contextual Networking\*\*: Integrate social features within professional workflows, not as separate feeds\n5\. \*\*Inclusive by Design\*\*: Support diverse technical skill levels and language preferences/g,
                              '<ol style="margin: 0.5rem 0 1rem 1.5rem; line-height: 1.8;"><li><strong>Mobile-First, Always</strong>: Optimize every interaction for smartphone usage with limited connectivity</li><li><strong>Visual Storytelling</strong>: Prioritize media-rich portfolios over text-heavy profiles</li><li><strong>Trust Through Verification</strong>: Build credibility systems with ratings, endorsements, and verified work</li><li><strong>Contextual Networking</strong>: Integrate social features within professional workflows, not as separate feeds</li><li><strong>Inclusive by Design</strong>: Support diverse technical skill levels and language preferences</li></ol>')

                            // Format Information Architecture Hub sections
                            .replace(/Designed a hub-and-spoke architecture with five core modules:\n\n\*\*1\. Profile Hub\*\*: Portfolio-centric professional profiles\n• Media galleries \(photos, videos, reels\)\n• Filmography with project links\n• Skills and certifications\n• Endorsements and reviews\n• Rate expectations and availability calendar/g,
                              'Designed a hub-and-spoke architecture with five core modules:<h3 style="font-size: 1.15rem !important; font-weight: 600 !important; margin: 1.5rem 0 0.5rem 0 !important; color: var(--primary-color) !important;">1. Profile Hub</h3><p style="margin: 0 0 0.5rem 0; font-style: italic;">Portfolio-centric professional profiles</p><ul style="margin: 0.5rem 0 1rem 1.5rem; line-height: 1.6;"><li>Media galleries (photos, videos, reels)</li><li>Filmography with project links</li><li>Skills and certifications</li><li>Endorsements and reviews</li><li>Rate expectations and availability calendar</li></ul>')

                            .replace(/\*\*2\. Discovery Hub\*\*: Advanced talent and project search\n• Filter by role, location, experience, availability, rate\n• Visual portfolio browsing\n• Saved searches and notifications\n• Recommendation engine based on project history/g,
                              '<h3 style="font-size: 1.15rem !important; font-weight: 600 !important; margin: 1.5rem 0 0.5rem 0 !important; color: var(--primary-color) !important;">2. Discovery Hub</h3><p style="margin: 0 0 0.5rem 0; font-style: italic;">Advanced talent and project search</p><ul style="margin: 0.5rem 0 1rem 1.5rem; line-height: 1.6;"><li>Filter by role, location, experience, availability, rate</li><li>Visual portfolio browsing</li><li>Saved searches and notifications</li><li>Recommendation engine based on project history</li></ul>')

                            .replace(/\*\*3\. Collaboration Hub\*\*: Project management and networking\n• Project pages with crew listings\n• Real-time messaging integrated with hiring\n• Opportunity board for casting calls and job postings\n• Application tracking for production teams/g,
                              '<h3 style="font-size: 1.15rem !important; font-weight: 600 !important; margin: 1.5rem 0 0.5rem 0 !important; color: var(--primary-color) !important;">3. Collaboration Hub</h3><p style="margin: 0 0 0.5rem 0; font-style: italic;">Project management and networking</p><ul style="margin: 0.5rem 0 1rem 1.5rem; line-height: 1.6;"><li>Project pages with crew listings</li><li>Real-time messaging integrated with hiring</li><li>Opportunity board for casting calls and job postings</li><li>Application tracking for production teams</li></ul>')

                            .replace(/\*\*4\. Marketplace Hub\*\*: Equipment rental and services\n• Equipment listings with specifications and rates\n• Availability calendars and booking system\n• Rental agreements and insurance options\n• Rating and review system\n• Damage dispute resolution/g,
                              '<h3 style="font-size: 1.15rem !important; font-weight: 600 !important; margin: 1.5rem 0 0.5rem 0 !important; color: var(--primary-color) !important;">4. Marketplace Hub</h3><p style="margin: 0 0 0.5rem 0; font-style: italic;">Equipment rental and services</p><ul style="margin: 0.5rem 0 1rem 1.5rem; line-height: 1.6;"><li>Equipment listings with specifications and rates</li><li>Availability calendars and booking system</li><li>Rental agreements and insurance options</li><li>Rating and review system</li><li>Damage dispute resolution</li></ul>')

                            .replace(/\*\*5\. Community Hub\*\*: Industry networking and learning\n• Film festival calendars and industry events\n• Educational resources and tutorials\n• Discussion forums by specialization\n• Mentorship matching/g,
                              '<h3 style="font-size: 1.15rem !important; font-weight: 600 !important; margin: 1.5rem 0 0.5rem 0 !important; color: var(--primary-color) !important;">5. Community Hub</h3><p style="margin: 0 0 0.5rem 0; font-style: italic;">Industry networking and learning</p><ul style="margin: 0.5rem 0 1rem 1.5rem; line-height: 1.6;"><li>Film festival calendars and industry events</li><li>Educational resources and tutorials</li><li>Discussion forums by specialization</li><li>Mentorship matching</li></ul>')

                            // Format UX Innovation bullet lists
                            .replace(/Created a visually-driven profile template prioritizing media over text:\n• \*\*Hero Reel\*\*: Link to vidoe showcasing best work \(muted, 30-second max\)\n• \*\*Project Tiles\*\*: Grid layout with hover previews showing role and project details\n• \*\*Skill Tags\*\*: Visual badges for equipment proficiency, software expertise, and certifications\n• \*\*Availability Status\*\*: Prominent indicator \(Available, Booked, Open to Opportunities\)\n• \*\*Mobile Optimization\*\*: Infinite scroll replacing pagination, touch-friendly galleries/g,
                              'Created a visually-driven profile template prioritizing media over text:<ul style="margin: 0.5rem 0 1rem 1.5rem; line-height: 1.6;"><li><strong>Hero Reel</strong>: Auto-playing video showcasing best work (muted, 30-second max)</li><li><strong>Project Tiles</strong>: Grid layout with hover previews showing role and project details</li><li><strong>Skill Tags</strong>: Visual badges for equipment proficiency, software expertise, and certifications</li><li><strong>Availability Status</strong>: Prominent indicator (Available, Booked, Open to Opportunities)</li><li><strong>Mobile Optimization</strong>: Infinite scroll replacing pagination, touch-friendly galleries</li></ul>')

                            .replace(/Designed a multi-layered filtering interface for talent discovery:\n• \*\*Smart Filters\*\*: Pre-configured searches \(e\.g\., "Available cinematographers in Lagos under \$500\/day"\)\n• \*\*Faceted Search\*\*: Combine role, location, experience, availability, rate, equipment access\n• \*\*Visual Previews\*\*: Thumbnail galleries in search results for quick assessment\n• \*\*Saved Searches\*\*: Notification alerts when new matches appear\n• \*\*Mobile Collapsed Filters\*\*: Progressive disclosure preventing mobile clutter/g,
                              'Designed a multi-layered filtering interface for talent discovery:<ul style="margin: 0.5rem 0 1rem 1.5rem; line-height: 1.6;"><li><strong>Smart Filters</strong>: Pre-configured searches (e.g., "Available cinematographers in Lagos under $500/day")</li><li><strong>Faceted Search</strong>: Combine role, location, experience, availability, rate, equipment access</li><li><strong>Visual Previews</strong>: Thumbnail galleries in search results for quick assessment</li><li><strong>Saved Searches</strong>: Notification alerts when new matches appear</li><li><strong>Mobile Collapsed Filters</strong>: Progressive disclosure preventing mobile clutter</li></ul>')

                            .replace(/Redesigned job posting from 10\+ minute forms to guided 2-minute workflow:\n• \*\*Smart Templates\*\*: Pre-filled forms for common roles \(Director, DP, Gaffer, etc\.\)\n• \*\*Budget Transparency\*\*: Rate range indicators reducing negotiation friction\n• \*\*Timeline Wizard\*\*: Calendar picker with shoot dates and availability matching\n• \*\*Instant Publishing\*\*: Real-time notifications to matching professionals\n• \*\*Application Tracking\*\*: Centralized dashboard managing responses/g,
                              'Redesigned job posting from 10+ minute forms to guided 2-minute workflow:<ul style="margin: 0.5rem 0 1rem 1.5rem; line-height: 1.6;"><li><strong>Smart Templates</strong>: Pre-filled forms for common roles (Director, DP, Gaffer, etc.)</li><li><strong>Budget Transparency</strong>: Rate range indicators reducing negotiation friction</li><li><strong>Timeline Wizard</strong>: Calendar picker with shoot dates and availability matching</li><li><strong>Instant Publishing</strong>: Real-time notifications to matching professionals</li><li><strong>Application Tracking</strong>: Centralized dashboard managing responses</li></ul>')

                            .replace(/Created a rental marketplace addressing safety and verification concerns:\n• \*\*Detailed Specifications\*\*: Equipment profiles with photos, manuals, and condition reports\n• \*\*Rental Agreements\*\*: Standardized contracts with damage policies and insurance options\n• \*\*Rating System\*\*: 5-star ratings for equipment owners and renters\n• \*\*Booking Calendar\*\*: Real-time availability with automated conflict prevention\n• \*\*Secure Payments\*\*: Escrow system with damage deposit handling\n• \*\*Dispute Resolution\*\*: Mediation workflow with photo documentation/g,
                              'Created a rental marketplace addressing safety and verification concerns:<ul style="margin: 0.5rem 0 1rem 1.5rem; line-height: 1.6;"><li><strong>Detailed Specifications</strong>: Equipment profiles with photos, manuals, and condition reports</li><li><strong>Rental Agreements</strong>: Standardized contracts with damage policies and insurance options</li><li><strong>Rating System</strong>: 5-star ratings for equipment owners and renters</li><li><strong>Booking Calendar</strong>: Real-time availability with automated conflict prevention</li><li><strong>Secure Payments</strong>: Escrow system with damage deposit handling</li><li><strong>Dispute Resolution</strong>: Mediation workflow with photo documentation</li></ul>')

                            .replace(/Integrated messaging within hiring and collaboration workflows:\n• \*\*Project-Based Threads\*\*: Conversations organized by production, not just contacts\n• \*\*Quick Actions\*\*: Send application, share portfolio, propose rates directly in chat\n• \*\*Typing Indicators & Read Receipts\*\*: Real-time communication status\n• \*\*File Sharing\*\*: Send contracts, call sheets, and creative briefs\n• \*\*Mobile Notifications\*\*: Prioritized alerts for opportunities over social messages/g,
                              'Integrated messaging within hiring and collaboration workflows:<ul style="margin: 0.5rem 0 1rem 1.5rem; line-height: 1.6;"><li><strong>Project-Based Threads</strong>: Conversations organized by production, not just contacts</li><li><strong>Quick Actions</strong>: Send application, share portfolio, propose rates directly in chat</li><li><strong>Typing Indicators & Read Receipts</strong>: Real-time communication status</li><li><strong>File Sharing</strong>: Send contracts, call sheets, and creative briefs</li><li><strong>Mobile Notifications</strong>: Prioritized alerts for opportunities over social messages</li></ul>')

                            // Format Key Findings bullets
                            .replace(/\*\*Key Findings:\*\*\n• \*\*Mobile-First is Non-Negotiable\*\*: 85% of professionals access networks via smartphone; poor connectivity requires efficient data usage\n• \*\*Credibility Verification is Critical\*\*: Users hesitant to hire without verified portfolios; fake profiles erode trust\n• \*\*Talent Discovery Requires Robust Filtering\*\*: Hiring managers need specific skill filtering with visual portfolio browsing\n• \*\*Equipment Marketplace Needs Trust Infrastructure\*\*: Informal sharing leads to disputes; owners need ratings and contracts\n• \*\*Contextual Networking Required\*\*: Users need industry-specific collaboration, not generic social media/g,
                              '<h3 style="font-size: 1.15rem !important; font-weight: 600 !important; margin: 1.5rem 0 0.5rem 0 !important; color: var(--primary-color) !important;">Key Findings</h3><ul style="margin: 0.5rem 0 1rem 1.5rem; line-height: 1.6;"><li><strong>Mobile-First is Non-Negotiable</strong>: 85% of professionals access networks via smartphone; poor connectivity requires efficient data usage</li><li><strong>Credibility Verification is Critical</strong>: Users hesitant to hire without verified portfolios; fake profiles erode trust</li><li><strong>Talent Discovery Requires Robust Filtering</strong>: Hiring managers need specific skill filtering with visual portfolio browsing</li><li><strong>Equipment Marketplace Needs Trust Infrastructure</strong>: Informal sharing leads to disputes; owners need ratings and contracts</li><li><strong>Contextual Networking Required</strong>: Users need industry-specific collaboration, not generic social media</li></ul>')

                            // Subsection headings
                            .replace(/\*\*Typography\*\*:/g, '<p style="margin: 1rem 0 0.5rem 0;"><strong style="font-size: 1.05rem; color: var(--primary-color);">Typography:</strong></p>')
                            .replace(/\*\*Color Palette\*\*:/g, '<p style="margin: 1rem 0 0.5rem 0;"><strong style="font-size: 1.05rem; color: var(--primary-color);">Color Palette:</strong></p>')
                            .replace(/\*\*Components\*\*:/g, '<p style="margin: 1rem 0 0.5rem 0;"><strong style="font-size: 1.05rem; color: var(--primary-color);">Components:</strong></p>')
                            .replace(/\*\*Iconography\*\*:/g, '<p style="margin: 1rem 0 0.5rem 0;"><strong style="font-size: 1.05rem; color: var(--primary-color);">Iconography:</strong></p>')
                            .replace(/\*\*Spacing\*\*:/g, '<p style="margin: 1rem 0 0.5rem 0;"><strong style="font-size: 1.05rem; color: var(--primary-color);">Spacing:</strong></p>')
                            .replace(/\*\*UX Efficiency Gains\*\*:/g, '<p style="margin: 1rem 0 0.5rem 0;"><strong style="font-size: 1.05rem; color: var(--primary-color);">UX Efficiency Gains:</strong></p>')
                            .replace(/\*\*Business Results\*\*:/g, '<p style="margin: 1rem 0 0.5rem 0;"><strong style="font-size: 1.05rem; color: var(--primary-color);">Business Results:</strong></p>')
                            .replace(/\*\*Industry Impact\*\*:/g, '<p style="margin: 1rem 0 0.5rem 0;"><strong style="font-size: 1.05rem; color: var(--primary-color);">Industry Impact:</strong></p>')
                            .replace(/\*\*Phase 1 Priorities \(Current\)\*\*:/g, '<p style="margin: 1rem 0 0.5rem 0;"><strong style="font-size: 1.05rem; color: var(--primary-color);">Phase 1 Priorities (Current):</strong></p>')
                            .replace(/\*\*Phase 2 Roadmap\*\*:/g, '<p style="margin: 1rem 0 0.5rem 0;"><strong style="font-size: 1.05rem; color: var(--primary-color);">Phase 2 Roadmap:</strong></p>')
                            .replace(/\*\*Phase 3 Vision\*\*:/g, '<p style="margin: 1rem 0 0.5rem 0;"><strong style="font-size: 1.05rem; color: var(--primary-color);">Phase 3 Vision:</strong></p>')
                            .replace(/\*\*Round 1: Low-Fidelity Wireframes \(5 users\)\*\*/g, '<h3 style="font-size: 1.15rem !important; font-weight: 600 !important; margin: 1.5rem 0 0.5rem 0 !important; color: var(--primary-color) !important;">Round 1: Low-Fidelity Wireframes (5 users)</h3>')
                            .replace(/\*\*Round 2: High-Fidelity Prototypes \(10 users\)\*\*/g, '<h3 style="font-size: 1.15rem !important; font-weight: 600 !important; margin: 1.5rem 0 0.5rem 0 !important; color: var(--primary-color) !important;">Round 2: High-Fidelity Prototypes (10 users)</h3>')
                            .replace(/\*\*Findings\*\*:/g, '<p style="margin: 1rem 0 0.5rem 0;"><strong style="font-size: 1.05rem; color: var(--primary-color);">Findings:</strong></p>')
                            .replace(/\*\*Iterations\*\*:/g, '<p style="margin: 1rem 0 0.5rem 0;"><strong style="font-size: 1.05rem; color: var(--primary-color);">Iterations:</strong></p>')
                            .replace(/\*\*Success Metrics\*\*:/g, '<p style="margin: 1rem 0 0.5rem 0;"><strong style="font-size: 1.05rem; color: var(--primary-color);">Success Metrics:</strong></p>')
                            .replace(/\*\*Key Insights\*\*:/g, '<p style="margin: 1rem 0 0.5rem 0;"><strong style="font-size: 1.05rem; color: var(--primary-color);">Key Insights:</strong></p>')
                            .replace(/\*\*Performance Optimization\*\*:/g, '<p style="margin: 1rem 0 0.5rem 0;"><strong style="font-size: 1.05rem; color: var(--primary-color);">Performance Optimization:</strong></p>')
                            .replace(/\*\*Accessibility\*\*:/g, '<p style="margin: 1rem 0 0.5rem 0;"><strong style="font-size: 1.05rem; color: var(--primary-color);">Accessibility:</strong></p>')
                            .replace(/\*\*Localization\*\*:/g, '<p style="margin: 1rem 0 0.5rem 0;"><strong style="font-size: 1.05rem; color: var(--primary-color);">Localization:</strong></p>')
                            .replace(/\*\*Security & Privacy\*\*:/g, '<p style="margin: 1rem 0 0.5rem 0;"><strong style="font-size: 1.05rem; color: var(--primary-color);">Security & Privacy:</strong></p>')

                            // Results callouts with mobile screenshots
                            .replace(/\*\*Result\*\*: 85% task completion rate for portfolio browsing in usability testing vs\. 60% with text-heavy alternatives/g, '<p style="background: rgba(34, 197, 94, 0.1); border-left: 4px solid #22c55e; padding: 1rem; margin: 1rem 0; border-radius: 4px; font-size: 0.95rem; line-height: 1.6;"><strong style="color: #22c55e;">Result:</strong> <strong>85% task completion rate</strong> for portfolio browsing in usability testing vs. 60% with text-heavy alternatives</p><div style="text-align: center; margin: 2rem 0;"><img src="/assets/images/efilmhub/profile-page.png" alt="Portfolio-First Profile Design" class="mobile-screenshot" style="max-width: 280px; height: auto; border-radius: 12px; box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2); cursor: pointer; transition: all 0.3s ease; display: inline-block;" onclick="document.getElementById(\'modal-overlay\').style.display=\'flex\'; document.getElementById(\'modal-img\').src=this.src; document.body.style.overflow=\'hidden\';" onError="this.style.display=\'none\'" /><p style="font-size: 0.9rem; opacity: 0.7; font-style: italic; margin-top: 1rem;">Professional profile with hero reel, project tiles, and skill badges (tap to expand)</p></div>')
                            .replace(/\*\*Result\*\*: Reduced time to find and contact suitable talent from 2\+ weeks to under 30 minutes/g, '<p style="background: rgba(34, 197, 94, 0.1); border-left: 4px solid #22c55e; padding: 1rem; margin: 1rem 0; border-radius: 4px; font-size: 0.95rem; line-height: 1.6;"><strong style="color: #22c55e;">Result:</strong> Reduced time to find and contact suitable talent from <strong>2+ weeks to under 30 minutes</strong></p><div style="text-align: center; margin: 2rem 0;"><img src="/assets/images/efilmhub/search-filter.png" alt="Advanced Filtering System" class="mobile-screenshot" style="max-width: 280px; height: auto; border-radius: 12px; box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2); cursor: pointer; transition: all 0.3s ease; display: inline-block;" onclick="document.getElementById(\'modal-overlay\').style.display=\'flex\'; document.getElementById(\'modal-img\').src=this.src; document.body.style.overflow=\'hidden\';" onError="this.style.display=\'none\'" /><p style="font-size: 0.9rem; opacity: 0.7; font-style: italic; margin-top: 1rem;">Multi-layered filtering interface with faceted search (tap to expand)</p></div>')
                            .replace(/\*\*Result\*\*: Job posting time reduced from 10\+ minutes to under 2 minutes/g, '<p style="background: rgba(34, 197, 94, 0.1); border-left: 4px solid #22c55e; padding: 1rem; margin: 1rem 0; border-radius: 4px; font-size: 0.95rem; line-height: 1.6;"><strong style="color: #22c55e;">Result:</strong> Job posting time reduced from <strong>10+ minutes to under 2 minutes</strong></p><div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1.5rem; margin: 2rem 0; justify-items: center;"><div style="text-align: center;"><img src="/assets/images/efilmhub/job-posting-1.png" alt="Job Posting Step 1" class="mobile-screenshot" style="max-width: 250px; height: auto; border-radius: 12px; box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2); cursor: pointer; transition: all 0.3s ease;" onclick="document.getElementById(\'modal-overlay\').style.display=\'flex\'; document.getElementById(\'modal-img\').src=this.src; document.body.style.overflow=\'hidden\';" onError="this.style.display=\'none\'" /><p style="font-size: 0.85rem; opacity: 0.7; margin-top: 0.5rem;">Step 1: Add Project</p></div><div style="text-align: center;"><img src="/assets/images/efilmhub/job-posting-2.png" alt="Job Posting Step 2" class="mobile-screenshot" style="max-width: 250px; height: auto; border-radius: 12px; box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2); cursor: pointer; transition: all 0.3s ease;" onclick="document.getElementById(\'modal-overlay\').style.display=\'flex\'; document.getElementById(\'modal-img\').src=this.src; document.body.style.overflow=\'hidden\';" onError="this.style.display=\'none\'" /><p style="font-size: 0.85rem; opacity: 0.7; margin-top: 0.5rem;">Step 2: Smart Form</p></div><div style="text-align: center;"><img src="/assets/images/efilmhub/job-posting-3.png" alt="Job Posting Step 3" class="mobile-screenshot" style="max-width: 250px; height: auto; border-radius: 12px; box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2); cursor: pointer; transition: all 0.3s ease;" onclick="document.getElementById(\'modal-overlay\').style.display=\'flex\'; document.getElementById(\'modal-img\').src=this.src; document.body.style.overflow=\'hidden\';" onError="this.style.display=\'none\'" /><p style="font-size: 0.85rem; opacity: 0.7; margin-top: 0.5rem;">Step 3: Apply</p></div></div><p style="font-size: 0.9rem; opacity: 0.7; font-style: italic; text-align: center; margin-top: -0.5rem;">Guided job posting flow (tap any image to expand)</p>')
                            .replace(/\*\*Result\*\*: Increased equipment rental confidence from 40% to 85% in user testing/g, '<p style="background: rgba(34, 197, 94, 0.1); border-left: 4px solid #22c55e; padding: 1rem; margin: 1rem 0; border-radius: 4px; font-size: 0.95rem; line-height: 1.6;"><strong style="color: #22c55e;">Result:</strong> Increased equipment rental confidence from <strong>40% to 85%</strong> in user testing</p><div style="text-align: center; margin: 2rem 0;"><img src="/assets/images/efilmhub/equipment-grid.png" alt="Equipment Marketplace" class="mobile-screenshot" style="max-width: 280px; height: auto; border-radius: 12px; box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2); cursor: pointer; transition: all 0.3s ease; display: inline-block;" onclick="document.getElementById(\'modal-overlay\').style.display=\'flex\'; document.getElementById(\'modal-img\').src=this.src; document.body.style.overflow=\'hidden\';" onError="this.style.display=\'none\'" /><p style="font-size: 0.9rem; opacity: 0.7; font-style: italic; margin-top: 1rem;">Equipment marketplace with listings and trust features (tap to expand)</p></div>')
                            .replace(/\*\*Result\*\*: 90% of users preferred integrated messaging over switching between WhatsApp and platform/g, '<p style="background: rgba(34, 197, 94, 0.1); border-left: 4px solid #22c55e; padding: 1rem; margin: 1rem 0; border-radius: 4px; font-size: 0.95rem; line-height: 1.6;"><strong style="color: #22c55e;">Result:</strong> <strong>90% of users</strong> preferred integrated messaging over switching between WhatsApp and platform</p><div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1.5rem; margin: 2rem 0; justify-items: center;"><div style="text-align: center;"><img src="/assets/images/efilmhub/messaging-1.png" alt="Messaging Interface" class="mobile-screenshot" style="max-width: 260px; height: auto; border-radius: 12px; box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2); cursor: pointer; transition: all 0.3s ease;" onclick="document.getElementById(\'modal-overlay\').style.display=\'flex\'; document.getElementById(\'modal-img\').src=this.src; document.body.style.overflow=\'hidden\';" onError="this.style.display=\'none\'" /><p style="font-size: 0.85rem; opacity: 0.7; margin-top: 0.5rem;">Messaging Threads</p></div><div style="text-align: center;"><img src="/assets/images/efilmhub/messaging-2.png" alt="Quick Actions" class="mobile-screenshot" style="max-width: 260px; height: auto; border-radius: 12px; box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2); cursor: pointer; transition: all 0.3s ease;" onclick="document.getElementById(\'modal-overlay\').style.display=\'flex\'; document.getElementById(\'modal-img\').src=this.src; document.body.style.overflow=\'hidden\';" onError="this.style.display=\'none\'" /><p style="font-size: 0.85rem; opacity: 0.7; margin-top: 0.5rem;">Quick Actions</p></div></div><p style="font-size: 0.9rem; opacity: 0.7; font-style: italic; text-align: center; margin-top: -0.5rem;">Project-based messaging with contextual actions (tap any image to expand)</p>')

                            // Convert remaining bold text to inline emphasis
                            .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
                        }} />
                      </>
                    ) : project.id === 'lpwealthgroup' ? (
                      <>
                        <div dangerouslySetInnerHTML={{
                          __html: project.description
                            // Main section headings - LP Wealth Group
                            .replace(/\*\*The Challenge: Unprofessional Web Presence Limiting Growth\*\*/g, '<h2 id="challenge" style="font-size: 1.75rem !important; font-weight: 700 !important; margin: 2rem 0 0.5rem 0 !important; padding-top: 1rem; border-top: 2px solid rgba(59, 130, 246, 0.2); color: var(--secondary-color) !important;">The Challenge: Unprofessional Web Presence Limiting Growth</h2>')
                            .replace(/\*\*My Role: UX Engineer\*\*/g, '<h2 id="role" style="font-size: 1.75rem !important; font-weight: 700 !important; margin: 2rem 0 0.5rem 0 !important; padding-top: 1rem; border-top: 2px solid rgba(59, 130, 246, 0.2); color: var(--secondary-color) !important;">My Role: UX Engineer</h2>')
                            .replace(/\*\*Discovery & Requirements Gathering\*\*/g, '<h2 id="discovery" style="font-size: 1.75rem !important; font-weight: 700 !important; margin: 2rem 0 0.5rem 0 !important; padding-top: 1rem; border-top: 2px solid rgba(59, 130, 246, 0.2); color: var(--secondary-color) !important;">Discovery & Requirements Gathering</h2>')
                            .replace(/\*\*The Dual-Audience Challenge\*\*/g, '<h2 id="dual-audience" style="font-size: 1.75rem !important; font-weight: 700 !important; margin: 2rem 0 0.5rem 0 !important; padding-top: 1rem; border-top: 2px solid rgba(59, 130, 246, 0.2); color: var(--secondary-color) !important;">The Dual-Audience Challenge</h2>')
                            .replace(/\*\*Information Architecture: Audience-First Structure\*\*/g, '<h2 id="architecture" style="font-size: 1.75rem !important; font-weight: 700 !important; margin: 2rem 0 0.5rem 0 !important; padding-top: 1rem; border-top: 2px solid rgba(59, 130, 246, 0.2); color: var(--secondary-color) !important;">Information Architecture: Audience-First Structure</h2>')
                            .replace(/\*\*Iterative Design Process\*\*/g, '<h2 id="process" style="font-size: 1.75rem !important; font-weight: 700 !important; margin: 2rem 0 0.5rem 0 !important; padding-top: 1rem; border-top: 2px solid rgba(59, 130, 246, 0.2); color: var(--secondary-color) !important;">Iterative Design Process</h2>')
                            .replace(/\*\*Key Design Decisions\*\*/g, '<h2 id="design-decisions" style="font-size: 1.75rem !important; font-weight: 700 !important; margin: 2rem 0 0.5rem 0 !important; padding-top: 1rem; border-top: 2px solid rgba(59, 130, 246, 0.2); color: var(--secondary-color) !important;">Key Design Decisions</h2>')
                            .replace(/\*\*Design System\*\*/g, '<h2 id="design-system" style="font-size: 1.75rem !important; font-weight: 700 !important; margin: 2rem 0 0.5rem 0 !important; padding-top: 1rem; border-top: 2px solid rgba(59, 130, 246, 0.2); color: var(--secondary-color) !important;">Design System</h2>')
                            .replace(/\*\*Technical Implementation\*\*/g, '<h2 id="technical" style="font-size: 1.75rem !important; font-weight: 700 !important; margin: 2rem 0 0.5rem 0 !important; padding-top: 1rem; border-top: 2px solid rgba(59, 130, 246, 0.2); color: var(--secondary-color) !important;">Technical Implementation</h2>')
                            .replace(/\*\*Platform Launch & Impact\*\*/g, '<h2 id="impact" style="font-size: 1.75rem !important; font-weight: 700 !important; margin: 2rem 0 0.5rem 0 !important; padding-top: 1rem; border-top: 2px solid rgba(59, 130, 246, 0.2); color: var(--secondary-color) !important;">Platform Launch & Impact</h2>')
                            .replace(/\*\*What This Project Taught Me\*\*/g, '<h2 id="learnings" style="font-size: 1.75rem !important; font-weight: 700 !important; margin: 2rem 0 0.5rem 0 !important; padding-top: 1rem; border-top: 2px solid rgba(59, 130, 246, 0.2); color: var(--secondary-color) !important;">What This Project Taught Me</h2>')
                            .replace(/\*\*Next Steps\*\*/g, '<h2 id="next-steps" style="font-size: 1.75rem !important; font-weight: 700 !important; margin: 2rem 0 0.5rem 0 !important; padding-top: 1rem; border-top: 2px solid rgba(59, 130, 246, 0.2); color: var(--secondary-color) !important;">Next Steps</h2>')

                            // Add images for LP Wealth Group
                            .replace(/\*\*\[IMAGE: Homepage\]\*\*/g, '<img src="/assets/images/lpwealthgroup/homepage.png" alt="LP Wealth Group Homepage" style="width: 100%; max-width: 700px; height: auto; border-radius: 8px; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15); margin: 2rem auto; display: block; object-fit: contain;" /><p style="font-size: 0.9rem; opacity: 0.7; font-style: italic; text-align: center; margin: -1rem 0 2rem 0;">Professional homepage with clear dual-audience pathways and trust-building elements</p>')
                            .replace(/\*\*\[IMAGE: Athletes Section\]\*\*/g, '<img src="/assets/images/lpwealthgroup/athletes-section.png" alt="Athletes Section" style="width: 100%; max-width: 700px; height: auto; border-radius: 8px; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15); margin: 2rem auto; display: block; object-fit: contain;" /><p style="font-size: 0.9rem; opacity: 0.7; font-style: italic; text-align: center; margin: -1rem 0 2rem 0;">"Protect Your Bag From Day One." Tailored messaging for student athletes</p>')
                            .replace(/\*\*\[IMAGE: Investors Section\]\*\*/g, '<img src="/assets/images/lpwealthgroup/investors-section.png" alt="Investors Section" style="width: 100%; max-width: 700px; height: auto; border-radius: 8px; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15); margin: 2rem auto; display: block; object-fit: contain;" /><p style="font-size: 0.9rem; opacity: 0.7; font-style: italic; text-align: center; margin: -1rem 0 2rem 0;">"Stability That Outpaces Volatility." Targeted content for established investors</p>')
                            .replace(/\*\*\[IMAGE: Mobile View\]\*\*/g, '<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; margin: 2rem 0; max-width: 800px; margin-left: auto; margin-right: auto;"><div style="overflow: hidden; border-radius: 8px; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15); height: 600px; position: relative;"><img src="/assets/images/lpwealthgroup/mobile-view.png" alt="Mobile Homepage - Hero Section" style="width: 100%; height: auto; object-fit: cover; object-position: top 0 left 0;" /></div><div style="overflow: hidden; border-radius: 8px; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15); height: 600px; position: relative;"><img src="/assets/images/lpwealthgroup/mobile-view.png" alt="Mobile Homepage - Content & Testimonials" style="width: 100%; height: auto; object-fit: cover; object-position: top -2200px left 0;" /></div></div><p style="font-size: 0.9rem; opacity: 0.7; font-style: italic; text-align: center; margin: -1rem 0 2rem 0;">Mobile-responsive design optimized for sharing on phones during meetings</p>')
                            .replace(/\*\*\[IMAGE: Partners Carousel\]\*\*/g, '<img src="/assets/images/lpwealthgroup/partners-carousel.png" alt="Partners Carousel" style="width: 100%; max-width: 700px; height: auto; border-radius: 8px; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15); margin: 2rem auto; display: block; object-fit: contain;" /><p style="font-size: 0.9rem; opacity: 0.7; font-style: italic; text-align: center; margin: -1rem 0 2rem 0;">Partner carousel featuring major insurance carriers for institutional credibility</p>')

                            // Subsection headings
                            .replace(/\*\*Responsibilities:\*\*/g, '<h3 style="font-size: 1.15rem !important; font-weight: 600 !important; margin: 1.5rem 0 0.5rem 0 !important; color: var(--primary-color) !important;">Responsibilities:</h3>')
                            .replace(/\*\*Business Goals:\*\*/g, '<h3 style="font-size: 1.15rem !important; font-weight: 600 !important; margin: 1.5rem 0 0.5rem 0 !important; color: var(--primary-color) !important;">Business Goals:</h3>')
                            .replace(/\*\*Design Direction:\*\*/g, '<h3 style="font-size: 1.15rem !important; font-weight: 600 !important; margin: 1.5rem 0 0.5rem 0 !important; color: var(--primary-color) !important;">Design Direction:</h3>')
                            .replace(/\*\*Student Athletes:\*\*/g, '<h3 style="font-size: 1.1rem !important; font-weight: 600 !important; margin: 1.5rem 0 0.5rem 0 !important; color: var(--primary-color) !important;">Student Athletes:</h3>')
                            .replace(/\*\*Investors:\*\*/g, '<h3 style="font-size: 1.1rem !important; font-weight: 600 !important; margin: 1.5rem 0 0.5rem 0 !important; color: var(--primary-color) !important;">Investors:</h3>')
                            .replace(/\*\*Main Navigation:\*\*/g, '<h3 style="font-size: 1.15rem !important; font-weight: 600 !important; margin: 1.5rem 0 0.5rem 0 !important; color: var(--primary-color) !important;">Main Navigation:</h3>')
                            .replace(/\*\*Step 1: Understanding the Content\*\*/g, '<h3 style="font-size: 1.1rem !important; font-weight: 600 !important; margin: 1.5rem 0 0.5rem 0 !important; color: var(--primary-color) !important;">Step 1: Understanding the Content</h3>')
                            .replace(/\*\*Step 2: Figma Mockups\*\*/g, '<h3 style="font-size: 1.1rem !important; font-weight: 600 !important; margin: 1.5rem 0 0.5rem 0 !important; color: var(--primary-color) !important;">Step 2: Figma Mockups</h3>')
                            .replace(/\*\*Step 3: Iterative Refinement \(5 Rounds\)\*\*/g, '<h3 style="font-size: 1.1rem !important; font-weight: 600 !important; margin: 1.5rem 0 0.5rem 0 !important; color: var(--primary-color) !important;">Step 3: Iterative Refinement (5 Rounds)</h3>')
                            .replace(/\*\*Step 4: WordPress Development\*\*/g, '<h3 style="font-size: 1.1rem !important; font-weight: 600 !important; margin: 1.5rem 0 0.5rem 0 !important; color: var(--primary-color) !important;">Step 4: WordPress Development</h3>')
                            .replace(/\*\*1\. Mobile-First Responsive Design\*\*/g, '<h3 style="font-size: 1.15rem !important; font-weight: 600 !important; margin: 1.5rem 0 0.5rem 0 !important; color: var(--primary-color) !important;">1. Mobile-First Responsive Design</h3>')
                            .replace(/\*\*2\. Dual-Audience Navigation\*\*/g, '<h3 style="font-size: 1.15rem !important; font-weight: 600 !important; margin: 1.5rem 0 0.5rem 0 !important; color: var(--primary-color) !important;">2. Dual-Audience Navigation</h3>')
                            .replace(/\*\*3\. Trust & Credibility Elements\*\*/g, '<h3 style="font-size: 1.15rem !important; font-weight: 600 !important; margin: 1.5rem 0 0.5rem 0 !important; color: var(--primary-color) !important;">3. Trust & Credibility Elements</h3>')
                            .replace(/\*\*4\. Conversion-Optimized User Flows\*\*/g, '<h3 style="font-size: 1.15rem !important; font-weight: 600 !important; margin: 1.5rem 0 0.5rem 0 !important; color: var(--primary-color) !important;">4. Conversion-Optimized User Flows</h3>')
                            .replace(/\*\*Platform:\*\*/g, '<h3 style="font-size: 1.1rem !important; font-weight: 600 !important; margin: 1.5rem 0 0.5rem 0 !important; color: var(--primary-color) !important;">Platform:</h3>')
                            .replace(/\*\*Key Features:\*\*/g, '<h3 style="font-size: 1.15rem !important; font-weight: 600 !important; margin: 1.5rem 0 0.5rem 0 !important; color: var(--primary-color) !important;">Key Features:</h3>')
                            .replace(/\*\*Ongoing Maintenance:\*\*/g, '<h3 style="font-size: 1.15rem !important; font-weight: 600 !important; margin: 1.5rem 0 0.5rem 0 !important; color: var(--primary-color) !important;">Ongoing Maintenance:</h3>')
                            .replace(/\*\*Launch:\*\*/g, '<h3 style="font-size: 1.1rem !important; font-weight: 600 !important; margin: 1.5rem 0 0.5rem 0 !important; color: var(--primary-color) !important;">Launch:</h3>')
                            .replace(/\*\*Real-World Usage:\*\*/g, '<h3 style="font-size: 1.15rem !important; font-weight: 600 !important; margin: 1.5rem 0 0.5rem 0 !important; color: var(--primary-color) !important;">Real-World Usage:</h3>')
                            .replace(/\*\*Business Development:\*\*/g, '<h3 style="font-size: 1.15rem !important; font-weight: 600 !important; margin: 1.5rem 0 0.5rem 0 !important; color: var(--primary-color) !important;">Business Development:</h3>')
                            .replace(/\*\*Client Feedback:\*\*/g, '<h3 style="font-size: 1.15rem !important; font-weight: 600 !important; margin: 1.5rem 0 0.5rem 0 !important; color: var(--primary-color) !important;">Client Feedback:</h3>')
                            .replace(/\*\*Designing for Dual Audiences:\*\*/g, '<h3 style="font-size: 1.1rem !important; font-weight: 600 !important; margin: 1.5rem 0 0.5rem 0 !important; color: var(--primary-color) !important;">Designing for Dual Audiences:</h3>')
                            .replace(/\*\*Stakeholder Collaboration:\*\*/g, '<h3 style="font-size: 1.1rem !important; font-weight: 600 !important; margin: 1.5rem 0 0.5rem 0 !important; color: var(--primary-color) !important;">Stakeholder Collaboration:</h3>')
                            .replace(/\*\*From Self-Made to Professional:\*\*/g, '<h3 style="font-size: 1.1rem !important; font-weight: 600 !important; margin: 1.5rem 0 0.5rem 0 !important; color: var(--primary-color) !important;">From Self-Made to Professional:</h3>')
                            .replace(/\*\*Technical Versatility:\*\*/g, '<h3 style="font-size: 1.1rem !important; font-weight: 600 !important; margin: 1.5rem 0 0.5rem 0 !important; color: var(--primary-color) !important;">Technical Versatility:</h3>')

                            // Convert dashes to proper bullet lists
                            .replace(/- ([^\n]+)/g, '<li>$1</li>')
                            .replace(/(<li>.*<\/li>\n?)+/g, '<ul style="margin: 0.5rem 0 1rem 1.5rem; line-height: 1.6;">$&</ul>')

                            // Convert remaining bold text to inline emphasis
                            .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
                        }} />
                      </>
                    ) : (
                      project.description
                    )}
                  </SectionContent>
                </Section>
              </motion.div>
            </MainContent>

            {project.id === 'eudo' && (
              <TableOfContents>
                <TOCTitle isLight={isLight}>In This Case Study</TOCTitle>
                <TOCList>
                  <TOCItem><TOCLink href="#challenge">The Challenge</TOCLink></TOCItem>
                  <TOCItem><TOCLink href="#role">My Role</TOCLink></TOCItem>
                  <TOCItem><TOCLink href="#discovery">Discovery & Requirements</TOCLink></TOCItem>
                  <TOCItem><TOCLink href="#prototypes">Building on Prototypes</TOCLink></TOCItem>
                  <TOCItem><TOCLink href="#approach">Design Approach</TOCLink></TOCItem>
                  <TOCItem><TOCLink href="#architecture">Information Architecture</TOCLink></TOCItem>
                  <TOCItem><TOCLink href="#challenges">Design Challenges & Solutions</TOCLink></TOCItem>
                  <TOCItem><TOCLink href="#technical">Technical Implementation</TOCLink></TOCItem>
                  <TOCItem><TOCLink href="#progress">Current Progress</TOCLink></TOCItem>
                  <TOCItem><TOCLink href="#learnings">What I Learned</TOCLink></TOCItem>
                  <TOCItem><TOCLink href="#constraints">Development Constraints</TOCLink></TOCItem>
                  <TOCItem><TOCLink href="#next-steps">Next Steps</TOCLink></TOCItem>
                  <TOCItem><TOCLink href="#reflection">Reflection</TOCLink></TOCItem>
                </TOCList>
              </TableOfContents>
            )}

            {project.id === 'efilmhub' && (
              <TableOfContents>
                <TOCTitle isLight={isLight}>In This Case Study</TOCTitle>
                <TOCList>
                  <TOCItem><TOCLink href="#challenge">The Challenge</TOCLink></TOCItem>
                  <TOCItem><TOCLink href="#role">My Role</TOCLink></TOCItem>
                  <TOCItem><TOCLink href="#discovery">Discovery & Requirements</TOCLink></TOCItem>
                  <TOCItem><TOCLink href="#competitive">Competitive Analysis</TOCLink></TOCItem>
                  <TOCItem><TOCLink href="#ux-challenge">The UX Challenge</TOCLink></TOCItem>
                  <TOCItem><TOCLink href="#architecture">Information Architecture</TOCLink></TOCItem>
                  <TOCItem><TOCLink href="#process">Iterative Design Process</TOCLink></TOCItem>
                  <TOCItem><TOCLink href="#design-decisions">Key Design Decisions</TOCLink></TOCItem>
                  <TOCItem><TOCLink href="#design-system">Design System</TOCLink></TOCItem>
                  <TOCItem><TOCLink href="#constraints">Development Constraints</TOCLink></TOCItem>
                  <TOCItem><TOCLink href="#impact">Platform Launch & Impact</TOCLink></TOCItem>
                  <TOCItem><TOCLink href="#learnings">What I Learned</TOCLink></TOCItem>
                  <TOCItem><TOCLink href="#next-steps">Next Steps</TOCLink></TOCItem>
                </TOCList>
              </TableOfContents>
            )}

            {project.id === 'lpwealthgroup' && (
              <TableOfContents>
                <TOCTitle isLight={isLight}>In This Case Study</TOCTitle>
                <TOCList>
                  <TOCItem><TOCLink href="#challenge">The Challenge</TOCLink></TOCItem>
                  <TOCItem><TOCLink href="#role">My Role</TOCLink></TOCItem>
                  <TOCItem><TOCLink href="#discovery">Discovery & Requirements</TOCLink></TOCItem>
                  <TOCItem><TOCLink href="#dual-audience">Dual-Audience Challenge</TOCLink></TOCItem>
                  <TOCItem><TOCLink href="#architecture">Information Architecture</TOCLink></TOCItem>
                  <TOCItem><TOCLink href="#process">Iterative Design Process</TOCLink></TOCItem>
                  <TOCItem><TOCLink href="#design-decisions">Key Design Decisions</TOCLink></TOCItem>
                  <TOCItem><TOCLink href="#design-system">Design System</TOCLink></TOCItem>
                  <TOCItem><TOCLink href="#technical">Technical Implementation</TOCLink></TOCItem>
                  <TOCItem><TOCLink href="#impact">Platform Launch & Impact</TOCLink></TOCItem>
                  <TOCItem><TOCLink href="#learnings">What I Learned</TOCLink></TOCItem>
                  <TOCItem><TOCLink href="#next-steps">Next Steps</TOCLink></TOCItem>
                </TOCList>
              </TableOfContents>
            )}
          </ContentGrid>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <CTASection>
              <CTATitle>Interested in Working Together?</CTATitle>
              <CTAText>Let's discuss how I can help bring your next project to life</CTAText>
              <ButtonGroup>
                <Button as={Link} to="/contact" primary={true}>
                  <FaEnvelope /> Get in Touch
                </Button>
                <Button onClick={handleBackToProjects}>
                  View More Projects <FaArrowLeft style={{ transform: 'rotate(180deg)' }} />
                </Button>
              </ButtonGroup>
            </CTASection>
          </motion.div>
        </div>
      </ContentSection>
    </PageContainer>
  );
};

export default ProjectDetail;
