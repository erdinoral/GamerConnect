import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import { useAuth } from '../context/AuthContext';
import { MessageSquare, ArrowUp, ArrowDown, Plus, Filter, Search } from 'lucide-react';
import '../styles/Forum.css';

const forumCategories = [
  { id: 'all', name: 'Tümü', icon: '📋' },
  { id: 'build', name: 'Build & Rehber', icon: '⚙️' },
  { id: 'strategy', name: 'Strateji', icon: '🎯' },
  { id: 'question', name: 'Soru & Cevap', icon: '❓' },
  { id: 'discussion', name: 'Tartışma', icon: '💬' },
  { id: 'news', name: 'Haberler', icon: '📰' }
];

const mockForumPosts = [
  {
    id: 1,
    title: 'Valorant Jett Entry Taktikleri - Detaylı Rehber',
    content: 'Jett ile entry yaparken dikkat edilmesi gereken noktalar ve en etkili taktikler...',
    author: 'ProGamer123',
    category: 'build',
    votes: 45,
    comments: 12,
    createdAt: '2 saat önce',
    tags: ['Valorant', 'Jett', 'Entry']
  },
  {
    id: 2,
    title: 'CS2 Yeni Meta Analizi - AWP Kullanımı',
    content: 'Yeni güncellemelerle birlikte AWP kullanımında değişen meta ve stratejiler...',
    author: 'CS2Master',
    category: 'strategy',
    votes: 32,
    comments: 8,
    createdAt: '5 saat önce',
    tags: ['CS2', 'AWP', 'Meta']
  },
  {
    id: 3,
    title: 'Bu build nasıl? (LoL - Yasuo)',
    content: 'Yasuo için hazırladığım build, feedback almak istiyorum. Kritik şans ve hasar odaklı...',
    author: 'YasuoMain',
    category: 'question',
    votes: 18,
    comments: 25,
    createdAt: '1 gün önce',
    tags: ['LoL', 'Yasuo', 'Build']
  },
  {
    id: 4,
    title: 'E-spor Turnuvaları Hakkında Tartışma',
    content: 'Türkiye e-spor sahnesinde hangi takımlar öne çıkıyor? Sizce kimler şampiyon olur?',
    author: 'EsportsFan',
    category: 'discussion',
    votes: 67,
    comments: 34,
    createdAt: '2 gün önce',
    tags: ['E-spor', 'Turnuva']
  },
  {
    id: 5,
    title: 'Valorant Yeni Ajan: Yoru Rework Detayları',
    content: 'Yoru ajanında yapılan değişiklikler ve yeni yetenekler hakkında detaylı bilgi...',
    author: 'ValorantNews',
    category: 'news',
    votes: 89,
    comments: 41,
    createdAt: '3 gün önce',
    tags: ['Valorant', 'Yoru', 'Güncelleme']
  }
];

function Forum() {
  const { user, isLoggedIn } = useAuth();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    category: 'discussion',
    tags: ''
  });

  const filteredPosts = mockForumPosts.filter(post => {
    const matchesCategory = activeCategory === 'all' || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleVote = (postId, direction) => {
    if (!isLoggedIn) {
      alert('Oy vermek için lütfen giriş yapın.');
      return;
    }
    // Vote logic here
    console.log(`Voted ${direction} on post ${postId}`);
  };

  const handleCreatePost = (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      alert('Gönderi oluşturmak için lütfen giriş yapın.');
      return;
    }
    // Create post logic here
    alert('Gönderi oluşturuldu!');
    setShowCreateModal(false);
    setNewPost({ title: '', content: '', category: 'discussion', tags: '' });
  };

  return (
    <div className="forum-page">
      <BackButton />
      <div className="container" style={{ paddingTop: '100px', paddingBottom: '40px' }}>
        <div className="forum-header">
          <div>
            <h1 className="page-title text-neon-purple">
              <MessageSquare size={32} />
              Forum
            </h1>
            <p className="page-subtitle">Topluluk soruları, rehberler ve tartışmalar</p>
          </div>
          <button
            onClick={() => isLoggedIn ? setShowCreateModal(true) : alert('Gönderi oluşturmak için lütfen giriş yapın.')}
            className="btn-create-post neon-glow-purple"
          >
            <Plus size={18} />
            Yeni Gönderi
          </button>
        </div>

        <div className="forum-filters">
          <div className="search-box glass">
            <Search size={18} />
            <input
              type="text"
              placeholder="Forum'da ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="category-tabs">
            {forumCategories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`category-tab ${activeCategory === category.id ? 'active' : ''}`}
              >
                <span>{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
        </div>

        <div className="forum-posts">
          {filteredPosts.map(post => (
            <div key={post.id} className="forum-post-card glass">
              <div className="post-votes">
                <button
                  onClick={() => handleVote(post.id, 'up')}
                  className="vote-btn up"
                >
                  <ArrowUp size={20} />
                </button>
                <span className="vote-count">{post.votes}</span>
                <button
                  onClick={() => handleVote(post.id, 'down')}
                  className="vote-btn down"
                >
                  <ArrowDown size={20} />
                </button>
              </div>
              <div className="post-content">
                <div className="post-header">
                  <h3 className="post-title">{post.title}</h3>
                  <span className={`post-category category-${post.category}`}>
                    {forumCategories.find(c => c.id === post.category)?.icon}
                    {forumCategories.find(c => c.id === post.category)?.name}
                  </span>
                </div>
                <p className="post-excerpt">{post.content}</p>
                <div className="post-tags">
                  {post.tags.map((tag, index) => (
                    <span key={index} className="post-tag">{tag}</span>
                  ))}
                </div>
                <div className="post-meta">
                  <span className="post-author">
                    <span className="author-avatar">{post.author[0]}</span>
                    {post.author}
                  </span>
                  <span className="post-time">{post.createdAt}</span>
                  <span className="post-comments">
                    <MessageSquare size={16} />
                    {post.comments} yorum
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Create Post Modal */}
      {showCreateModal && (
        <div className="modal" onClick={() => setShowCreateModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Yeni Gönderi Oluştur</h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-white/60 hover:text-white"
              >
                ×
              </button>
            </div>
            <form onSubmit={handleCreatePost} className="space-y-4">
              <div>
                <label className="block text-white/80 mb-2">Başlık</label>
                <input
                  type="text"
                  value={newPost.title}
                  onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                  placeholder="Gönderi başlığı..."
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-neon-purple"
                  required
                />
              </div>
              <div>
                <label className="block text-white/80 mb-2">Kategori</label>
                <select
                  value={newPost.category}
                  onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-purple"
                >
                  {forumCategories.filter(c => c.id !== 'all').map(category => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-white/80 mb-2">İçerik</label>
                <textarea
                  value={newPost.content}
                  onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                  placeholder="Gönderi içeriği..."
                  rows="6"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-neon-purple resize-none"
                  required
                />
              </div>
              <div>
                <label className="block text-white/80 mb-2">Etiketler (virgülle ayırın)</label>
                <input
                  type="text"
                  value={newPost.tags}
                  onChange={(e) => setNewPost({ ...newPost, tags: e.target.value })}
                  placeholder="Valorant, Jett, Entry"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-neon-purple"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-gradient-neon-purple rounded-lg text-white font-semibold hover:shadow-neon-purple transition-all"
              >
                Gönderi Oluştur
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Forum;
