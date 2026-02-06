// Lobby Detail Data
let lobbyData = {
    id: 1,
    game: 'Valorant',
    type: 'Duo',
    description: 'Diamond rank, takım oyunu odaklı oyuncu arıyorum. Ranked oynayacağız.',
    members: [
        { id: 1, username: 'ProGamer123', rank: 'Diamond', trustScore: 95, isOnline: true },
        { id: 2, username: 'Player2', rank: 'Platinum', trustScore: 88, isOnline: true }
    ],
    messages: [
        { id: 1, author: 'ProGamer123', message: 'Merhaba! Hangi haritada oynayalım?', timestamp: '10:30' },
        { id: 2, author: 'Player2', message: 'Bind veya Haven olabilir', timestamp: '10:31' }
    ]
};

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const lobbyId = urlParams.get('id');
    
    if (lobbyId) {
        loadLobbyData(lobbyId);
    }
    
    renderMembers();
    renderMessages();
    setupVoiceToggle();
});

// Load Lobby Data
function loadLobbyData(id) {
    // In real app, fetch from API
    document.getElementById('lobbyTitle').textContent = `${lobbyData.game} ${lobbyData.type} Lobi`;
    document.getElementById('lobbyDescription').textContent = lobbyData.description;
}

// Render Members
function renderMembers() {
    const membersList = document.getElementById('membersList');
    if (!membersList) return;

    membersList.innerHTML = lobbyData.members.map(member => `
        <div class="member-item">
            <div class="member-avatar">
                <i class="fas fa-user-circle"></i>
                <span class="online-indicator ${member.isOnline ? 'online' : 'offline'}"></span>
            </div>
            <div class="member-info">
                <h4>${member.username}</h4>
                <div class="member-stats">
                    <span class="rank-badge">${member.rank}</span>
                    <span class="trust-score">Güven: ${member.trustScore}</span>
                </div>
            </div>
        </div>
    `).join('');
}

// Render Messages
function renderMessages() {
    const chatMessages = document.getElementById('chatMessages');
    if (!chatMessages) return;

    chatMessages.innerHTML = lobbyData.messages.map(msg => `
        <div class="chat-message">
            <div class="message-author">${msg.author}</div>
            <div class="message-content">${msg.message}</div>
            <div class="message-time">${msg.timestamp}</div>
        </div>
    `).join('');

    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Send Message
function sendMessage() {
    if (!appState.isLoggedIn) {
        showLoginRequired();
        return;
    }

    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    
    if (!message) return;

    const newMessage = {
        id: lobbyData.messages.length + 1,
        author: appState.currentUser?.username || 'Kullanıcı',
        message: message,
        timestamp: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })
    };

    lobbyData.messages.push(newMessage);
    renderMessages();
    input.value = '';
}

// Handle Chat Key Press
function handleChatKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

// Setup Voice Toggle
function setupVoiceToggle() {
    const voiceToggle = document.getElementById('voiceToggle');
    const voicePanel = document.getElementById('voicePanel');
    
    if (voiceToggle) {
        voiceToggle.addEventListener('click', function() {
            if (!appState.isLoggedIn) {
                showLoginRequired();
                return;
            }
            
            if (voicePanel.style.display === 'none') {
                voicePanel.style.display = 'block';
                this.innerHTML = '<i class="fas fa-microphone-slash"></i> Sesli Sohbeti Kapat';
                initializeVoiceChat();
            } else {
                voicePanel.style.display = 'none';
                this.innerHTML = '<i class="fas fa-microphone"></i> Sesli Sohbet';
            }
        });
    }

    // Mic toggle
    const micBtn = document.getElementById('micBtn');
    if (micBtn) {
        micBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            const icon = this.querySelector('i');
            if (this.classList.contains('active')) {
                icon.className = 'fas fa-microphone';
                this.innerHTML = '<i class="fas fa-microphone"></i> Mikrofon Açık';
            } else {
                icon.className = 'fas fa-microphone-slash';
                this.innerHTML = '<i class="fas fa-microphone-slash"></i> Mikrofon Kapalı';
            }
        });
    }

    // Speaker toggle
    const speakerBtn = document.getElementById('speakerBtn');
    if (speakerBtn) {
        speakerBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            const icon = this.querySelector('i');
            if (this.classList.contains('active')) {
                icon.className = 'fas fa-volume-up';
                this.innerHTML = '<i class="fas fa-volume-up"></i> Hoparlör Açık';
            } else {
                icon.className = 'fas fa-volume-mute';
                this.innerHTML = '<i class="fas fa-volume-mute"></i> Hoparlör Kapalı';
            }
        });
    }
}

// Initialize Voice Chat
function initializeVoiceChat() {
    const voiceParticipants = document.getElementById('voiceParticipants');
    if (!voiceParticipants) return;

    voiceParticipants.innerHTML = lobbyData.members.map(member => `
        <div class="voice-participant">
            <div class="voice-avatar">
                <i class="fas fa-user-circle"></i>
                <span class="voice-indicator"></span>
            </div>
            <div class="voice-info">
                <h4>${member.username}</h4>
                <span class="voice-status">Konuşuyor...</span>
            </div>
        </div>
    `).join('');

    // Simulate voice activity
    setInterval(() => {
        const indicators = document.querySelectorAll('.voice-indicator');
        indicators.forEach(indicator => {
            indicator.style.animation = 'pulse 1s ease-in-out infinite';
        });
    }, 1000);
}
