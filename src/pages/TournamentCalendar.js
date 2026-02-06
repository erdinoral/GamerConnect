import React, { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import { Calendar, Clock, Trophy, Download, Radio } from 'lucide-react';
import '../styles/TournamentCalendar.css';

const tournaments = [
  {
    id: 1,
    name: 'VCT Masters Madrid',
    game: 'Valorant',
    type: 'Major',
    startDate: '2024-03-14',
    endDate: '2024-03-24',
    status: 'upcoming',
    teams: 16,
    prize: '$1,000,000'
  },
  {
    id: 2,
    name: 'IEM Katowice 2024',
    game: 'Counter-Strike 2',
    type: 'Major',
    startDate: '2024-02-01',
    endDate: '2024-02-11',
    status: 'live',
    teams: 24,
    prize: '$1,000,000'
  },
  {
    id: 3,
    name: 'Worlds 2024',
    game: 'League of Legends',
    type: 'World Championship',
    startDate: '2024-10-01',
    endDate: '2024-11-05',
    status: 'upcoming',
    teams: 24,
    prize: '$2,225,000'
  }
];

const patches = [
  {
    id: 1,
    game: 'Valorant',
    version: 'v8.01',
    releaseDate: '2024-02-15',
    status: 'upcoming'
  },
  {
    id: 2,
    game: 'Counter-Strike 2',
    version: 'v1.2.5',
    releaseDate: '2024-02-10',
    status: 'released'
  },
  {
    id: 3,
    game: 'League of Legends',
    version: 'Patch 14.3',
    releaseDate: '2024-02-07',
    status: 'released'
  }
];

function TournamentCalendar() {
  const [activeTab, setActiveTab] = useState('tournaments');
  const [timeRemaining, setTimeRemaining] = useState({});

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date();
      const times = {};
      
      tournaments.forEach(tournament => {
        if (tournament.status === 'upcoming') {
          const start = new Date(tournament.startDate);
          const diff = start - now;
          if (diff > 0) {
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            times[tournament.id] = { days, hours, minutes };
          }
        }
      });

      patches.forEach(patch => {
        if (patch.status === 'upcoming') {
          const release = new Date(patch.releaseDate);
          const diff = release - now;
          if (diff > 0) {
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            times[`patch-${patch.id}`] = { days, hours };
          }
        }
      });

      setTimeRemaining(times);
    };

    calculateTimeRemaining();
    const interval = setInterval(calculateTimeRemaining, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="tournament-calendar-page">
      <BackButton />
      <div className="container" style={{ paddingTop: '100px', paddingBottom: '40px' }}>
        <div className="calendar-header">
          <div>
            <h1 className="page-title text-neon-purple">
              <Calendar size={32} />
              Turnuva & Patch Takvimi
            </h1>
            <p className="page-subtitle">E-spor turnuvaları ve oyun güncellemeleri</p>
          </div>
        </div>

        <div className="tabs">
          <button
            onClick={() => setActiveTab('tournaments')}
            className={`tab ${activeTab === 'tournaments' ? 'active' : ''}`}
          >
            <Trophy size={18} />
            Turnuvalar
          </button>
          <button
            onClick={() => setActiveTab('patches')}
            className={`tab ${activeTab === 'patches' ? 'active' : ''}`}
          >
            <Download size={18} />
            Patch Notları
          </button>
        </div>

        {activeTab === 'tournaments' && (
          <div className="tournaments-list">
            {tournaments.map(tournament => (
              <div key={tournament.id} className="tournament-card glass">
                <div className="tournament-header">
                  <div>
                    <h3 className="tournament-name">{tournament.name}</h3>
                    <div className="tournament-meta">
                      <span className="tournament-game">{tournament.game}</span>
                      <span className="tournament-type">{tournament.type}</span>
                    </div>
                  </div>
                  {tournament.status === 'live' && (
                    <span className="live-badge">
                      <Radio size={14} />
                      CANLI
                    </span>
                  )}
                </div>
                
                <div className="tournament-info">
                  <div className="info-item">
                    <Calendar size={16} />
                    <span>{new Date(tournament.startDate).toLocaleDateString('tr-TR')} - {new Date(tournament.endDate).toLocaleDateString('tr-TR')}</span>
                  </div>
                  <div className="info-item">
                    <Trophy size={16} />
                    <span>{tournament.prize} Ödül Havuzu</span>
                  </div>
                  <div className="info-item">
                    <span>{tournament.teams} Takım</span>
                  </div>
                </div>

                {tournament.status === 'upcoming' && timeRemaining[tournament.id] && (
                  <div className="countdown">
                    <Clock size={16} />
                    <span>
                      {timeRemaining[tournament.id].days} gün, {timeRemaining[tournament.id].hours} saat, {timeRemaining[tournament.id].minutes} dakika
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {activeTab === 'patches' && (
          <div className="patches-list">
            {patches.map(patch => (
              <div key={patch.id} className="patch-card glass">
                <div className="patch-header">
                  <div>
                    <h3 className="patch-game">{patch.game}</h3>
                    <span className="patch-version">{patch.version}</span>
                  </div>
                  <span className={`patch-status ${patch.status}`}>
                    {patch.status === 'released' ? 'Yayınlandı' : 'Yakında'}
                  </span>
                </div>
                <div className="patch-date">
                  <Calendar size={16} />
                  <span>{new Date(patch.releaseDate).toLocaleDateString('tr-TR')}</span>
                </div>
                {patch.status === 'upcoming' && timeRemaining[`patch-${patch.id}`] && (
                  <div className="countdown">
                    <Clock size={16} />
                    <span>
                      {timeRemaining[`patch-${patch.id}`].days} gün, {timeRemaining[`patch-${patch.id}`].hours} saat kaldı
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default TournamentCalendar;
