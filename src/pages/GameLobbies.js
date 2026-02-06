import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';
import { useAuth } from '../context/AuthContext';
import { popularLobbies } from '../data/homeData';
import { Plus, Users, Mic, Star, ArrowRight, X } from 'lucide-react';
import '../styles/GameLobbies.css';

const gameIcons = {
  valorant: { icon: '🎯', name: 'Valorant', color: 'neon-red' },
  cs2: { icon: '🔫', name: 'Counter-Strike 2', color: 'neon-blue' },
  lol: { icon: '⚔️', name: 'League of Legends', color: 'neon-gold' },
  eafc: { icon: '⚽', name: 'EA Sports FC', color: 'neon-cyan' },
  apex: { icon: '🎮', name: 'Apex Legends', color: 'neon-purple' },
  fortnite: { icon: '🏗️', name: 'Fortnite', color: 'neon-cyan' }
};

function GameLobbies() {
  const { game } = useParams();
  const navigate = useNavigate();
  const { user, isLoggedIn } = useAuth();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newLobby, setNewLobby] = useState({
    type: 'duo',
    description: '',
    rank: ''
  });

  const gameInfo = gameIcons[game] || gameIcons.valorant;
  const gameLobbies = popularLobbies.filter(lobby => 
    lobby.game.toLowerCase().includes(gameInfo.name.toLowerCase()) ||
    (game === 'cs2' && lobby.game.toLowerCase().includes('counter-strike'))
  );
  const activeLobbies = gameLobbies.filter(l => l.members < l.maxMembers);

  // Check if user is verified
  const isVerified = user?.email === 'erdinoral31@gmail.com' || user?.isVerified === true;

  const handleCreateLobby = () => {
    if (!isLoggedIn) {
      alert('Lobi oluşturmak için lütfen giriş yapın.');
      return;
    }
    if (!isVerified) {
      alert('Sadece onaylı kullanıcılar lobi kurabilir. Lütfen hesabınızı doğrulatın.');
      return;
    }
    setShowCreateModal(true);
  };

  const handleSubmitLobby = (e) => {
    e.preventDefault();
    // Create lobby logic here
    alert('Lobi oluşturuldu!');
    setShowCreateModal(false);
    setNewLobby({ type: 'duo', description: '', rank: '' });
  };

  const handleJoinLobby = (lobbyId) => {
    navigate(`/lobby/${lobbyId}`);
  };

  return (
    <div className="game-lobbies-page">
      <BackButton />
      <div className="container" style={{ paddingTop: '100px', paddingBottom: '40px' }}>
        {/* Page Header */}
        <div className="game-header">
          <div className="game-icon-large">
            <span className="icon-emoji">{gameInfo.icon}</span>
          </div>
          <div className="game-info">
            <h1 className="page-title" style={{ color: `var(--neon-${gameInfo.color.split('-')[1]})` }}>
              {gameInfo.name} Lobileri
            </h1>
            <p className="page-subtitle">
              <span className="active-count">{activeLobbies.length}</span> Aktif Lobi
            </p>
          </div>
          {isVerified && (
            <button
              onClick={handleCreateLobby}
              className="btn-create-lobby"
              style={{
                background: `linear-gradient(135deg, var(--neon-${gameInfo.color.split('-')[1]}), var(--neon-purple))`,
                borderColor: `var(--neon-${gameInfo.color.split('-')[1]})`
              }}
            >
              <Plus size={18} />
              Lobi Oluştur
            </button>
          )}
        </div>

        {/* Lobbies List */}
        <div className="lobbies-grid">
          {gameLobbies.length > 0 ? (
            gameLobbies.map((lobby) => (
              <div
                key={lobby.id}
                onClick={() => handleJoinLobby(lobby.id)}
                className="lobby-card glass"
              >
                <div className="lobby-tags">
                  {lobby.sponsored && (
                    <span className="tag sponsored">
                      <Star size={14} />
                      Sponsorlu
                    </span>
                  )}
                  {lobby.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className={`tag ${
                        tag === 'Mic' ? 'mic' :
                        tag === 'Squad' || tag === 'Duo' ? 'squad' :
                        'default'
                      }`}
                    >
                      {(tag === 'Mic' && <Mic size={14} />) ||
                       ((tag === 'Squad' || tag === 'Duo') && <Users size={14} />)}
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="lobby-title">{lobby.title}</h3>
                <p className="lobby-description">{lobby.description}</p>
                <div className="lobby-footer">
                  <div className="lobby-meta">
                    <span className="members">
                      <Users size={16} />
                      {lobby.members}/{lobby.maxMembers}
                    </span>
                    <span className="time">{lobby.timeAgo}</span>
                  </div>
                  <button className="btn-join">
                    Katıl <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-state">
              <p>Bu oyun için henüz lobi bulunmuyor.</p>
              {isVerified && (
                <button onClick={handleCreateLobby} className="btn-create-first">
                  İlk Lobiyi Oluştur
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Create Lobby Modal */}
      {showCreateModal && (
        <div className="modal" onClick={() => setShowCreateModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Yeni Lobi Oluştur</h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-white/60 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmitLobby} className="space-y-4">
              <div>
                <label className="block text-white/80 mb-2">Oyun</label>
                <input
                  type="text"
                  value={gameInfo.name}
                  disabled
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white/60"
                />
              </div>
              <div>
                <label className="block text-white/80 mb-2">Takım Boyutu</label>
                <select
                  value={newLobby.type}
                  onChange={(e) => setNewLobby({ ...newLobby, type: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-purple"
                >
                  <option value="duo">Duo (2 kişi)</option>
                  <option value="squad">Squad (4 kişi)</option>
                  <option value="team">Takım (5+ kişi)</option>
                </select>
              </div>
              <div>
                <label className="block text-white/80 mb-2">Rank</label>
                <input
                  type="text"
                  value={newLobby.rank}
                  onChange={(e) => setNewLobby({ ...newLobby, rank: e.target.value })}
                  placeholder="Örn: Gold, Diamond, Global Elite..."
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-neon-purple"
                />
              </div>
              <div>
                <label className="block text-white/80 mb-2">Açıklama</label>
                <textarea
                  value={newLobby.description}
                  onChange={(e) => setNewLobby({ ...newLobby, description: e.target.value })}
                  placeholder="Rank, deneyim, oyun tarzı vb..."
                  rows="4"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-neon-purple resize-none"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-gradient-neon-purple rounded-lg text-white font-semibold hover:shadow-neon-purple transition-all"
              >
                Lobi Oluştur
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default GameLobbies;
