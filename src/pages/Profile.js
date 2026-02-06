import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';
import { userProfile } from '../data/data';
import { useAuth } from '../context/AuthContext';
import { Edit, Coins, Save, X, Trophy, ShoppingBag, Sparkles, Frame, Star } from 'lucide-react';
import '../styles/Profile.css';

const rankOptions = {
  valorant: ['Iron', 'Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Ascendant', 'Immortal', 'Radiant'],
  cs2: ['Silver I', 'Silver II', 'Silver Elite', 'Gold Nova I', 'Gold Nova Master', 'Master Guardian I', 'Master Guardian Elite', 'Distinguished Master Guardian', 'Legendary Eagle', 'Legendary Eagle Master', 'Supreme Master First Class', 'Global Elite'],
  lol: ['Iron', 'Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Master', 'Grandmaster', 'Challenger'],
  apex: ['Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Master', 'Predator'],
  fortnite: ['Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Elite', 'Champion', 'Unreal']
};

function Profile() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    ranks: { ...userProfile.ranks },
    gameStyle: [...userProfile.gameStyle],
    bio: userProfile.bio
  });

  const userGP = user?.gp || 0;
  const purchasedItems = user?.purchasedItems || [];
  const achievements = [
    { id: 'first-win', name: 'İlk Zafer', unlocked: true },
    { id: 'ten-wins', name: 'Onlarca Zafer', unlocked: false }
  ];

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    // Save to database here
    setIsEditing(false);
    alert('Profil güncellendi!');
  };

  const handleCancel = () => {
    setProfileData({
      ranks: { ...userProfile.ranks },
      gameStyle: [...userProfile.gameStyle],
      bio: userProfile.bio
    });
    setIsEditing(false);
  };

  const handleRankChange = (game, value) => {
    setProfileData({
      ...profileData,
      ranks: {
        ...profileData.ranks,
        [game]: value
      }
    });
  };

  const handleBioChange = (value) => {
    setProfileData({
      ...profileData,
      bio: value
    });
  };

  return (
    <div className="profile-page">
      <BackButton />
      <div className="container" style={{paddingTop: '100px', paddingBottom: '40px'}}>
        <div className="profile-header">
          <div className="header-left">
            <h1 className="page-title">
              <span>Profil</span>
            </h1>
          </div>
          {!isEditing ? (
            <button onClick={handleEdit} className="btn-edit neon-glow-blue">
              <Edit size={18} />
              Düzenle
            </button>
          ) : (
            <div className="flex gap-2">
              <button onClick={handleSave} className="btn-edit bg-green-500/20 border-green-500 text-green-400">
                <Save size={18} />
                Kaydet
              </button>
              <button onClick={handleCancel} className="btn-edit bg-red-500/20 border-red-500 text-red-400">
                <X size={18} />
                İptal
              </button>
            </div>
          )}
        </div>

        <div className="profile-layout">
          <div className="profile-main glass">
            <div className="profile-avatar">
              <div className="avatar-circle">
                {userProfile.avatar}
              </div>
            </div>
            <h2 className="profile-name">{userProfile.name}</h2>
            <p className="profile-email">{userProfile.email}</p>
            <div className="profile-points">
              <Coins size={20} />
              <span>{userProfile.points.toLocaleString()} Puan</span>
            </div>
            <div className="profile-gp">
              <Coins size={20} className="text-neon-gold" />
              <span className="gp-text">{userGP.toLocaleString()} GP</span>
            </div>
            {purchasedItems.length > 0 && (
              <div className="profile-items">
                <h4 className="items-title">Aktif Ürünler</h4>
                <div className="items-list">
                  {purchasedItems.map(itemId => {
                    const itemIcons = {
                      'neon-name-cyan': { icon: Sparkles, color: 'neon-cyan', name: 'Cyan İsim' },
                      'neon-name-purple': { icon: Sparkles, color: 'neon-purple', name: 'Purple İsim' },
                      'neon-name-gold': { icon: Sparkles, color: 'neon-gold', name: 'Gold İsim' },
                      'frame-basic': { icon: Frame, color: 'neon-blue', name: 'Temel Çerçeve' },
                      'frame-premium': { icon: Frame, color: 'neon-gold', name: 'Premium Çerçeve' },
                      'sponsored-lobby': { icon: Star, color: 'neon-purple', name: 'Sponsorlu Lobi' }
                    };
                    const item = itemIcons[itemId];
                    if (!item) return null;
                    const Icon = item.icon;
                    return (
                      <div key={itemId} className="item-badge" style={{ color: `var(--neon-${item.color.split('-')[1]})` }}>
                        <Icon size={16} />
                        {item.name}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <div className="profile-sidebar">
            <div className="ranks-card glass">
              <h3 className="card-title">Oyun Rankları</h3>
              <div className="ranks-list">
                {Object.entries(profileData.ranks).map(([game, rank]) => (
                  <div key={game} className="rank-item">
                    <span className="game-name">{game.toUpperCase()}</span>
                    {isEditing ? (
                      <select
                        value={rank}
                        onChange={(e) => handleRankChange(game, e.target.value)}
                        className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-neon-cyan"
                      >
                        <option value="Belirtilmemiş">Belirtilmemiş</option>
                        {rankOptions[game]?.map(option => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    ) : (
                      <span className="rank-value">{rank}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="bio-card glass">
              <h3 className="card-title">Oyun Tarzı & Bio</h3>
              <div className="bio-section">
                <h4>Oyun Tarzı Etiketleri</h4>
                {isEditing ? (
                  <div className="space-y-2">
                    <input
                      type="text"
                      placeholder="Etiket ekle (örn: Aggressive, Support, IGL)"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:border-neon-cyan"
                    />
                    <p className="text-xs text-white/60">Virgülle ayırarak birden fazla etiket ekleyebilirsiniz</p>
                  </div>
                ) : (
                  <p className="empty-state">
                    {profileData.gameStyle.length > 0 
                      ? profileData.gameStyle.join(', ') 
                      : 'Henüz etiket eklenmemiş'}
                  </p>
                )}
              </div>
              <div className="bio-section">
                <h4>Hakkımda</h4>
                {isEditing ? (
                  <textarea
                    value={profileData.bio}
                    onChange={(e) => handleBioChange(e.target.value)}
                    placeholder="Kendiniz hakkında bir şeyler yazın..."
                    rows="4"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:border-neon-cyan resize-none"
                  />
                ) : (
                  <p className="empty-state">
                    {profileData.bio || 'Henüz bio eklenmemiş'}
                  </p>
                )}
              </div>
            </div>

            <div className="career-card glass">
              <h3 className="card-title">Kariyer Kartı</h3>
              <div className="career-stats">
                <div className="stat-box">
                  <Trophy size={24} className="text-neon-gold" />
                  <div>
                    <span className="stat-value">{achievements.filter(a => a.unlocked).length}</span>
                    <span className="stat-label">Başarım</span>
                  </div>
                </div>
                <div className="stat-box">
                  <Coins size={24} className="text-neon-gold" />
                  <div>
                    <span className="stat-value">{userProfile.points.toLocaleString()}</span>
                    <span className="stat-label">Toplam Puan</span>
                  </div>
                </div>
              </div>
              <div className="achievements-preview">
                <h4>Rozetler</h4>
                <div className="badges-list">
                  {achievements.filter(a => a.unlocked).map(ach => (
                    <div key={ach.id} className="badge-item">
                      <Trophy size={20} className="text-neon-gold" />
                      <span>{ach.name}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="career-actions">
                <button onClick={() => navigate('/achievements')} className="btn-view-achievements">
                  <Trophy size={16} />
                  Tüm Başarımları Gör
                </button>
                <button onClick={() => navigate('/market')} className="btn-view-market">
                  <ShoppingBag size={16} />
                  Market
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
