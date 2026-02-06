import React from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';
import AdBanner from '../components/AdBanner';
import LobbyTabs from '../components/LobbyTabs';
import { useAuth } from '../context/AuthContext';
import '../pages/Lobby.css';

function Lobby() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  const requireLogin = (callback) => {
    if (!isLoggedIn) {
      alert('Bu işlemi gerçekleştirmek için lütfen giriş yapın.');
      return false;
    }
    if (callback) callback();
    return true;
  };

  return (
    <div className="page-container" style={{marginTop: '80px', padding: '40px 20px'}}>
      <BackButton />
      <div className="container">
        <div className="page-header">
          <h1><i className="fas fa-users"></i> Lobi & Forum</h1>
          <p>Takım arkadaşı bul, sorular sor, toplulukla etkileşim kur</p>
        </div>

        <div className="lobby-layout">
          <aside className="sidebar-left">
            <AdBanner height="300px" />
          </aside>

          <main className="lobby-main">
            <LobbyTabs requireLogin={requireLogin} navigate={navigate} />
          </main>

          <aside className="sidebar-right">
            <AdBanner height="300px" />
          </aside>
        </div>
      </div>
    </div>
  );
}

export default Lobby;
