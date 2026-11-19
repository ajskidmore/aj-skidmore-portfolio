// src/hooks/useDocumentTitle.js
// Sets the browser tab title for a page (WCAG 2.4.2 Page Titled) and restores
// the previous title when the page unmounts.
import { useEffect } from 'react';

export const SITE_TITLE = 'A.J. Skidmore | Full-Stack Engineer & UX Designer';

const useDocumentTitle = (pageTitle) => {
  useEffect(() => {
    const previous = document.title;
    document.title = pageTitle ? `${pageTitle} | A.J. Skidmore` : SITE_TITLE;
    return () => {
      document.title = previous;
    };
  }, [pageTitle]);
};

export default useDocumentTitle;
