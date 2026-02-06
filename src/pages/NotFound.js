import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Home, Zap } from 'lucide-react';
import '../styles/NotFound.css';

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="not-found-page">
      <div className="not-found-content">
        <div className="neon-glow-container">
          <Zap size={120} className="neon-icon" />
        </div>
        <h1 className="not-found-title">
          <span className="neon-text-cyan">Bu Bölüm</span>
          <span className="neon-text-purple"> Yakında</span>
          <span className="neon-text-gold"> Yayında!</span>
        </h1>
        <p className="not-found-description">
          Bu sayfa şu anda geliştirme aşamasında. Yakında sizlerle olacak!
        </p>
        <div className="not-found-actions">
          <button
            onClick={() => navigate('/')}
            className="btn-home neon-glow-cyan"
          >
            <Home size={20} />
            Ana Sayfaya Dön
          </button>
          <button
            onClick={() => navigate(-1)}
            className="btn-back neon-glow-purple"
          >
            <ArrowLeft size={20} />
            Geri Dön
          </button>
        </div>
        <div className="coming-soon-badge">
          <span className="pulse-dot"></span>
          Yakında
        </div>
      </div>
    </div>
  );
}

export default NotFound;
