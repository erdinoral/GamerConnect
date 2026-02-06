import React from 'react';

function AdBanner({ height = '300px' }) {
  return (
    <div className="ad-banner neon-border" style={{height, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px'}}>
      <div className="ad-content">
        <span className="ad-label">Reklam</span>
        <p>{height.replace('px', '')}x{height.replace('px', '')} Reklam Alanı</p>
      </div>
    </div>
  );
}

export default AdBanner;
