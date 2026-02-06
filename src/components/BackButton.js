import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import '../styles/BackButton.css';

function BackButton() {
  const navigate = useNavigate();
  const location = useLocation();

  // Don't show on home page
  if (location.pathname === '/') {
    return null;
  }

  return (
    <button className="back-btn glass neon-glow-blue" onClick={() => navigate(-1)}>
      <ArrowLeft size={18} />
      Geri Dön
    </button>
  );
}

export default BackButton;
