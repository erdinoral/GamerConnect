// Database Service - Ready for Supabase or Firebase integration

// Supabase Configuration (Uncomment when ready)
/*
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);
*/

// Firebase Configuration (Uncomment when ready)
/*
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
*/

// Mock Database Service (Current implementation)
class DatabaseService {
  constructor() {
    this.lobbies = new Map();
    this.messages = new Map();
    this.participants = new Map();
  }

  // Lobby Methods
  async getLobby(lobbyId) {
    // Mock: Return from local data
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: lobbyId,
          // Add lobby data here
        });
      }, 100);
    });
  }

  async joinLobby(lobbyId, userId, userData) {
    // Mock: Add user to lobby
    if (!this.participants.has(lobbyId)) {
      this.participants.set(lobbyId, []);
    }
    const participants = this.participants.get(lobbyId);
    if (!participants.find(p => p.id === userId)) {
      participants.push(userData);
      this.participants.set(lobbyId, participants);
    }
    return { success: true };
  }

  async leaveLobby(lobbyId, userId) {
    // Mock: Remove user from lobby
    if (this.participants.has(lobbyId)) {
      const participants = this.participants.get(lobbyId);
      const filtered = participants.filter(p => p.id !== userId);
      this.participants.set(lobbyId, filtered);
    }
    return { success: true };
  }

  // Message Methods
  async sendMessage(lobbyId, message) {
    // Mock: Add message
    if (!this.messages.has(lobbyId)) {
      this.messages.set(lobbyId, []);
    }
    const messages = this.messages.get(lobbyId);
    messages.push({
      ...message,
      id: Date.now(),
      timestamp: new Date().toISOString()
    });
    this.messages.set(lobbyId, messages);
    return { success: true, message: messages[messages.length - 1] };
  }

  async getMessages(lobbyId) {
    // Mock: Get messages
    return this.messages.get(lobbyId) || [];
  }

  // Real-time subscription (for Supabase/Firebase)
  subscribeToLobby(lobbyId, callback) {
    // Mock: Simulate real-time updates
    const interval = setInterval(() => {
      const messages = this.messages.get(lobbyId) || [];
      const participants = this.participants.get(lobbyId) || [];
      callback({ messages, participants });
    }, 1000);

    return () => clearInterval(interval);
  }

  // Supabase Implementation Example
  /*
  async sendMessageSupabase(lobbyId, message) {
    const { data, error } = await supabase
      .from('lobby_messages')
      .insert([
        {
          lobby_id: lobbyId,
          user_id: message.userId,
          username: message.username,
          text: message.text,
          type: message.type || 'user'
        }
      ])
      .select();

    if (error) throw error;
    return data[0];
  }

  subscribeToMessagesSupabase(lobbyId, callback) {
    return supabase
      .channel(`lobby:${lobbyId}`)
      .on('postgres_changes', 
        { 
          event: 'INSERT', 
          schema: 'public', 
          table: 'lobby_messages',
          filter: `lobby_id=eq.${lobbyId}`
        }, 
        (payload) => {
          callback(payload.new);
        }
      )
      .subscribe();
  }
  */

  // Firebase Implementation Example
  /*
  async sendMessageFirebase(lobbyId, message) {
    const messagesRef = collection(db, 'lobbies', lobbyId, 'messages');
    const docRef = await addDoc(messagesRef, {
      userId: message.userId,
      username: message.username,
      text: message.text,
      type: message.type || 'user',
      timestamp: serverTimestamp()
    });
    return docRef.id;
  }

  subscribeToMessagesFirebase(lobbyId, callback) {
    const messagesRef = collection(db, 'lobbies', lobbyId, 'messages');
    return onSnapshot(
      query(messagesRef, orderBy('timestamp', 'asc')),
      (snapshot) => {
        const messages = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        callback(messages);
      }
    );
  }
  */
}

export const db = new DatabaseService();
export default db;
