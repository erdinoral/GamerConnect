import React from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';
import { Users, Gamepad2 } from 'lucide-react';
import '../styles/Lobbies.css';

const gameLobbies = {
  valorant: { name: 'Valorant', icon: '🎯', color: 'neon-red' },
  cs2: { name: 'Counter-Strike 2', icon: '🔫', color: 'neon-blue' },
  lol: { name: 'League of Legends', icon: '⚔️', color: 'neon-gold' },
  eafc: { name: 'EA Sports FC', icon: '⚽', color: 'neon-cyan' },
  apex: { name: 'Apex Legends', icon: '🎮', color: 'neon-purple' },
  fortnite: { name: 'Fortnite', icon: '🏗️', color: 'neon-cyan' }
};

function Lobbies() {
  const navigate = useNavigate();

  return (
    <div className="lobbies-page">
      <BackButton />
      <div className="container" style={{ paddingTop: '100px', paddingBottom: '40px' }}>
        <div className="lobbies-header">
          <div>
            <h1 className="page-title text-neon-purple">
              <Users size={32} />
              Tüm Lobiler
            </h1>
            <p className="page-subtitle">Oyun kategorilerine göre lobileri keşfedin</p>
          </div>
        </div>

        <div className="games-grid">
          {Object.entries(gameLobbies).map(([key, game]) => (
            <div
              key={key}
              onClick={() => navigate(`/lobbies/${key}`)}
              className="game-card glass cursor-pointer"
              style={{
                borderColor: `var(--neon-${game.color.split('-')[1]})`,
              }}
            >
              <div className="game-icon-large">
                <span className="icon-emoji">{game.icon}</span>
              </div>
              <h3 className="game-name">{game.name}</h3>
              <div className="game-arrow">
                <Gamepad2 size={24} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Lobbies;
