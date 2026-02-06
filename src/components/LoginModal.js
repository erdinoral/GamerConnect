import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import '../styles/LoginModal.css';

function LoginModal({ onClose }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const userData = {
      username: username || 'Kullanıcı',
      email: email,
      trustScore: Math.floor(Math.random() * 30) + 70,
      rank: ['Bronz', 'Gümüş', 'Altın', 'Platin', 'Elmas'][Math.floor(Math.random() * 5)]
    };

    login(userData);
    onClose();
    alert(`Hoş geldiniz, ${userData.username}!`);
  };

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close-modal" onClick={onClose}>&times;</span>
        <div className="login-prompt">
          <i className="fas fa-user-circle" style={{fontSize: '3rem', marginBottom: '1rem'}}></i>
          <h2>Giriş Yap</h2>
          <form onSubmit={handleSubmit}>
            <input 
              type="text" 
              placeholder="Kullanıcı Adı" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required 
            />
            <input 
              type="email" 
              placeholder="E-posta" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
            <input 
              type="password" 
              placeholder="Şifre" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
            <button type="submit" className="btn-primary">
              <i className="fas fa-sign-in-alt"></i> Giriş Yap
            </button>
          </form>
          <p style={{marginTop: '1rem', color: 'var(--text-secondary)'}}>
            Hesabınız yok mu? <a href="#" style={{color: 'var(--primary-color)'}}>Kayıt Ol</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginModal;
