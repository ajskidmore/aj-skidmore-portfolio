// Placeholder until this design preview is finished.
import React from 'react';
import { Link } from 'react-router-dom';
import { usePreviewPage } from '../NewDesign/previewPage';

const NewDesign3 = () => {
  usePreviewPage({ title: 'A.J. Skidmore | Design preview 3 (in progress)' });
  return (
    <main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: 24, fontFamily: 'system-ui', textAlign: 'center' }}>
      <div>
        <h1 style={{ margin: '0 0 12px' }}>Design preview 3 is in progress</h1>
        <p><Link to="/new-design2">See design preview 2</Link></p>
      </div>
    </main>
  );
};

export default NewDesign3;
