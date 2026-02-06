import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import { predictionStats, upcomingMatches } from '../data/data';
import { useAuth } from '../context/AuthContext';
import { TrendingUp, CheckCircle, XCircle, Target, X } from 'lucide-react';
import '../styles/Predictions.css';

function Predictions() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('upcoming');
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [betAmount, setBetAmount] = useState('');
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [userBalance, setUserBalance] = useState(predictionStats.balance);

  const stats = [
    { label: 'Puan Bakiyesi', value: userBalance, icon: TrendingUp, color: 'blue' },
    { label: 'Kazanılan', value: predictionStats.won, icon: CheckCircle, color: 'green' },
    { label: 'Kaybedilen', value: predictionStats.lost, icon: XCircle, color: 'red' },
    { label: 'Başarı Oranı', value: `${predictionStats.successRate}%`, icon: Target, color: 'purple' }
  ];

  const calculatePotentialWin = (amount, odds) => {
    if (!amount || amount <= 0) return 0;
    return Math.floor(amount * odds);
  };

  const handleBetClick = (match, team) => {
    if (!user) {
      alert('Tahmin yapmak için lütfen giriş yapın.');
      return;
    }
    setSelectedMatch(match);
    setSelectedTeam(team);
    setBetAmount('');
  };

  const handleBetSubmit = (e) => {
    e.preventDefault();
    const amount = parseInt(betAmount);
    
    if (!amount || amount <= 0) {
      alert('Lütfen geçerli bir miktar girin.');
      return;
    }

    if (amount > userBalance) {
      alert('Yetersiz bakiye! Mevcut bakiyeniz: ' + userBalance + ' Puan');
      return;
    }

    // Place bet logic here
    setUserBalance(userBalance - amount);
    alert(`Tahmininiz alındı! ${amount} Puan ${selectedTeam.name} takımına yatırıldı.`);
    setSelectedMatch(null);
    setSelectedTeam(null);
    setBetAmount('');
  };

  const potentialWin = selectedMatch && selectedTeam 
    ? calculatePotentialWin(parseInt(betAmount) || 0, selectedTeam.odds)
    : 0;

  return (
    <div className="predictions-page">
      <BackButton />
      <div className="container" style={{paddingTop: '100px', paddingBottom: '40px'}}>
        <div className="predictions-header">
          <div>
            <h1 className="page-title text-neon-purple">
              <TrendingUp size={32} />
              Tahmin Sistemi
            </h1>
            <p className="page-subtitle">E-spor maçlarına sanal puanlarla tahmin yap ve kazan!</p>
          </div>
        </div>

        <div className="stats-grid">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className={`stat-card glass stat-${stat.color}`}>
                <Icon size={32} />
                <div>
                  <div className="stat-label">{stat.label}</div>
                  <div className="stat-value">{stat.value}</div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="match-tabs">
          <button 
            className={`tab ${activeTab === 'upcoming' ? 'active' : ''}`}
            onClick={() => setActiveTab('upcoming')}
          >
            Yaklaşan
          </button>
          <button 
            className={`tab ${activeTab === 'live' ? 'active' : ''}`}
            onClick={() => setActiveTab('live')}
          >
            Canlı
          </button>
          <button 
            className={`tab ${activeTab === 'finished' ? 'active' : ''}`}
            onClick={() => setActiveTab('finished')}
          >
            Biten
          </button>
          <button 
            className={`tab ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            Tümü
          </button>
        </div>

        <div className="matches-grid">
          {upcomingMatches.map(match => (
            <div key={match.id} className="prediction-match-card glass">
              <div className="match-header">
                <span className="match-status">{match.status}</span>
                <span className="match-time">{match.date} {match.time}</span>
              </div>
              
              <div className="match-teams">
                <div className="team">
                  <div className="team-logo">{match.team1.logo}</div>
                  <div className="team-info">
                    <span className="team-name">{match.team1.name}</span>
                    <span className="team-odds">{match.team1.odds}x</span>
                  </div>
                </div>
                
                <div className="vs-divider">VS</div>
                
                <div className="team">
                  <div className="team-logo">{match.team2.logo}</div>
                  <div className="team-info">
                    <span className="team-name">{match.team2.name}</span>
                    <span className="team-odds">{match.team2.odds}x</span>
                  </div>
                </div>
              </div>

              <div className="prediction-actions">
                <button 
                  onClick={() => handleBetClick(match, match.team1)}
                  className="btn-predict team1-btn"
                >
                  Tahmin Et
                </button>
                <button 
                  onClick={() => handleBetClick(match, match.team2)}
                  className="btn-predict team2-btn"
                >
                  Tahmin Et
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bet Calculation Modal */}
      {selectedMatch && selectedTeam && (
        <div className="modal" onClick={() => { setSelectedMatch(null); setSelectedTeam(null); }}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-white">Tahmin Yap</h2>
              <button 
                onClick={() => { setSelectedMatch(null); setSelectedTeam(null); }}
                className="text-white/60 hover:text-white"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="mb-4 p-4 backdrop-blur-glass bg-white/5 border border-white/10 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white/80">Seçilen Takım:</span>
                <span className="font-bold text-neon-cyan">{selectedTeam.name}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/80">Oran:</span>
                <span className="font-bold text-neon-purple">{selectedTeam.odds}x</span>
              </div>
            </div>

            <form onSubmit={handleBetSubmit} className="space-y-4">
              <div>
                <label className="block text-white/80 mb-2">Bahis Miktarı (Puan)</label>
                <input
                  type="number"
                  value={betAmount}
                  onChange={(e) => setBetAmount(e.target.value)}
                  placeholder="Miktar girin..."
                  min="1"
                  max={userBalance}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-neon-cyan"
                  required
                />
                <p className="text-sm text-white/60 mt-1">Mevcut Bakiye: {userBalance} Puan</p>
              </div>

              {betAmount && parseInt(betAmount) > 0 && (
                <div className="p-4 backdrop-blur-glass bg-neon-cyan/10 border border-neon-cyan rounded-xl">
                  <div className="flex items-center justify-between">
                    <span className="text-white/80">Tahmini Kazanç:</span>
                    <span className="text-2xl font-bold text-neon-cyan">
                      {potentialWin} Puan
                    </span>
                  </div>
                  <p className="text-sm text-white/60 mt-2">
                    {betAmount} × {selectedTeam.odds} = {potentialWin} Puan
                  </p>
                </div>
              )}

              {betAmount && parseInt(betAmount) > userBalance && (
                <div className="p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-400 text-sm">
                  ⚠️ Yetersiz bakiye! Mevcut bakiyeniz: {userBalance} Puan
                </div>
              )}

              <button
                type="submit"
                disabled={!betAmount || parseInt(betAmount) <= 0 || parseInt(betAmount) > userBalance}
                className="w-full py-3 bg-gradient-neon-purple rounded-lg text-white font-semibold hover:shadow-neon-purple transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Tahmini Onayla
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Predictions;
