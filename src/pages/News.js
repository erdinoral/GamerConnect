import React from 'react';
import BackButton from '../components/BackButton';
import AdBanner from '../components/AdBanner';

function News() {
  return (
    <div className="page-container" style={{marginTop: '80px', padding: '40px 20px'}}>
      <BackButton />
      <div className="container">
        <div className="page-header">
          <h1><i className="fas fa-newspaper"></i> Haberler & Güncellemeler</h1>
          <p>E-spor dünyasından ve oyun mağazalarından son haberler</p>
        </div>
        <div className="news-layout">
          <aside className="sidebar-left">
            <AdBanner height="300px" />
          </aside>
          <main className="news-main">
            <p>Haberler içeriği yakında eklenecek...</p>
          </main>
          <aside className="sidebar-right">
            <AdBanner height="300px" />
          </aside>
        </div>
      </div>
    </div>
  );
}

export default News;
