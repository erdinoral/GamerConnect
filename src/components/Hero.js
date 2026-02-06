import React from 'react';
import { useNavigate } from 'react-router-dom';

function Hero() {
  const navigate = useNavigate();

  return (
    <section id="home" className="hero">
      <div className="mesh-gradient-1"></div>
      <div className="mesh-gradient-2"></div>
      <div className="hero-content">
        <h1 className="hero-title">Oyun Dünyasına Hoş Geldiniz</h1>
        <p className="hero-subtitle">Binlerce oyunu keşfedin, oynayın ve paylaşın</p>
        <div className="hero-buttons">
          <button className="btn-hero btn-primary" onClick={() => document.getElementById('games')?.scrollIntoView({ behavior: 'smooth' })}>
            Oyunları Keşfet
          </button>
          <button className="btn-hero btn-secondary" onClick={() => document.getElementById('games')?.scrollIntoView({ behavior: 'smooth' })}>
            Popüler Oyunlar
          </button>
        </div>
      </div>
      <div className="hero-image">
        <div className="floating-card">
          <i className="fas fa-trophy"></i>
          <span>En Popüler</span>
        </div>
      </div>
    </section>
  );
}

export default Hero;
