import { render, screen, within } from '@testing-library/react';
import App from './App';
import { featuredProjects } from './data/projects';

// Firestore is only used when the contact form is submitted; keep tests offline.
jest.mock('./firebase/config', () => ({ db: {} }));

const escapeRegExp = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const renderAt = (path) => {
  window.history.pushState({}, '', path);
  return render(<App />);
};

test('main navigation links to Home, About, Projects and Contact, not Skills', () => {
  renderAt('/');
  const nav = screen.getByRole('navigation', { name: 'Main' });
  ['Home', 'About', 'Projects', 'Contact'].forEach((name) => {
    expect(within(nav).getByRole('link', { name })).toBeInTheDocument();
  });
  expect(within(nav).queryByRole('link', { name: 'Skills' })).not.toBeInTheDocument();
});

test('home page has one h1 and a skip link', () => {
  renderAt('/');
  expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
  expect(screen.getByRole('link', { name: 'Skip to main content' })).toHaveAttribute('href', '#main-content');
});

test('projects page shows all five projects, each linking to its page', () => {
  renderAt('/projects');
  featuredProjects.forEach((project) => {
    expect(screen.getByRole('heading', { name: project.name })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: new RegExp(`View project.*${escapeRegExp(project.name)}`) }))
      .toHaveAttribute('href', `/projects/${project.id}`);
  });
});

test('each project page shows its overview and live link', () => {
  featuredProjects.forEach((project) => {
    const { unmount } = renderAt(`/projects/${project.id}`);
    expect(screen.getByRole('heading', { level: 1, name: project.name })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: new RegExp(`Visit ${escapeRegExp(project.name)}`) }))
      .toHaveAttribute('href', project.liveUrl);
    unmount();
  });
});

test('about page features TravelCare+, eFilmHub and Eudo in that order', () => {
  renderAt('/about');
  const projectNames = featuredProjects.map((p) => p.name);
  const shown = screen.getAllByRole('heading', { level: 3 })
    .map((h) => h.textContent)
    .filter((text) => projectNames.includes(text));
  expect(shown).toEqual(['TravelCare+', 'eFilmHub', 'Eudo']);
});

test('/skills redirects to the about page', () => {
  renderAt('/skills');
  expect(window.location.pathname).toBe('/about');
  expect(screen.getByRole('heading', { level: 1, name: 'About Me' })).toBeInTheDocument();
});

test('unknown routes and /admin show the 404 page', () => {
  ['/nope', '/admin'].forEach((path) => {
    const { unmount } = renderAt(path);
    expect(screen.getByRole('heading', { level: 1, name: '404' })).toBeInTheDocument();
    unmount();
  });
});
