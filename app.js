// Global App State
const appState = {
    isLoggedIn: false,
    currentUser: null,
    currentPage: 'home'
};

// Twitch Streams Configuration
const twitchChannels = {
    'CS2': 'eslcs',
    'EAFC': 'easportsfc',
    'LoL': 'leagueoflegends',
    'Valorant': 'valorant_emea'
};

// Initialize App
document.addEventListener('DOMContentLoaded', function() {
    initApp();
    loadTwitchStreams();
    setupBackButton();
    setupDonateButton();
    setupPublicAccess();
});

// Initialize App
function initApp() {
    // Check if user is logged in (from localStorage)
    const savedUser = localStorage.getItem('gamerHub_user');
    if (savedUser) {
        appState.isLoggedIn = true;
        appState.currentUser = JSON.parse(savedUser);
        updateUIForLoggedIn();
    }
    
    // Set current page
    const path = window.location.pathname;
    if (path.includes('lobby')) appState.currentPage = 'lobby';
    else if (path.includes('guides')) appState.currentPage = 'guides';
    else if (path.includes('news')) appState.currentPage = 'news';
    else if (path.includes('stats')) appState.currentPage = 'stats';
    else if (path.includes('investors')) appState.currentPage = 'investors';
    else appState.currentPage = 'home';
}

// Load Twitch Streams
function loadTwitchStreams() {
    const twitchGrid = document.getElementById('twitchGrid');
    if (!twitchGrid) return;

    const games = [
        { name: 'CS2', channel: 'eslcs', icon: '🎯' },
        { name: 'EAFC', channel: 'easportsfc', icon: '⚽' },
        { name: 'LoL', channel: 'leagueoflegends', icon: '⚔️' },
        { name: 'Valorant', channel: 'valorant_emea', icon: '🔫' }
    ];

    twitchGrid.innerHTML = games.map(game => `
        <div class="twitch-card">
            <div class="twitch-header">
                <span class="live-indicator"></span>
                <span class="live-text">CANLI</span>
            </div>
            <div class="twitch-preview">
                <div class="twitch-placeholder">
                    <i class="fab fa-twitch"></i>
                    <p>${game.name}</p>
                </div>
            </div>
            <div class="twitch-info">
                <h3>${game.name} - ${game.channel}</h3>
                <p class="twitch-viewers">12.5K izleyici</p>
                <button class="btn-watch" onclick="watchStream('${game.channel}')">
                    <i class="fas fa-play"></i> İzle
                </button>
            </div>
        </div>
    `).join('');
}

// Watch Stream
function watchStream(channel) {
    window.open(`https://www.twitch.tv/${channel}`, '_blank');
}

// Setup Back Button
function setupBackButton() {
    // Only show on non-home pages
    if (appState.currentPage !== 'home') {
        const backBtn = document.createElement('button');
        backBtn.className = 'back-btn neon-glow';
        backBtn.innerHTML = '<i class="fas fa-arrow-left"></i> Geri Dön';
        backBtn.onclick = () => {
            if (window.history.length > 1) {
                window.history.back();
            } else {
                window.location.href = 'index.html';
            }
        };
        document.body.appendChild(backBtn);
    }
}

// Setup Donate Button
function setupDonateButton() {
    const donateBtns = document.querySelectorAll('#donateBtn, #donateBtnFixed');
    donateBtns.forEach(btn => {
        if (btn) {
            btn.addEventListener('click', function() {
                showDonateModal();
            });
        }
    });
}

// Show Donate Modal
function showDonateModal() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = 'donateModal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal" onclick="this.closest('.modal').remove()">&times;</span>
            <div class="donate-content">
                <i class="fas fa-heart" style="font-size: 3rem; color: #fbbf24; margin-bottom: 1rem;"></i>
                <h2>Gamer Hub'ı Destekle</h2>
                <p>Bağışlarınız platformun gelişimine katkıda bulunur.</p>
                <div class="donate-options">
                    <button class="donate-amount" data-amount="50">50₺</button>
                    <button class="donate-amount" data-amount="100">100₺</button>
                    <button class="donate-amount" data-amount="250">250₺</button>
                    <button class="donate-amount" data-amount="500">500₺</button>
                </div>
                <div class="custom-amount">
                    <input type="number" placeholder="Özel Tutar (₺)" id="customAmount">
                </div>
                <button class="btn-primary" onclick="processDonation()">
                    <i class="fas fa-credit-card"></i> Bağış Yap
                </button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    modal.style.display = 'block';

    // Amount selection
    modal.querySelectorAll('.donate-amount').forEach(btn => {
        btn.addEventListener('click', function() {
            modal.querySelectorAll('.donate-amount').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            document.getElementById('customAmount').value = this.dataset.amount;
        });
    });
}

