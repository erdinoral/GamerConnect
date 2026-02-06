import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import { useAuth } from '../context/AuthContext';
import { Users, Search, Filter, Mic, Target } from 'lucide-react';
import '../styles/SquadFinder.css';

const games = ['Valorant', 'Counter-Strike 2', 'League of Legends', 'Apex Legends', 'Fortnite'];
const roles = {
  'Valorant': ['Entry Fragger', 'Support', 'IGL', 'Lurker', 'Sniper'],
  'Counter-Strike 2': ['Entry Fragger', 'Support', 'IGL', 'AWPer', 'Lurker'],
  'League of Legends': ['Top', 'Jungle', 'Mid', 'ADC', 'Support'],
  'Apex Legends': ['Entry', 'Support', 'IGL', 'Fragger'],
  'Fortnite': ['Builder', 'Fragger', 'Support', 'IGL']
};
const squadSizes = ['Duo (2 kişi)', 'Squad (4 kişi)', 'Team (5+ kişi)'];

const mockSquads = [
  {
    id: 1,
    game: 'Valorant',
    role: 'Entry Fragger',
    size: 'Duo (2 kişi)',
    rank: 'Diamond',
    hasMic: true,
    description: 'Diamond rank entry fragger arıyorum. Agresif oyun tarzı tercih edilir.',
    author: 'ProGamer123',
    createdAt: '2 saat önce'
  },
  {
    id: 2,
    game: 'Counter-Strike 2',
    role: 'AWPer',
    size: 'Squad (4 kişi)',
    rank: 'Global Elite',
    hasMic: true,
    description: 'Faceit 10+ AWPer arıyorum. Turnuva tecrübesi olanlar tercih edilir.',
    author: 'CS2Master',
    createdAt: '5 saat önce'
  }
];

function SquadFinder() {
  const { isLoggedIn } = useAuth();
  const [filters, setFilters] = useState({
    game: '',
    role: '',
    size: '',
    rank: '',
    hasMic: false
  });
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleFilterChange = (key, value) => {
    setFilters({ ...filters, [key]: value });
    if (key === 'game') {
      setFilters({ ...filters, game: value, role: '' });
    }
  };

  const filteredSquads = mockSquads.filter(squad => {
    const matchesGame = !filters.game || squad.game === filters.game;
    const matchesRole = !filters.role || squad.role === filters.role;
    const matchesSize = !filters.size || squad.size === filters.size;
    const matchesMic = !filters.hasMic || squad.hasMic === filters.hasMic;
    const matchesSearch = !searchQuery || 
      squad.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      squad.author.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesGame && matchesRole && matchesSize && matchesMic && matchesSearch;
  });

  return (
    <div className="squad-finder-page">
      <BackButton />
      <div className="container" style={{ paddingTop: '100px', paddingBottom: '40px' }}>
        <div className="finder-header">
          <div>
            <h1 className="page-title text-neon-cyan">
              <Users size={32} />
              Duo & Squad Finder
            </h1>
            <p className="page-subtitle">Mükemmel takım arkadaşınızı bulun</p>
          </div>
          {isLoggedIn && (
            <button className="btn-create-squad">
              <Users size={18} />
              Squad Oluştur
            </button>
          )}
        </div>

        <div className="search-section">
          <div className="search-box glass">
            <Search size={20} />
            <input
              type="text"
              placeholder="Ara... (oyuncu, rol, rank)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="btn-filter"
          >
            <Filter size={18} />
            Filtrele
          </button>
        </div>

        {showFilters && (
          <div className="filters-panel glass">
            <div className="filter-group">
              <label>Oyun</label>
              <select
                value={filters.game}
                onChange={(e) => handleFilterChange('game', e.target.value)}
                className="filter-select"
              >
                <option value="">Tüm Oyunlar</option>
                {games.map(game => (
                  <option key={game} value={game}>{game}</option>
                ))}
              </select>
            </div>

            {filters.game && (
              <div className="filter-group">
                <label>Rol</label>
                <select
                  value={filters.role}
                  onChange={(e) => handleFilterChange('role', e.target.value)}
                  className="filter-select"
                >
                  <option value="">Tüm Roller</option>
                  {roles[filters.game]?.map(role => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              </div>
            )}

            <div className="filter-group">
              <label>Takım Boyutu</label>
              <select
                value={filters.size}
                onChange={(e) => handleFilterChange('size', e.target.value)}
                className="filter-select"
              >
                <option value="">Tüm Boyutlar</option>
                {squadSizes.map(size => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={filters.hasMic}
                  onChange={(e) => handleFilterChange('hasMic', e.target.checked)}
                />
                <Mic size={16} />
                Sadece Mikrofonlu
              </label>
            </div>

            <button
              onClick={() => setFilters({ game: '', role: '', size: '', rank: '', hasMic: false })}
              className="btn-reset"
            >
              Filtreleri Temizle
            </button>
          </div>
        )}

        <div className="squads-list">
          {filteredSquads.length > 0 ? (
            filteredSquads.map(squad => (
              <div key={squad.id} className="squad-card glass">
                <div className="squad-header">
                  <div className="squad-info">
                    <h3 className="squad-game">{squad.game}</h3>
                    <span className="squad-role">
                      <Target size={16} />
                      {squad.role}
                    </span>
                  </div>
                  <div className="squad-badges">
                    {squad.hasMic && (
                      <span className="badge mic">
                        <Mic size={14} />
                        Mic
                      </span>
                    )}
                    <span className="badge rank">{squad.rank}</span>
                  </div>
                </div>
                <p className="squad-description">{squad.description}</p>
                <div className="squad-footer">
                  <div className="squad-meta">
                    <span className="squad-size">{squad.size}</span>
                    <span className="squad-author">@{squad.author}</span>
                    <span className="squad-time">{squad.createdAt}</span>
                  </div>
                  <button className="btn-join">
                    Katıl
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-state">
              <p>Filtrelere uygun squad bulunamadı.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SquadFinder;
