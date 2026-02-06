import React from 'react';
import { ArrowRight } from 'lucide-react';
import { upcomingMatches } from '../data/data';
import '../styles/UpcomingMatches.css';

function UpcomingMatches() {
  return (
    <section className="upcoming-matches glass">
      <div className="section-header">
        <h3 className="section-title text-neon-cyan">Yaklaşan Maçlar</h3>
        <a href="#" className="see-all-link">
          Tümünü Gör <ArrowRight size={16} />
        </a>
      </div>
      
      <div className="matches-list">
        {upcomingMatches.map(match => (
          <div key={match.id} className="match-card glass">
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
          </div>
        ))}
      </div>
    </section>
  );
}

export default UpcomingMatches;
