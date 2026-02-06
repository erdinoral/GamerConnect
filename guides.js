// Guides Data
const guidesData = [
    {
        id: 1,
        title: 'Valorant Jett Build Rehberi',
        game: 'valorant',
        type: 'build',
        author: 'ProGamer123',
        views: 1250,
        rating: 4.8,
        description: 'Jett için en etkili build ve oynanış stratejisi. Ranked oyunlarında kullanabileceğiniz detaylı rehber.',
        content: 'Jett karakteri için optimal build...'
    },
    {
        id: 2,
        title: 'CS2 A Site Take Stratejisi',
        game: 'cs2',
        type: 'strategy',
        author: 'CSMaster',
        views: 890,
        rating: 4.6,
        description: 'Mirage haritasında A site almak için profesyonel strateji.',
        content: 'A site take için adım adım rehber...'
    },
    {
        id: 3,
        title: 'LoL Jungle Pathing Rehberi',
        game: 'lol',
        type: 'tactics',
        author: 'JunglePro',
        views: 2100,
        rating: 4.9,
        description: 'Jungle karakterleri için optimal pathing ve gank zamanlaması.',
        content: 'Jungle pathing detayları...'
    },
    {
        id: 4,
        title: 'EAFC 4-3-3 Formasyon Taktikleri',
        game: 'eafc',
        type: 'tactics',
        author: 'FifaMaster',
        views: 750,
        rating: 4.7,
        description: '4-3-3 formasyonu ile ofansif oyun stratejisi.',
        content: '4-3-3 formasyon rehberi...'
    }
];

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    renderGuides(guidesData);
});

// Render Guides
function renderGuides(guides) {
    const guidesGrid = document.getElementById('guidesGrid');
    if (!guidesGrid) return;

    guidesGrid.innerHTML = guides.map(guide => `
        <div class="guide-card">
            <div class="guide-header">
                <span class="guide-game">${getGameName(guide.game)}</span>
                <span class="guide-type">${getTypeName(guide.type)}</span>
            </div>
            <h3>${guide.title}</h3>
            <p class="guide-description">${guide.description}</p>
            <div class="guide-footer">
                <div class="guide-meta">
                    <span><i class="fas fa-user"></i> ${guide.author}</span>
                    <span><i class="fas fa-eye"></i> ${guide.views}</span>
                    <span><i class="fas fa-star"></i> ${guide.rating}</span>
                </div>
                <button class="btn-primary" onclick="viewGuide(${guide.id})">
                    <i class="fas fa-book-open"></i> Oku
                </button>
            </div>
        </div>
    `).join('');
}

// Get Game Name
function getGameName(game) {
    const games = {
        'valorant': 'Valorant',
        'cs2': 'CS2',
        'lol': 'LoL',
        'eafc': 'EAFC'
    };
    return games[game] || game;
}

// Get Type Name
function getTypeName(type) {
    const types = {
        'build': 'Build',
        'strategy': 'Strateji',
        'tactics': 'Taktik'
    };
    return types[type] || type;
}

// Filter Guides
function filterGuides() {
    const gameFilter = document.getElementById('gameFilter').value;
    const typeFilter = document.getElementById('typeFilter').value;

    let filtered = guidesData;

    if (gameFilter !== 'all') {
        filtered = filtered.filter(g => g.game === gameFilter);
    }

    if (typeFilter !== 'all') {
        filtered = filtered.filter(g => g.type === typeFilter);
    }

    renderGuides(filtered);
}

// View Guide
function viewGuide(id) {
    const guide = guidesData.find(g => g.id === id);
    if (!guide) return;

    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 900px;">
            <span class="close-modal" onclick="this.closest('.modal').remove()">&times;</span>
            <div class="guide-detail">
                <div class="guide-detail-header">
                    <span class="guide-game">${getGameName(guide.game)}</span>
                    <span class="guide-type">${getTypeName(guide.type)}</span>
                </div>
                <h2>${guide.title}</h2>
                <div class="guide-detail-meta">
                    <span><i class="fas fa-user"></i> ${guide.author}</span>
                    <span><i class="fas fa-eye"></i> ${guide.views} görüntüleme</span>
                    <span><i class="fas fa-star"></i> ${guide.rating} / 5.0</span>
                </div>
                <div class="guide-content">
                    <p>${guide.content}</p>
                    <p>${guide.description}</p>
                    <p>Bu rehber topluluk tarafından hazırlanmıştır. Daha fazla detay için tam versiyonu görüntüleyebilirsiniz.</p>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    modal.style.display = 'block';
}
