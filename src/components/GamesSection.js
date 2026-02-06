import React from 'react';
import { ArrowRight } from 'lucide-react';
import { games } from '../data/data';
import { useNavigate } from 'react-router-dom';
import '../styles/GamesSection.css';

function GamesSection() {
  const navigate = useNavigate();

  return (
    <section className="games-section">
      <div className="section-header">
        <h2 className="section-title text-neon-blue">Oyunlar</h2>
        <a href="#" className="see-all-link">
          Tümünü Gör <ArrowRight size={16} />
        </a>
      </div>
      
      <div className="games-grid">
        {games.map(game => (
          <div 
            key={game.id} 
            className="game-card glass neon-glow-blue"
            onClick={() => navigate(`/game/${game.id}`)}
          >
            <div className="game-badge">
              {game.lobbies} Lobi
            </div>
            <div className="game-image">
              <div 
                className="game-image-bg"
                style={{
                  background: `linear-gradient(135deg, ${game.color}20 0%, ${game.color}40 100%)`
                }}
              >
                <div className="game-logo" style={{color: game.color}}>
                  {game.name.charAt(0)}
                </div>
              </div>
            </div>
            <div className="game-info">
              <h3 className="game-name">{game.name}</h3>
              <p className="game-players">{game.players} oyuncu</p>
            </div>
            <button className="game-arrow">
              <ArrowRight size={24} />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default GamesSection;
