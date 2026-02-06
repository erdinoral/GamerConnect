// News Data
const newsData = {
    esports: [
        {
            id: 1,
            title: 'Valorant Champions 2024 Başlıyor!',
            source: 'Riot Games',
            date: '2 saat önce',
            description: 'Dünyanın en büyük Valorant turnuvası bu hafta sonu başlıyor. 16 takım yarışacak.',
            image: '🏆',
            category: 'esports'
        },
        {
            id: 2,
            title: 'CS2 Major Turnuvası Sonuçları',
            source: 'ESL',
            date: '5 saat önce',
            description: 'NAVI takımı CS2 Major turnuvasını kazandı. Final skoru 2-1.',
            image: '🎯',
            category: 'esports'
        },
        {
            id: 3,
            title: 'LoL World Championship Grupları Belirlendi',
            source: 'Riot Games',
            date: '1 gün önce',
            description: 'World Championship için grup kuraları çekildi. Türk takımları hangi grupta?',
            image: '⚔️',
            category: 'esports'
        }
    ],
    steam: [
        {
            id: 4,
            title: 'Steam Yeni İndirim Kampanyası',
            source: 'Steam',
            date: '3 saat önce',
            description: 'Hafta sonu özel indirimler başladı! %70\'e varan indirimler.',
            image: '💰',
            category: 'steam'
        },
        {
            id: 5,
            title: 'Yeni Oyun: Cyberpunk 2077 DLC',
            source: 'Steam',
            date: '1 gün önce',
            description: 'Phantom Liberty DLC\'si Steam\'de yayınlandı. Yeni hikaye ve içerikler.',
            image: '🎮',
            category: 'steam'
        }
    ],
    epic: [
        {
            id: 6,
            title: 'Epic Games Haftalık Ücretsiz Oyun',
            source: 'Epic Games',
            date: '4 saat önce',
            description: 'Bu hafta ücretsiz: "The Witcher 3: Wild Hunt". Hemen alın!',
            image: '🎁',
            category: 'epic'
        },
        {
            id: 7,
            title: 'Epic Games Store Yeni Özellikler',
            source: 'Epic Games',
            date: '2 gün önce',
            description: 'Yeni arayüz güncellemesi ve geliştirilmiş performans.',
            image: '✨',
            category: 'epic'
        }
    ]
};

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    renderNews('esports');
    setupNewsTabs();
});

// Setup News Tabs
function setupNewsTabs() {
    const tabs = document.querySelectorAll('.news-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            const category = this.dataset.tab;
            renderNews(category);
        });
    });
}

// Render News
function renderNews(category) {
    const newsList = document.getElementById('newsList');
    if (!newsList) return;

    const news = newsData[category] || [];
    
    newsList.innerHTML = news.map(item => `
        <div class="news-card">
            <div class="news-icon">${item.image}</div>
            <div class="news-content">
                <div class="news-header">
                    <h3>${item.title}</h3>
                    <span class="news-source">${item.source}</span>
                </div>
                <p class="news-description">${item.description}</p>
                <div class="news-footer">
                    <span class="news-date"><i class="fas fa-clock"></i> ${item.date}</span>
                    <button class="btn-primary" onclick="readNews(${item.id})">
                        <i class="fas fa-arrow-right"></i> Oku
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Read News
function readNews(id) {
    // Find news in all categories
    let newsItem = null;
    for (const category in newsData) {
        newsItem = newsData[category].find(n => n.id === id);
        if (newsItem) break;
    }

    if (!newsItem) return;

    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 800px;">
            <span class="close-modal" onclick="this.closest('.modal').remove()">&times;</span>
            <div class="news-detail">
                <div class="news-detail-header">
                    <div class="news-icon-large">${newsItem.image}</div>
                    <div>
                        <h2>${newsItem.title}</h2>
                        <div class="news-meta">
                            <span><i class="fas fa-building"></i> ${newsItem.source}</span>
                            <span><i class="fas fa-clock"></i> ${newsItem.date}</span>
                        </div>
                    </div>
                </div>
                <div class="news-detail-content">
                    <p>${newsItem.description}</p>
                    <p>Bu haber ${newsItem.source} tarafından yayınlanmıştır. Daha fazla detay için kaynak sayfayı ziyaret edebilirsiniz.</p>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    modal.style.display = 'block';
}
