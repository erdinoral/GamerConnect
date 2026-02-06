// Real Games Data
const gamesData = [
    {
        id: 1,
        title: "League of Legends",
        category: "strategy",
        rating: 4.8,
        players: "150M+",
        image: "⚔️",
        icon: "fas fa-sword",
        description: "Dünyanın en popüler MOBA oyunu. 150'den fazla şampiyonla stratejik savaşlara katılın.",
        color: "#C89B3C"
    },
    {
        id: 2,
        title: "Valorant",
        category: "action",
        rating: 4.9,
        players: "25M+",
        image: "🔫",
        icon: "fas fa-crosshairs",
        description: "Riot Games'in taktiksel FPS oyunu. Keskin nişancılık ve strateji birleşimi.",
        color: "#FF4655"
    },
    {
        id: 3,
        title: "Counter-Strike 2",
        category: "action",
        rating: 4.7,
        players: "35M+",
        image: "🎯",
        icon: "fas fa-bullseye",
        description: "Efsanevi FPS serisinin yeni nesil versiyonu. Competitive gaming'in zirvesi.",
        color: "#B48B2D"
    },
    {
        id: 4,
        title: "EA Sports FC 24",
        category: "sports",
        rating: 4.5,
        players: "10M+",
        image: "⚽",
        icon: "fas fa-futbol",
        description: "Futbol simülasyonunun en gerçekçi deneyimi. Dünya çapında ligler ve takımlar.",
        color: "#00A8E8"
    },
    {
        id: 5,
        title: "Elden Ring",
        category: "adventure",
        rating: 5.0,
        players: "20M+",
        image: "🗡️",
        icon: "fas fa-ring",
        description: "FromSoftware'in epik açık dünya RPG'si. Zorlu boss savaşları ve derin hikaye.",
        color: "#8B4513"
    },
    {
        id: 6,
        title: "Grand Theft Auto V",
        category: "adventure",
        rating: 4.9,
        players: "185M+",
        image: "🚗",
        icon: "fas fa-car",
        description: "Açık dünya aksiyon-macera oyunu. Los Santos'ta özgürce keşfedin ve macera yaşayın.",
        color: "#00FF00"
    }
];

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('gamesGrid')) {
        renderGames(gamesData);
        setupEventListeners();
        setupSmoothScroll();
    }
});

// Render games
function renderGames(games) {
    const gamesGrid = document.getElementById('gamesGrid');
    gamesGrid.innerHTML = '';

    games.forEach(game => {
        const gameCard = createGameCard(game);
        gamesGrid.appendChild(gameCard);
    });
}

// Create game card
function createGameCard(game) {
    const card = document.createElement('div');
    card.className = 'game-card';
    card.dataset.category = game.category;

    const stars = '⭐'.repeat(Math.floor(game.rating));
    
    const iconClass = game.icon || 'fas fa-gamepad';
    const gameColor = game.color || '#6366f1';
    
    card.innerHTML = `
        <div class="game-image" style="background: linear-gradient(135deg, ${gameColor}20 0%, ${gameColor}40 100%);">
            <i class="${iconClass}" style="font-size: 4rem; z-index: 1; position: relative; color: ${gameColor}; text-shadow: 0 0 20px ${gameColor}80;"></i>
        </div>
        <div class="game-info">
            <h3 class="game-title">${game.title}</h3>
            <p class="game-category">${getCategoryName(game.category)}</p>
            <div class="game-rating">
                <span class="stars">${stars}</span>
                <span>${game.rating}</span>
            </div>
            <div class="game-footer">
                <span style="color: var(--text-secondary); font-size: 0.9rem;">${game.players} oyuncu</span>
                <button class="btn-play" onclick="openGameModal(${game.id})" style="background: linear-gradient(135deg, ${gameColor} 0%, ${gameColor}dd 100%);">
                    <i class="fas fa-play"></i> Oyna
                </button>
            </div>
        </div>
    `;

    return card;
}

