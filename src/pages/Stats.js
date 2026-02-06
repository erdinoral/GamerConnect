import React from 'react';
import BackButton from '../components/BackButton';
import AdBanner from '../components/AdBanner';

function Stats() {
  return (
    <div className="page-container" style={{marginTop: '80px', padding: '40px 20px'}}>
      <BackButton />
      <div className="container">
        <div className="page-header">
          <h1><i className="fas fa-chart-line"></i> İstatistikler & Meta Analizi</h1>
          <p>Oyun karakterlerinin kazanma oranları ve güncel meta verileri</p>
        </div>
        <div className="stats-layout">
          <aside className="sidebar-left">
            <AdBanner height="300px" />
          </aside>
          <main className="stats-main">
            <p>İstatistikler içeriği yakında eklenecek...</p>
          </main>
          <aside className="sidebar-right">
            <AdBanner height="300px" />
          </aside>
        </div>
      </div>
    </div>
  );
}

export default Stats;