// Process Donation
function processDonation() {
    const amount = document.getElementById('customAmount').value;
    if (!amount || amount <= 0) {
        alert('Lütfen geçerli bir tutar girin.');
        return;
    }
    alert(`Teşekkürler! ${amount}₺ bağış işlemi simüle edildi. (Gerçek ödeme entegrasyonu eklenecek)`);
    document.getElementById('donateModal').remove();
}

// Setup Public Access
function setupPublicAccess() {
    // All content is viewable, but actions require login
    const actionButtons = document.querySelectorAll('.btn-play, .btn-join, .btn-post, .btn-vote');
    actionButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            if (!appState.isLoggedIn) {
                e.preventDefault();
                showLoginRequired();
            }
        });
    });
}

// Show Login Required
function showLoginRequired() {
    const modal = document.getElementById('loginModal');
    if (modal) {
        modal.style.display = 'block';
    }
}

// Show Login Form
function showLoginForm() {
    const modal = document.getElementById('loginModal');
    if (modal) {
        modal.querySelector('.login-prompt').innerHTML = `
            <i class="fas fa-user-circle" style="font-size: 3rem; margin-bottom: 1rem;"></i>
            <h2>Giriş Yap</h2>
            <form id="loginForm" onsubmit="handleLogin(event)">
                <input type="text" placeholder="Kullanıcı Adı" required>
                <input type="password" placeholder="Şifre" required>
                <button type="submit" class="btn-primary">
                    <i class="fas fa-sign-in-alt"></i> Giriş Yap
                </button>
            </form>
            <p style="margin-top: 1rem; color: var(--text-secondary);">
                Hesabınız yok mu? <a href="#" style="color: var(--primary-color);">Kayıt Ol</a>
            </p>
        `;
    }
}

// Handle Login
function handleLogin(event) {
    event.preventDefault();
    const form = event.target;
    const username = form.querySelector('input[type="text"]').value;
    
    // Simulate login
    appState.isLoggedIn = true;
    appState.currentUser = {
        username: username,
        trustScore: Math.floor(Math.random() * 30) + 70,
        rank: ['Bronz', 'Gümüş', 'Altın', 'Platin', 'Elmas'][Math.floor(Math.random() * 5)]
    };
    
    localStorage.setItem('gamerHub_user', JSON.stringify(appState.currentUser));
    updateUIForLoggedIn();
    document.getElementById('loginModal').style.display = 'none';
    alert(`Hoş geldiniz, ${username}!`);
}

// Update UI for Logged In User
function updateUIForLoggedIn() {
    const loginBtn = document.getElementById('loginBtn');
    if (loginBtn && appState.currentUser) {
        loginBtn.innerHTML = `
            <i class="fas fa-user"></i> ${appState.currentUser.username}
            <span class="user-rank">${appState.currentUser.rank}</span>
        `;
        loginBtn.onclick = () => showUserProfile();
    }
}

// Show User Profile
function showUserProfile() {
    if (!appState.currentUser) return;
    
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal" onclick="this.closest('.modal').remove()">&times;</span>
            <div class="user-profile">
                <div class="profile-header">
                    <i class="fas fa-user-circle" style="font-size: 4rem;"></i>
                    <h2>${appState.currentUser.username}</h2>
                    <div class="user-stats">
                        <div class="stat-item">
                            <span class="stat-label">Güvenilirlik</span>
                            <span class="stat-value trust-score">${appState.currentUser.trustScore}</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Rütbe</span>
                            <span class="stat-value rank-badge">${appState.currentUser.rank}</span>
                        </div>
                    </div>
                </div>
                <div class="profile-actions">
                    <button class="btn-primary" onclick="this.closest('.modal').remove(); logout();">
                        <i class="fas fa-sign-out-alt"></i> Çıkış Yap
                    </button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    modal.style.display = 'block';
}

// Logout
function logout() {
    appState.isLoggedIn = false;
    appState.currentUser = null;
    localStorage.removeItem('gamerHub_user');
    const loginBtn = document.getElementById('loginBtn');
    if (loginBtn) {
        loginBtn.innerHTML = '<i class="fas fa-user"></i> Giriş Yap';
        loginBtn.onclick = () => showLoginRequired();
    }
}

// Check if action requires login
function requireLogin(callback) {
    if (!appState.isLoggedIn) {
        showLoginRequired();
        return false;
    }
    if (callback) callback();
    return true;
}

// Make requireLogin globally available
window.requireLogin = requireLogin;
