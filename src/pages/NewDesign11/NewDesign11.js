// Placeholder until this design preview is finished.
import React from 'react';
import { Link } from 'react-router-dom';
import { usePreviewPage } from '../NewDesign/previewPage';

const NewDesign11 = () => {
  usePreviewPage({ title: 'A.J. Skidmore | Design preview 11 (in progress)' });
  return (
    <main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: 24, fontFamily: 'system-ui', textAlign: 'center' }}>
      <div>
        <h1 style={{ margin: '0 0 12px' }}>Design preview 11 is in progress</h1>
        <p><Link to="/new-design10">See design preview 10</Link></p>
      </div>
    </main>
  );
};

export default NewDesign11;
