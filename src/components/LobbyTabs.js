import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LobbyTabs({ requireLogin, navigate }) {
  const [activeTab, setActiveTab] = useState('duo');
  const [lobbies] = useState([
    {
      id: 1,
      game: 'Valorant',
      type: 'Duo',
      description: 'Diamond rank, takım oyunu odaklı oyuncu arıyorum. Ranked oynayacağız.',
      author: 'ProGamer123',
      rank: 'Diamond',
      createdAt: '2 saat önce',
      members: 1,
      maxMembers: 2
    },
    {
      id: 2,
      game: 'CS2',
      type: 'Squad',
      description: 'Competitive oyun için 3 oyuncu arıyorum. Minimum Gold Nova 1.',
      author: 'CSMaster',
      rank: 'Gold Nova',
      createdAt: '5 saat önce',
      members: 1,
      maxMembers: 4
    }
  ]);

  const [forumPosts] = useState([
    {
      id: 1,
      title: 'Bu build nasıl? (Valorant)',
      content: 'Jett için bu build iyi mi? Yorumlarınızı bekliyorum.',
      author: 'BuildMaster',
      votes: 15,
      comments: 8,
      category: 'build',
      createdAt: '3 saat önce'
    }
  ]);

  const joinLobby = (lobbyId) => {
    if (requireLogin(() => navigate(`/lobby/${lobbyId}`))) {
      // Navigation handled by requireLogin
    }
  };

  return (
    <>
      <div className="lobby-tabs">
        <button className={`lobby-tab ${activeTab === 'duo' ? 'active' : ''}`} onClick={() => setActiveTab('duo')}>
          Duo/Squad Ara
        </button>
        <button className={`lobby-tab ${activeTab === 'forum' ? 'active' : ''}`} onClick={() => setActiveTab('forum')}>
          Forum
        </button>
      </div>

      {activeTab === 'duo' && (
        <div className="tab-content active">
          <div className="section-header">
            <h2>Takım Arkadaşı İlanları</h2>
            <button className="btn-primary btn-post" onClick={() => requireLogin(() => alert('İlan oluşturma özelliği yakında eklenecek!'))}>
              <i className="fas fa-plus"></i> Yeni İlan
            </button>
          </div>
          <div className="lobby-list">
            {lobbies.map(lobby => (
              <div key={lobby.id} className="lobby-card">
                <div className="lobby-header">
                  <div className="lobby-game">
                    <h3>{lobby.game}</h3>
                    <span className="lobby-type">{lobby.type}</span>
                  </div>
                  <div className="lobby-rank">
                    <span className="rank-badge">{lobby.rank}</span>
                  </div>
                </div>
                <p className="lobby-description">{lobby.description}</p>
                <div className="lobby-footer">
                  <div className="lobby-meta">
                    <span><i className="fas fa-user"></i> {lobby.author}</span>
                    <span><i className="fas fa-clock"></i> {lobby.createdAt}</span>
                    <span><i className="fas fa-users"></i> {lobby.members}/{lobby.maxMembers}</span>
                  </div>
                  <button className="btn-join btn-primary" onClick={() => joinLobby(lobby.id)}>
                    <i className="fas fa-sign-in-alt"></i> Katıl
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'forum' && (
        <div className="tab-content active">
          <div className="section-header">
            <h2>Topluluk Soruları</h2>
            <button className="btn-primary btn-post" onClick={() => requireLogin(() => alert('Soru sorma özelliği yakında eklenecek!'))}>
              <i className="fas fa-plus"></i> Soru Sor
            </button>
          </div>
          <div className="forum-list">
            {forumPosts.map(post => (
              <div key={post.id} className="forum-post">
                <div className="post-votes">
                  <button className="vote-btn btn-vote" onClick={() => requireLogin(() => alert('Oy verildi!'))}>
                    <i className="fas fa-arrow-up"></i>
                  </button>
                  <span className="vote-count">{post.votes}</span>
                  <button className="vote-btn btn-vote" onClick={() => requireLogin(() => alert('Oy verildi!'))}>
                    <i className="fas fa-arrow-down"></i>
                  </button>
                </div>
                <div className="post-content">
                  <h3>{post.title}</h3>
                  <p>{post.content}</p>
                  <div className="post-meta">
                    <span><i className="fas fa-user"></i> {post.author}</span>
                    <span><i className="fas fa-clock"></i> {post.createdAt}</span>
                    <span><i className="fas fa-comments"></i> {post.comments} yorum</span>
                    <span className="post-category">{post.category}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default LobbyTabs;
