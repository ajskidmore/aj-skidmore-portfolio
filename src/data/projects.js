// src/data/projects.js
// The five featured projects. Used by the Projects section, the project pages
// (/projects/:id) and the "Featured Projects" list on the About page.
// The older long-form case studies are archived in src/archive/case-studies/.

export const ROLE = 'Designer & Developer';

export const featuredProjects = [
  {
    id: 'travelcare',
    name: 'TravelCare+',
    title: 'TravelCare+',
    category: 'Healthcare',
    summary:
      'A companion app for travel nurses and therapists: compare offers, track licenses and plan each assignment.',
    overview:
      'Travel healthcare workers juggle contracts, licenses in several states and tax rules that are hard to follow. TravelCare+ turns that into plain-English guides and simple tools: an offer comparison that estimates real take-home pay, a credentials tracker with renewal reminders, an assignment planner, and a compact checker that answers "Can I work in this state?". Every fact links to an official source, and every feature works without an account.',
    designFocus: [
      'Designed for clinicians: plain language at a 6th–8th grade reading level, with details tucked behind expand controls',
      'Audited to WCAG 2.2 AA: 0 automated axe violations across 20 pages, plus keyboard, contrast, reflow and motion checks',
      'Status shown with words and shape, never color alone; 44px touch targets and 16px minimum body text',
      'Custom design system with documented color, type and spacing tokens in light and dark themes',
      'One responsive layout: top navigation on wide screens, bottom tabs on phones',
    ],
    tools: ['Next.js', 'React', 'TypeScript', 'Firebase', 'Design tokens', 'axe-core'],
    imageUrl: '/assets/images/featured/travelcare.png',
    imageAlt:
      'TravelCare+ home page with the headline "The travel healthcare guide nobody gave you" and buttons to start learning or plan a trip',
    liveUrl: 'https://travelcareplus.com/',
  },
  {
    id: 'efilmhub',
    name: 'eFilmHub',
    title: 'eFilmHub',
    category: 'Social platform',
    summary:
      'A professional network for the African film industry that brings talent discovery, hiring and collaboration into one place.',
    overview:
      'Film professionals across Africa were finding crew, jobs and equipment through scattered social media groups. eFilmHub gives them one platform with portfolio-style profiles, talent search, job postings and messaging. I interviewed filmmakers to understand how they work, then designed and built the experience mobile-first, since most members use the site on their phones.',
    designFocus: [
      'User interviews and personas covering directors, producers, crew and actors',
      'User flows, wireframes and prototypes in Figma, refined through usability testing',
      'Mobile-first, responsive layouts built from reusable components',
      'Search filters by role, location and availability, made easy to find after testing showed people missed them',
    ],
    tools: ['Figma', 'React', 'TypeScript', 'Next.js', 'Node.js', 'Google Cloud'],
    imageUrl: '/assets/images/featured/efilmhub.png',
    imageAlt:
      'eFilmHub home page with navigation for Connect, The Hub, Film Schools and Events above a "Welcome, Africa Filmmakers Connect" banner',
    liveUrl: 'https://efilmhub.com/',
  },
  {
    id: 'loopwise',
    name: 'Loopwise',
    title: 'Loopwise',
    category: 'Education',
    summary:
      'A learn-to-code app that takes people from "What is code?" to computer science fundamentals in bite-sized lessons.',
    overview:
      'Loopwise teaches programming from absolute zero, with short lessons, real Python and JavaScript that runs in the browser, checkpoint tests and review of missed questions. Streaks, levels and Pip, an original robot mascot, keep learners coming back. It works right away in guest mode, and a free account saves progress across devices.',
    designFocus: [
      'Built to WCAG 2.2 AA with automated accessibility checks that must pass before every release',
      'Color tokens chosen for contrast: text and course colors meet 4.5:1, icons meet 3:1',
      'One consistent icon set instead of emoji, so the interface reads the same on every device and screen reader',
      'Original mascot and illustration style, with friendly copy written for complete beginners',
    ],
    tools: ['React', 'TypeScript', 'Vite', 'Firebase', 'Pyodide', 'Lucide icons'],
    imageUrl: '/assets/images/featured/loopwise.png',
    imageAlt:
      'Loopwise home page with the robot mascot Pip, the headline "Learn to code for free!" and four feature cards',
    liveUrl: 'https://loopwise-de7e1.web.app/',
  },
  {
    id: 'bloom',
    name: 'Bloom',
    title: 'Bloom',
    category: 'Health & wellness',
    summary:
      'A wellness tracker for habits, food, sleep, water, mood and workouts, with a flower that grows when you keep your routine.',
    overview:
      'Bloom brings daily health tracking into one calm, friendly app. People log meals with a photo and an editable nutrition estimate, track sleep, water, steps, weight and mood, and see trends over 7, 30 or 90 days. A flower flourishes when habits are kept and wilts when they slip, and friends can cheer each other on without seeing private health data.',
    designFocus: [
      'Mobile-first app that installs to the home screen',
      'Privacy by design: friends see progress only, never food, weight, photos, sleep or journal entries',
      'Editable estimates and clear labels, so people stay in control of their own health data',
      'Simple visual feedback (the flower and progress bar) that makes daily progress easy to understand at a glance',
    ],
    tools: ['HTML', 'CSS', 'JavaScript', 'Firebase', 'Progressive Web App'],
    imageUrl: '/assets/images/featured/bloom.png',
    imageAlt:
      'Bloom Today screen with a smiling potted flower, a 60% watered progress bar and starter habits such as Drink water and Sleep 7+ hours',
    liveUrl: 'https://bloom-wellness-28cww.web.app/',
  },
  {
    id: 'eudo',
    name: 'Eudo',
    title: 'Eudo',
    category: 'Analytics platform',
    summary:
      'A platform that helps HR teams build a business case, run programs as experiments and track results against the forecast.',
    overview:
      'HR teams invest in programs without a clear way to show what worked. Eudo helps them build a business case, design each program as an experiment and track actual results against the forecast, so they can show impact and learn from every program they run. I led the product design and front-end development, from research with HR leaders to the data visualizations.',
    designFocus: [
      'Research with HR leaders to map their workflows and reporting needs',
      'Turned complex statistical results into clear, labeled charts and plain-language summaries',
      'Designed multi-step workflows that guide users through setting up an experiment',
      'Charts use direct labels and solid, dotted and dashed lines, so data series are never told apart by color alone',
    ],
    tools: ['Figma', 'React', 'TypeScript', 'Next.js', 'Firebase', 'BigQuery'],
    imageUrl: '/assets/images/featured/eudo.png',
    imageAlt:
      'Eudo home page with the headline "Measure the value your team creates" next to a line chart of actual results against the business case forecast',
    liveUrl: 'https://eudo.co/',
  },
];

export const getProjectById = (id) => featuredProjects.find((p) => p.id === id);
