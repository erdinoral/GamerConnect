import React, { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import { liveStreams, tournamentBrackets } from '../data/data';
import { ExternalLink, Radio } from 'lucide-react';
import '../styles/LiveArena.css';

const twitchChannels = {
  'cs2': { channel: 'eslcs', name: 'ESL CS', game: 'Counter-Strike 2' },
  'valorant': { channel: 'valorant_emea', name: 'Valorant EMEA', game: 'Valorant' },
  'lol': { channel: 'leagueoflegends', name: 'LoL Esports', game: 'League of Legends' },
  'eafc': { channel: 'easportsfc', name: 'EA Sports FC', game: 'EA Sports FC' }
};

const matchStatsData = {
  'cs2': {
    team1: { name: 'FNC', score: 12 },
    team2: { name: 'VIT', score: 10 },
    map: 'Mirage',
    round: 23,
    tWins: { team1: 7, team2: 5 },
    ctWins: { team1: 5, team2: 5 },
    avgDamage: { team1: 432, team2: 398 },
    clutches: { team1: 3, team2: 1 }
  },
  'valorant': {
    team1: { name: 'SEN', score: 8 },
    team2: { name: '100T', score: 6 },
    map: 'Bind',
    round: 14,
    tWins: { team1: 4, team2: 3 },
    ctWins: { team1: 4, team2: 3 },
    avgDamage: { team1: 145, team2: 132 },
    clutches: { team1: 2, team2: 1 }
  },
  'lol': {
    team1: { name: 'T1', score: 2 },
    team2: { name: 'Gen.G', score: 1 },
    map: 'Summoner\'s Rift',
    round: 'Game 3',
    tWins: { team1: 1, team2: 0 },
    ctWins: { team1: 1, team2: 1 },
    avgDamage: { team1: 58.2, team2: 52.4 },
    clutches: { team1: 0, team2: 0 }
  },
  'eafc': {
    team1: { name: 'PSG', score: 2 },
    team2: { name: 'MCI', score: 1 },
    map: 'Stadium',
    round: '90\'',
    tWins: { team1: 1, team2: 0 },
    ctWins: { team1: 1, team2: 1 },
    avgDamage: { team1: 65, team2: 58 },
    clutches: { team1: 0, team2: 0 }
  }
};

function LiveArena() {
  const [activeGame, setActiveGame] = useState('cs2');
  const [currentChannel, setCurrentChannel] = useState(twitchChannels.cs2);
  const [currentMatchStats, setCurrentMatchStats] = useState(matchStatsData.cs2);

  const stats = [
    { label: 'Canlı Yayın', value: '4', color: 'red', icon: Radio },
    { label: 'Aktif Turnuva', value: '1', color: 'teal', icon: Radio },
    { label: 'Canlı Maç', value: '1', color: 'purple', icon: Radio },
    { label: 'Yaklaşan Maç', value: '4', color: 'light-purple', icon: Radio }
  ];

  useEffect(() => {
    setCurrentChannel(twitchChannels[activeGame]);
    setCurrentMatchStats(matchStatsData[activeGame] || matchStatsData.cs2);
  }, [activeGame]);

  const handleGameTabClick = (game) => {
    setActiveGame(game);
  };

  const handleTwitchOpen = () => {
    window.open(`https://www.twitch.tv/${currentChannel.channel}`, '_blank');
  };

  const stream = liveStreams[0];

  return (
    <div className="live-arena-page">
      <BackButton />
      <div className="container" style={{paddingTop: '100px', paddingBottom: '40px'}}>
        <div className="arena-header">
          <div>
            <h1 className="page-title text-neon-blue">((o)) Live Arena</h1>
            <p className="page-subtitle">E-spor turnuvalarını canlı izle, skorları takip et ve yaklaşan maçları kaçırma!</p>
          </div>
        </div>

        <div className="stats-panel">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className={`stat-card glass stat-${stat.color}`}>
                <Icon size={24} />
                <div>
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="game-tabs">
          <button 
            className={`tab ${activeGame === 'cs2' ? 'active' : ''}`}
            onClick={() => handleGameTabClick('cs2')}
          >
            Counter-Strike 2
          </button>
          <button 
            className={`tab ${activeGame === 'valorant' ? 'active' : ''}`}
            onClick={() => handleGameTabClick('valorant')}
          >
            Valorant
          </button>
          <button 
            className={`tab ${activeGame === 'lol' ? 'active' : ''}`}
            onClick={() => handleGameTabClick('lol')}
          >
            League of Legends
          </button>
          <button 
            className={`tab ${activeGame === 'eafc' ? 'active' : ''}`}
            onClick={() => handleGameTabClick('eafc')}
          >
            EA Sports FC
          </button>
        </div>

        <div className="arena-layout">
          <div className="stream-section">
            <div className="stream-header">
              <div>
                <h3>{currentChannel.name}</h3>
                <span className="live-badge">CANLI</span>
              </div>
              <button 
                onClick={handleTwitchOpen}
                className="btn-twitch neon-glow-blue"
              >
                <ExternalLink size={16} />
                Twitch'te Aç
              </button>
            </div>
            <div className="stream-player glass" style={{ minHeight: '500px', position: 'relative' }}>
              <iframe
                src={`https://player.twitch.tv/?channel=${currentChannel.channel}&parent=${window.location.hostname || 'localhost'}&muted=false`}
                height="100%"
                width="100%"
                allowFullScreen
                style={{ border: 'none', borderRadius: '16px', minHeight: '500px' }}
                title={currentChannel.name}
              ></iframe>
            </div>
          </div>

          <div className="sidebar-section">
            <div className="match-stats glass">
              <div className="stats-header">
                <h4>Match Stats</h4>
                <span className="live-badge">CANLI</span>
              </div>
              <div className="stats-content">
                <div className="score-display">
                  <span className="team-score">{currentMatchStats.team1.name}</span>
                  <span className="score">{currentMatchStats.team1.score}</span>
                  <span className="divider">-</span>
                  <span className="score">{currentMatchStats.team2.score}</span>
                  <span className="team-score">{currentMatchStats.team2.name}</span>
                </div>
                <div className="match-info">{currentMatchStats.map} • {currentMatchStats.round}</div>
                <div className="stats-details">
                  <div className="stat-row">
                    <span>T/CT Kazanımları</span>
                    <span>{currentMatchStats.team1.name} {currentMatchStats.tWins.team1}/{currentMatchStats.ctWins.team1} | {currentMatchStats.team2.name} {currentMatchStats.tWins.team2}/{currentMatchStats.ctWins.team2}</span>
                  </div>
                  <div className="stat-row">
                    <span>Ortalama Damage</span>
                    <span>{currentMatchStats.team1.name} {currentMatchStats.avgDamage.team1} | {currentMatchStats.team2.name} {currentMatchStats.avgDamage.team2}</span>
                  </div>
                  <div className="stat-row">
                    <span>1vX Kazanımları</span>
                    <span>{currentMatchStats.team1.name} {currentMatchStats.clutches.team1} | {currentMatchStats.team2.name} {currentMatchStats.clutches.team2}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="tournament-bracket glass">
              <h4>Turnuva Bracket</h4>
              <div className="bracket-list">
                {tournamentBrackets.map(bracket => (
                  <div key={bracket.id} className="bracket-item">
                    <div className="bracket-header">
                      <span className="bracket-round">{bracket.round}</span>
                      {bracket.status === 'CANLI' && <span className="live-badge">{bracket.status}</span>}
                    </div>
                    <div className="bracket-teams">
                      <div className="bracket-team">
                        <span>{bracket.team1.name}</span>
                        <span className="bracket-score">{bracket.team1.score}</span>
                      </div>
                      <div className="bracket-divider">-</div>
                      <div className="bracket-team">
                        <span className="bracket-score">{bracket.team2.score}</span>
                        <span>{bracket.team2.name}</span>
                      </div>
                    </div>
                    {bracket.time && <div className="bracket-time">{bracket.time}</div>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LiveArena;
