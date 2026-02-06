import React from 'react';
import { ArrowRight, Mic, Users, Star } from 'lucide-react';
import { popularLobbies } from '../data/data';
import { useNavigate } from 'react-router-dom';
import '../styles/PopularLobbies.css';

function PopularLobbies() {
  const navigate = useNavigate();

  return (
    <section className="popular-lobbies glass">
      <div className="section-header">
        <h3 className="section-title text-neon-purple">Popüler Lobiler</h3>
        <span className="lobby-count">{popularLobbies.filter(l => l.members < l.maxMembers).length} açık</span>
      </div>
      
      <div className="lobbies-list">
        {popularLobbies.map(lobby => (
          <div 
            key={lobby.id} 
            className="lobby-card glass"
            onClick={() => navigate(`/lobby/${lobby.id}`)}
          >
            <div className="lobby-tags">
              {lobby.sponsored && (
                <span className="tag tag-sponsored">
                  <Star size={12} />
                  Sponsorlu
                </span>
              )}
              {lobby.tags.map((tag, index) => (
                <span key={index} className={`tag tag-${tag.toLowerCase().replace(' ', '-')}`}>
                  {tag === 'Mic' ? <Mic size={12} /> : tag === 'Squad' || tag === 'Duo' ? <Users size={12} /> : null}
                  {tag}
                </span>
              ))}
            </div>
            
            <h4 className="lobby-title">{lobby.title}</h4>
            <p className="lobby-description">{lobby.description}</p>
            
            <div className="lobby-footer">
              <div className="lobby-meta">
                <span className="lobby-game">{lobby.game}</span>
                <span className="lobby-members">
                  {lobby.members}/{lobby.maxMembers}
                </span>
                <span className="lobby-time">{lobby.timeAgo}</span>
              </div>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/lobby/${lobby.id}`);
                }}
                className="btn-join neon-glow-blue"
              >
                Katıl <ArrowRight size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default PopularLobbies;
