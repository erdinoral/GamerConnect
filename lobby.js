// Lobby Data
let lobbies = [
    {
        id: 1,
        game: 'Valorant',
        type: 'Duo',
        description: 'Diamond rank, takım oyunu odaklı oyuncu arıyorum. Ranked oynayacağız.',
        author: 'ProGamer123',
        rank: 'Diamond',
        createdAt: '2 saat önce',
        members: 1,
        maxMembers: 2
    },
    {
        id: 2,
        game: 'CS2',
        type: 'Squad',
        description: 'Competitive oyun için 3 oyuncu arıyorum. Minimum Gold Nova 1.',
        author: 'CSMaster',
        rank: 'Gold Nova',
        createdAt: '5 saat önce',
        members: 1,
        maxMembers: 4
    },
    {
        id: 3,
        game: 'LoL',
        type: 'Team',
        description: 'Ranked 5v5 takımı kuruyoruz. Jungle ve Support pozisyonları açık.',
        author: 'LeaguePro',
        rank: 'Platinum',
        createdAt: '1 gün önce',
        members: 3,
        maxMembers: 5
    }
];

let forumPosts = [
    {
        id: 1,
        title: 'Bu build nasıl? (Valorant)',
        content: 'Jett için bu build iyi mi? Yorumlarınızı bekliyorum.',
        author: 'BuildMaster',
        votes: 15,
        comments: 8,
        category: 'build',
        createdAt: '3 saat önce'
    },
    {
        id: 2,
        title: 'CS2 için en iyi strateji nedir?',
        content: 'Yeni güncellemeden sonra hangi stratejiler daha etkili?',
        author: 'StrategyGuru',
        votes: 23,
        comments: 12,
        category: 'strategy',
        createdAt: '6 saat önce'
    },
    {
        id: 3,
        title: 'LoL meta analizi - Patch 14.2',
        content: 'Bu patch\'te hangi karakterler güçlü? Sizce nerf gelir mi?',
        author: 'MetaAnalyst',
        votes: 45,
        comments: 25,
        category: 'general',
        createdAt: '1 gün önce'
    }
];

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    renderLobbies();
    renderForumPosts();
    setupTabs();
});

// Render Lobbies
function renderLobbies() {
    const lobbyList = document.getElementById('lobbyList');
    if (!lobbyList) return;

    lobbyList.innerHTML = lobbies.map(lobby => `
        <div class="lobby-card">
            <div class="lobby-header">
                <div class="lobby-game">
                    <h3>${lobby.game}</h3>
                    <span class="lobby-type">${lobby.type}</span>
                </div>
                <div class="lobby-rank">
                    <span class="rank-badge">${lobby.rank}</span>
                </div>
            </div>
            <p class="lobby-description">${lobby.description}</p>
            <div class="lobby-footer">
                <div class="lobby-meta">
                    <span><i class="fas fa-user"></i> ${lobby.author}</span>
                    <span><i class="fas fa-clock"></i> ${lobby.createdAt}</span>
                    <span><i class="fas fa-users"></i> ${lobby.members}/${lobby.maxMembers}</span>
                </div>
                <button class="btn-join btn-primary" onclick="requireLogin(() => joinLobby(${lobby.id}))">
                    <i class="fas fa-sign-in-alt"></i> Katıl
                </button>
            </div>
        </div>
    `).join('');
}

// Render Forum Posts
function renderForumPosts() {
    const forumList = document.getElementById('forumList');
    if (!forumList) return;

    forumList.innerHTML = forumPosts.map(post => `
        <div class="forum-post">
            <div class="post-votes">
                <button class="vote-btn btn-vote" onclick="requireLogin(() => votePost(${post.id}, 'up'))">
                    <i class="fas fa-arrow-up"></i>
                </button>
                <span class="vote-count">${post.votes}</span>
                <button class="vote-btn btn-vote" onclick="requireLogin(() => votePost(${post.id}, 'down'))">
                    <i class="fas fa-arrow-down"></i>
                </button>
            </div>
            <div class="post-content">
                <h3>${post.title}</h3>
                <p>${post.content}</p>
                <div class="post-meta">
                    <span><i class="fas fa-user"></i> ${post.author}</span>
                    <span><i class="fas fa-clock"></i> ${post.createdAt}</span>
                    <span><i class="fas fa-comments"></i> ${post.comments} yorum</span>
                    <span class="post-category">${getCategoryName(post.category)}</span>
                </div>
            </div>
        </div>
    `).join('');
}

// Get Category Name
function getCategoryName(category) {
    const categories = {
        'build': 'Build',
        'strategy': 'Strateji',
        'general': 'Genel'
    };
    return categories[category] || category;
}

// Setup Tabs
function setupTabs() {
    const tabs = document.querySelectorAll('.lobby-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            const tabName = this.dataset.tab;
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            document.getElementById(tabName + 'Section').classList.add('active');
        });
    });
}

// Join Lobby
function joinLobby(lobbyId) {
    const lobby = lobbies.find(l => l.id === lobbyId);
    if (!lobby) return;

    if (lobby.members >= lobby.maxMembers) {
        alert('Bu lobi dolu!');
        return;
    }

    // Redirect to lobby detail page
    window.location.href = `lobby-detail.html?id=${lobbyId}`;
}

// Vote Post
function votePost(postId, direction) {
    const post = forumPosts.find(p => p.id === postId);
    if (!post) return;

    if (direction === 'up') {
        post.votes++;
    } else {
        post.votes--;
    }

    renderForumPosts();
}

// Show Create Lobby Modal
function showCreateLobbyModal() {
    document.getElementById('createLobbyModal').style.display = 'block';
}

// Show Create Post Modal
function showCreatePostModal() {
    document.getElementById('createPostModal').style.display = 'block';
}

// Close Modal
function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Create Lobby
function createLobby(event) {
    event.preventDefault();
    const form = event.target;
    const game = form.querySelector('input[type="text"]').value;
    const type = form.querySelector('select').value;
    const description = form.querySelector('textarea').value;

    const newLobby = {
        id: lobbies.length + 1,
        game: game,
        type: type === 'duo' ? 'Duo' : type === 'squad' ? 'Squad' : 'Team',
        description: description,
        author: appState.currentUser?.username || 'Kullanıcı',
        rank: appState.currentUser?.rank || 'Bronz',
        createdAt: 'Az önce',
        members: 1,
        maxMembers: type === 'duo' ? 2 : type === 'squad' ? 4 : 5
    };

    lobbies.unshift(newLobby);
    renderLobbies();
    closeModal('createLobbyModal');
    form.reset();
    alert('İlanınız yayınlandı!');
}

// Create Post
function createPost(event) {
    event.preventDefault();
    const form = event.target;
    const title = form.querySelector('input[type="text"]').value;
    const content = form.querySelector('textarea').value;
    const category = form.querySelector('select').value;

    const newPost = {
        id: forumPosts.length + 1,
        title: title,
        content: content,
        author: appState.currentUser?.username || 'Kullanıcı',
        votes: 0,
        comments: 0,
        category: category || 'general',
        createdAt: 'Az önce'
    };

    forumPosts.unshift(newPost);
    renderForumPosts();
    closeModal('createPostModal');
    form.reset();
    alert('Sorunuz yayınlandı!');
}
