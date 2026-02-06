import React from 'react';

const twitchGames = [
  { name: 'CS2', channel: 'eslcs', icon: '🎯' },
  { name: 'EAFC', channel: 'easportsfc', icon: '⚽' },
  { name: 'LoL', channel: 'leagueoflegends', icon: '⚔️' },
  { name: 'Valorant', channel: 'valorant_emea', icon: '🔫' }
];

function LiveArena() {
  const watchStream = (channel) => {
    window.open(`https://www.twitch.tv/${channel}`, '_blank');
  };

  return (
    <section id="live-arena" className="section live-arena-section">
      <div className="container">
        <div className="section-header">
          <h2><i className="fas fa-broadcast-tower"></i> Canlı Yayınlar</h2>
        </div>
        <div className="twitch-grid">
          {twitchGames.map((game, index) => (
            <div key={index} className="twitch-card">
              <div className="twitch-header">
                <span className="live-indicator"></span>
                <span className="live-text">CANLI</span>
              </div>
              <div className="twitch-preview">
                <div className="twitch-placeholder">
                  <i className="fab fa-twitch"></i>
                  <p>{game.name}</p>
                </div>
              </div>
              <div className="twitch-info">
                <h3>{game.name} - {game.channel}</h3>
                <p className="twitch-viewers">12.5K izleyici</p>
                <button className="btn-watch" onClick={() => watchStream(game.channel)}>
                  <i className="fas fa-play"></i> İzle
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default LiveArena;
