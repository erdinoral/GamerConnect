import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import { useAuth } from '../context/AuthContext';
import { Video, Plus, ThumbsUp, Eye, Share2 } from 'lucide-react';
import '../styles/Highlights.css';

const mockHighlights = [
  {
    id: 1,
    title: '1v5 Clutch - Mirage',
    author: 'ProGamer123',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    type: 'youtube',
    votes: 45,
    views: 1250,
    thumbnail: null
  },
  {
    id: 2,
    title: 'Ace Round - Valorant',
    author: 'ValorantMaster',
    url: 'https://www.twitch.tv/videos/1234567890',
    type: 'twitch',
    votes: 32,
    views: 890,
    thumbnail: null
  }
];

function Highlights() {
  const { isLoggedIn } = useAuth();
  const [highlights, setHighlights] = useState(mockHighlights);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newHighlight, setNewHighlight] = useState({ url: '', title: '' });

  const getEmbedUrl = (url, type) => {
    if (type === 'youtube') {
      const videoId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)?.[1];
      return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
    } else if (type === 'twitch') {
      const videoId = url.match(/videos\/(\d+)/)?.[1];
      return videoId ? `https://player.twitch.tv/?video=${videoId}&parent=${window.location.hostname}` : null;
    }
    return null;
  };

  const detectType = (url) => {
    if (url.includes('youtube.com') || url.includes('youtu.be')) return 'youtube';
    if (url.includes('twitch.tv')) return 'twitch';
    return null;
  };

  const handleAddHighlight = (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      alert('Highlight eklemek için lütfen giriş yapın.');
      return;
    }

    const type = detectType(newHighlight.url);
    if (!type) {
      alert('Geçerli bir YouTube veya Twitch linki girin.');
      return;
    }

    const highlight = {
      id: highlights.length + 1,
      title: newHighlight.title || 'Yeni Highlight',
      author: 'Kullanıcı',
      url: newHighlight.url,
      type,
      votes: 0,
      views: 0
    };

    setHighlights([highlight, ...highlights]);
    setNewHighlight({ url: '', title: '' });
    setShowAddModal(false);
    alert('Highlight eklendi!');
  };

  const handleVote = (id) => {
    if (!isLoggedIn) {
      alert('Oy vermek için lütfen giriş yapın.');
      return;
    }
    setHighlights(highlights.map(h => 
      h.id === id ? { ...h, votes: h.votes + 1 } : h
    ));
  };

  const sortedHighlights = [...highlights].sort((a, b) => b.votes - a.votes);

  return (
    <div className="highlights-page">
      <BackButton />
      <div className="container" style={{ paddingTop: '100px', paddingBottom: '40px' }}>
        <div className="highlights-header">
          <div>
            <h1 className="page-title text-neon-cyan">
              <Video size={32} />
              Highlight Galerisi
            </h1>
            <p className="page-subtitle">En iyi oyun anlarını izleyin ve paylaşın</p>
          </div>
          {isLoggedIn && (
            <button
              onClick={() => setShowAddModal(true)}
              className="btn-add-highlight"
            >
              <Plus size={18} />
              Highlight Ekle
            </button>
          )}
        </div>

        <div className="highlights-grid">
          {sortedHighlights.map(highlight => {
            const embedUrl = getEmbedUrl(highlight.url, highlight.type);

            return (
              <div key={highlight.id} className="highlight-card glass">
                <div className="highlight-player">
                  {embedUrl ? (
                    highlight.type === 'youtube' ? (
                      <iframe
                        src={embedUrl}
                        title={highlight.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="embed-video"
                      ></iframe>
                    ) : (
                      <iframe
                        src={embedUrl}
                        title={highlight.title}
                        frameBorder="0"
                        allowFullScreen
                        className="embed-video"
                      ></iframe>
                    )
                  ) : (
                    <div className="video-placeholder">
                      <Video size={48} />
                      <p>Video yükleniyor...</p>
                    </div>
                  )}
                </div>
                <div className="highlight-content">
                  <h3 className="highlight-title">{highlight.title}</h3>
                  <div className="highlight-meta">
                    <span className="highlight-author">@{highlight.author}</span>
                    <div className="highlight-stats">
                      <span className="stat-item">
                        <ThumbsUp size={16} />
                        {highlight.votes}
                      </span>
                      <span className="stat-item">
                        <Eye size={16} />
                        {highlight.views}
                      </span>
                    </div>
                  </div>
                  <div className="highlight-actions">
                    <button
                      onClick={() => handleVote(highlight.id)}
                      className="btn-vote"
                    >
                      <ThumbsUp size={16} />
                      Beğen
                    </button>
                    <button className="btn-share">
                      <Share2 size={16} />
                      Paylaş
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {showAddModal && (
        <div className="modal" onClick={() => setShowAddModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Yeni Highlight Ekle</h2>
            <form onSubmit={handleAddHighlight}>
              <div className="form-group">
                <label>Video Linki (YouTube veya Twitch)</label>
                <input
                  type="url"
                  value={newHighlight.url}
                  onChange={(e) => setNewHighlight({ ...newHighlight, url: e.target.value })}
                  placeholder="https://www.youtube.com/watch?v=..."
                  required
                />
              </div>
              <div className="form-group">
                <label>Başlık (Opsiyonel)</label>
                <input
                  type="text"
                  value={newHighlight.title}
                  onChange={(e) => setNewHighlight({ ...newHighlight, title: e.target.value })}
                  placeholder="Highlight başlığı..."
                />
              </div>
              <div className="form-actions">
                <button type="submit" className="btn-submit">Ekle</button>
                <button type="button" onClick={() => setShowAddModal(false)} className="btn-cancel">İptal</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Highlights;