// Get category name in Turkish
function getCategoryName(category) {
    const categories = {
        'action': 'Aksiyon/FPS',
        'adventure': 'Macera/RPG',
        'strategy': 'Strateji/MOBA',
        'sports': 'Spor',
        'racing': 'Yarış',
        'puzzle': 'Bulmaca'
    };
    return categories[category] || category;
}

// Setup event listeners
function setupEventListeners() {
    // Filter tabs
    const filterTabs = document.querySelectorAll('.filter-tab');
    filterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            filterTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.dataset.filter;
            filterGames(filter);
        });
    });

    // Category cards
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const category = this.dataset.category;
            filterGames(category);
            
            // Update filter tabs
            filterTabs.forEach(t => t.classList.remove('active'));
            const matchingTab = Array.from(filterTabs).find(t => t.dataset.filter === category);
            if (matchingTab) matchingTab.classList.add('active');
            
            // Scroll to games section
            document.getElementById('games').scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Search
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase();
        searchGames(query);
    });

    // Modal close
    const modal = document.getElementById('gameModal');
    const closeModal = document.querySelector('.close-modal');
    
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('href');
            if (target.startsWith('#')) {
                const section = document.querySelector(target);
                if (section) {
                    section.scrollIntoView({ behavior: 'smooth' });
                }
            }
            
            // Update active nav link
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Hero buttons
    const heroButtons = document.querySelectorAll('.btn-hero');
    heroButtons.forEach(button => {
        button.addEventListener('click', function() {
            document.getElementById('games').scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Login button
    const loginBtn = document.getElementById('loginBtn');
    loginBtn.addEventListener('click', function() {
        alert('Giriş özelliği yakında eklenecek!');
    });

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
}

// Filter games
function filterGames(filter) {
    if (filter === 'all') {
        renderGames(gamesData);
    } else {
        const filtered = gamesData.filter(game => game.category === filter);
        renderGames(filtered);
    }
}

// Search games
function searchGames(query) {
    if (query === '') {
        renderGames(gamesData);
        return;
    }

    const filtered = gamesData.filter(game => 
        game.title.toLowerCase().includes(query) ||
        getCategoryName(game.category).toLowerCase().includes(query)
    );
    renderGames(filtered);
}

// Open game modal
function openGameModal(gameId) {
    const game = gamesData.find(g => g.id === gameId);
    if (!game) return;

    const modal = document.getElementById('gameModal');
    const modalBody = document.getElementById('modalBody');
    
    const stars = '⭐'.repeat(Math.floor(game.rating));
    
    modalBody.innerHTML = `
        <div class="game-detail">
            <div class="game-detail-image">
                <span style="font-size: 5rem;">${game.image}</span>
            </div>
            <div class="game-detail-info">
                <h2>${game.title}</h2>
                <p><strong>Kategori:</strong> ${getCategoryName(game.category)}</p>
                <div class="game-rating" style="margin: 1rem 0;">
                    <span class="stars">${stars}</span>
                    <span>${game.rating} / 5.0</span>
                </div>
                <p><strong>Oyuncu Sayısı:</strong> ${game.players}</p>
                <p style="margin-top: 1rem;">${game.description}</p>
                <div style="margin-top: 2rem;">
                    <button class="btn-primary" style="padding: 15px 30px; font-size: 1.1rem;">
                        <i class="fas fa-play"></i> Oyunu Oyna
                    </button>
                </div>
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
}

// Smooth scroll setup
function setupSmoothScroll() {
    // Add scroll effect to navbar
    let lastScroll = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.boxShadow = 'none';
        }
        
        lastScroll = currentScroll;
    });

    // Update active nav link on scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Add animations on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe game cards and category cards
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        const cards = document.querySelectorAll('.game-card, .category-card, .feature');
        cards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.6s, transform 0.6s';
            observer.observe(card);
        });
    }, 100);
});
