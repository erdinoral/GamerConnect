import React from 'react';
import BackButton from '../components/BackButton';
import AdBanner from '../components/AdBanner';

function Guides() {
  return (
    <div className="page-container" style={{marginTop: '80px', padding: '40px 20px'}}>
      <BackButton />
      <div className="container">
        <div className="page-header">
          <h1><i className="fas fa-book"></i> Rehberler & Build'ler</h1>
          <p>Topluluk tarafından hazırlanmış taktik rehberleri ve karakter dizilimleri</p>
        </div>
        <div className="guides-layout">
          <aside className="sidebar-left">
            <AdBanner height="250px" />
          </aside>
          <main className="guides-main">
            <p>Rehberler içeriği yakında eklenecek...</p>
          </main>
          <aside className="sidebar-right">
            <AdBanner height="250px" />
          </aside>
        </div>
      </div>
    </div>
  );
}

export default Guides;
