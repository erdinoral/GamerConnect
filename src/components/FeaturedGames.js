import React, { useState } from 'react';
import { gamesData } from '../data/gamesData';

function FeaturedGames() {
  const [filter, setFilter] = useState('all');

  const filteredGames = filter === 'all' 
    ? gamesData 
    : gamesData.filter(game => game.category === filter);

  const getCategoryName = (category) => {
    const categories = {
      'action': 'Aksiyon/FPS',
      'adventure': 'Macera/RPG',
      'strategy': 'Strateji/MOBA',
      'sports': 'Spor',
      'racing': 'Yarış',
      'puzzle': 'Bulmaca'
    };
    return categories[category] || category;
  };

  const openGameModal = (gameId) => {
    const game = gamesData.find(g => g.id === gameId);
    if (!game) return;

    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
      <div class="modal-content">
        <span class="close-modal" onclick="this.closest('.modal').remove()">&times;</span>
        <div class="game-detail">
          <div class="game-detail-image" style="background: linear-gradient(135deg, ${game.color}20 0%, ${game.color}40 100%);">
            <i class="${game.icon}" style="font-size: 5rem; color: ${game.color};"></i>
          </div>
          <div class="game-detail-info">
            <h2>${game.title}</h2>
            <p><strong>Kategori:</strong> ${getCategoryName(game.category)}</p>
            <div class="game-rating" style="margin: 1rem 0;">
              <span class="stars">${'⭐'.repeat(Math.floor(game.rating))}</span>
              <span>${game.rating} / 5.0</span>
            </div>
            <p><strong>Oyuncu Sayısı:</strong> ${game.players}</p>
            <p style="margin-top: 1rem;">${game.description}</p>
            <div style="margin-top: 2rem;">
              <button class="btn-primary" style="padding: 15px 30px; font-size: 1.1rem; background: linear-gradient(135deg, ${game.color} 0%, ${game.color}dd 100%);">
                <i class="fas fa-play"></i> Oyunu Oyna
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
    modal.style.display = 'block';
  };

  return (
    <section id="games" className="section">
      <div className="container">
        <div className="section-header">
          <h2>Öne Çıkan Oyunlar</h2>
          <div className="filter-tabs">
            <button className={`filter-tab ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>
              Tümü
            </button>
            <button className={`filter-tab ${filter === 'action' ? 'active' : ''}`} onClick={() => setFilter('action')}>
              Aksiyon
            </button>
            <button className={`filter-tab ${filter === 'adventure' ? 'active' : ''}`} onClick={() => setFilter('adventure')}>
              Macera
            </button>
            <button className={`filter-tab ${filter === 'strategy' ? 'active' : ''}`} onClick={() => setFilter('strategy')}>
              Strateji
            </button>
            <button className={`filter-tab ${filter === 'sports' ? 'active' : ''}`} onClick={() => setFilter('sports')}>
              Spor
            </button>
          </div>
        </div>
        <div className="games-grid">
          {filteredGames.map(game => {
            const stars = '⭐'.repeat(Math.floor(game.rating));
            return (
              <div key={game.id} className="game-card">
                <div className="game-image" style={{background: `linear-gradient(135deg, ${game.color}20 0%, ${game.color}40 100%)`}}>
                  <i className={game.icon} style={{fontSize: '4rem', zIndex: 1, position: 'relative', color: game.color, textShadow: `0 0 20px ${game.color}80`}}></i>
                </div>
                <div className="game-info">
                  <h3 className="game-title">{game.title}</h3>
                  <p className="game-category">{getCategoryName(game.category)}</p>
                  <div className="game-rating">
                    <span className="stars">{stars}</span>
                    <span>{game.rating}</span>
                  </div>
                  <div className="game-footer">
                    <span style={{color: 'var(--text-secondary)', fontSize: '0.9rem'}}>{game.players} oyuncu</span>
                    <button className="btn-play" onClick={() => openGameModal(game.id)} style={{background: `linear-gradient(135deg, ${game.color} 0%, ${game.color}dd 100%)`}}>
                      <i className="fas fa-play"></i> Oyna
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default FeaturedGames;
