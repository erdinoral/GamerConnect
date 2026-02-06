import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import { useAuth } from '../context/AuthContext';
import { Trophy, Award, Medal, Star, Target, Users, BookOpen, Zap } from 'lucide-react';
import '../styles/Achievements.css';

const achievements = [
  {
    id: 'first-win',
    name: 'İlk Zafer',
    description: 'İlk maçınızı kazanın',
    icon: Trophy,
    color: 'neon-gold',
    rarity: 'common',
    progress: 1,
    maxProgress: 1,
    unlocked: true
  },
  {
    id: 'ten-wins',
    name: 'Onlarca Zafer',
    description: '10 maç kazanın',
    icon: Trophy,
    color: 'neon-gold',
    rarity: 'rare',
    progress: 7,
    maxProgress: 10,
    unlocked: false
  },
  {
    id: 'guide-writer',
    name: 'Topluluk Rehberi Yazarı',
    description: 'Bir rehber yazın',
    icon: BookOpen,
    color: 'neon-purple',
    rarity: 'epic',
    progress: 0,
    maxProgress: 1,
    unlocked: false
  },
  {
    id: 'squad-master',
    name: 'Squad Ustası',
    description: '10 farklı squad\'a katılın',
    icon: Users,
    color: 'neon-cyan',
    rarity: 'rare',
    progress: 3,
    maxProgress: 10,
    unlocked: false
  },
  {
    id: 'market-spender',
    name: 'Koleksiyoncu',
    description: 'Market\'ten 5 ürün satın alın',
    icon: Star,
    color: 'neon-gold',
    rarity: 'epic',
    progress: 2,
    maxProgress: 5,
    unlocked: false
  }
];

const rarityColors = {
  common: { bg: 'rgba(255, 255, 255, 0.1)', border: 'rgba(255, 255, 255, 0.3)' },
  rare: { bg: 'rgba(0, 212, 255, 0.1)', border: 'rgba(0, 212, 255, 0.3)' },
  epic: { bg: 'rgba(176, 38, 255, 0.1)', border: 'rgba(176, 38, 255, 0.3)' },
  legendary: { bg: 'rgba(255, 215, 0, 0.1)', border: 'rgba(255, 215, 0, 0.3)' }
};

function Achievements() {
  const { user } = useAuth();
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filteredAchievements = selectedFilter === 'all'
    ? achievements
    : achievements.filter(ach => 
        selectedFilter === 'unlocked' ? ach.unlocked : !ach.unlocked
      );

  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const totalCount = achievements.length;

  return (
    <div className="achievements-page">
      <BackButton />
      <div className="container" style={{ paddingTop: '100px', paddingBottom: '40px' }}>
        <div className="achievements-header">
          <div>
            <h1 className="page-title text-neon-gold">
              <Trophy size={32} />
              Başarımlar & Rozetler
            </h1>
            <p className="page-subtitle">Kazandığınız başarımları görüntüleyin</p>
          </div>
          <div className="stats-card glass">
            <div className="stat-item">
              <span className="stat-value">{unlockedCount}</span>
              <span className="stat-label">Açıldı</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-value">{totalCount}</span>
              <span className="stat-label">Toplam</span>
            </div>
          </div>
        </div>

        <div className="filters">
          <button
            onClick={() => setSelectedFilter('all')}
            className={`filter-btn ${selectedFilter === 'all' ? 'active' : ''}`}
          >
            Tümü
          </button>
          <button
            onClick={() => setSelectedFilter('unlocked')}
            className={`filter-btn ${selectedFilter === 'unlocked' ? 'active' : ''}`}
          >
            Açılanlar
          </button>
          <button
            onClick={() => setSelectedFilter('locked')}
            className={`filter-btn ${selectedFilter === 'locked' ? 'active' : ''}`}
          >
            Kilitli
          </button>
        </div>

        <div className="achievements-grid">
          {filteredAchievements.map(achievement => {
            const Icon = achievement.icon;
            const rarity = rarityColors[achievement.rarity];
            const progressPercent = (achievement.progress / achievement.maxProgress) * 100;

            return (
              <div
                key={achievement.id}
                className={`achievement-card glass ${achievement.unlocked ? 'unlocked' : 'locked'}`}
                style={{
                  background: achievement.unlocked ? rarity.bg : 'rgba(255, 255, 255, 0.05)',
                  borderColor: achievement.unlocked ? rarity.border : 'rgba(255, 255, 255, 0.1)'
                }}
              >
                {achievement.unlocked && (
                  <div className="unlocked-badge">
                    <Zap size={14} />
                    Açıldı
                  </div>
                )}
                <div className="achievement-icon" style={{ color: `var(--neon-${achievement.color.split('-')[1]})` }}>
                  <Icon size={48} />
                </div>
                <h3 className="achievement-name">{achievement.name}</h3>
                <p className="achievement-description">{achievement.description}</p>
                <div className="achievement-progress">
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{
                        width: `${progressPercent}%`,
                        background: achievement.unlocked
                          ? `linear-gradient(90deg, var(--neon-${achievement.color.split('-')[1]}), var(--neon-purple))`
                          : 'rgba(255, 255, 255, 0.2)'
                      }}
                    ></div>
                  </div>
                  <span className="progress-text">
                    {achievement.progress} / {achievement.maxProgress}
                  </span>
                </div>
                <div className="rarity-badge" data-rarity={achievement.rarity}>
                  {achievement.rarity.toUpperCase()}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Achievements;
