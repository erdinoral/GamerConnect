// Stats Data
const statsData = {
    valorant: [
        { character: 'Jett', winRate: 52.3, pickRate: 18.5, kda: 1.15 },
        { character: 'Raze', winRate: 51.8, pickRate: 15.2, kda: 1.12 },
        { character: 'Sage', winRate: 50.5, pickRate: 22.1, kda: 0.95 },
        { character: 'Omen', winRate: 49.8, pickRate: 12.3, kda: 1.08 },
        { character: 'Phoenix', winRate: 48.2, pickRate: 8.5, kda: 1.05 }
    ],
    cs2: [
        { character: 'AK-47', winRate: 58.2, pickRate: 45.3, kda: 1.25 },
        { character: 'AWP', winRate: 62.1, pickRate: 18.7, kda: 1.35 },
        { character: 'M4A4', winRate: 54.8, pickRate: 38.9, kda: 1.18 },
        { character: 'Glock-18', winRate: 42.3, pickRate: 12.1, kda: 0.88 },
        { character: 'USP-S', winRate: 48.5, pickRate: 15.6, kda: 1.02 }
    ],
    lol: [
        { character: 'Jinx', winRate: 53.2, pickRate: 12.5, kda: 2.15 },
        { character: 'Yasuo', winRate: 49.8, pickRate: 18.3, kda: 1.85 },
        { character: 'Thresh', winRate: 51.5, pickRate: 15.7, kda: 2.05 },
        { character: 'Lee Sin', winRate: 48.9, pickRate: 14.2, kda: 1.95 },
        { character: 'Zed', winRate: 50.2, pickRate: 16.8, kda: 1.92 }
    ]
};

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    loadStats('valorant');
});

// Load Stats
function loadStats(game) {
    const statsContent = document.getElementById('statsContent');
    if (!statsContent) return;

    // Update active button
    document.querySelectorAll('.game-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.game === game) {
            btn.classList.add('active');
        }
    });

    const stats = statsData[game] || [];
    const gameName = getGameName(game);

    statsContent.innerHTML = `
        <div class="stats-header">
            <h2>${gameName} Meta Analizi</h2>
            <p class="stats-update">Son güncelleme: ${new Date().toLocaleDateString('tr-TR')}</p>
        </div>
        <div class="stats-table">
            <table>
                <thead>
                    <tr>
                        <th>Karakter/Silah</th>
                        <th>Kazanma Oranı</th>
                        <th>Seçilme Oranı</th>
                        <th>K/D/A</th>
                    </tr>
                </thead>
                <tbody>
                    ${stats.map(stat => `
                        <tr>
                            <td><strong>${stat.character}</strong></td>
                            <td>
                                <div class="stat-bar">
                                    <div class="stat-fill" style="width: ${stat.winRate}%"></div>
                                    <span>${stat.winRate}%</span>
                                </div>
                            </td>
                            <td>${stat.pickRate}%</td>
                            <td>${stat.kda}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
        <div class="meta-insights">
            <h3><i class="fas fa-lightbulb"></i> Meta İçgörüleri</h3>
            <div class="insights-grid">
                <div class="insight-card">
                    <h4>En Güçlü</h4>
                    <p>${stats[0]?.character || 'N/A'} - ${stats[0]?.winRate || 0}% kazanma oranı ile en güçlü seçenek.</p>
                </div>
                <div class="insight-card">
                    <h4>En Popüler</h4>
                    <p>${stats.sort((a, b) => b.pickRate - a.pickRate)[0]?.character || 'N/A'} - En çok seçilen karakter.</p>
                </div>
                <div class="insight-card">
                    <h4>Meta Durumu</h4>
                    <p>Ortalama kazanma oranı: ${(stats.reduce((sum, s) => sum + s.winRate, 0) / stats.length).toFixed(1)}%</p>
                </div>
            </div>
        </div>
    `;
}

// Get Game Name
function getGameName(game) {
    const games = {
        'valorant': 'Valorant',
        'cs2': 'CS2',
        'lol': 'League of Legends'
    };
    return games[game] || game;
}
