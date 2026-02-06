import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check localStorage for saved user
    const savedUser = localStorage.getItem('gamerHub_user');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      // Initialize GP if not exists
      if (!userData.gp) {
        userData.gp = 1000; // Welcome bonus
      }
      setUser(userData);
      setIsLoggedIn(true);
      localStorage.setItem('gamerHub_user', JSON.stringify(userData));
    }
  }, []);

  const login = (userData) => {
    // Initialize GP if new user
    if (!userData.gp) {
      userData.gp = 1000; // Welcome bonus
    }
    setUser(userData);
    setIsLoggedIn(true);
    localStorage.setItem('gamerHub_user', JSON.stringify(userData));
  };

  const updateGP = (amount) => {
    if (user) {
      const updatedUser = { ...user, gp: Math.max(0, user.gp + amount) };
      setUser(updatedUser);
      localStorage.setItem('gamerHub_user', JSON.stringify(updatedUser));
    }
  };

  const purchaseItem = (itemId, cost) => {
    if (user) {
      if (user.email === 'erdinoral31@gmail.com') {
        // Admin gets free items
        return true;
      }
      if (user.gp >= cost) {
        updateGP(-cost);
        return true;
      }
      return false;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('gamerHub_user');
  };

  const value = {
    user,
    isLoggedIn,
    login,
    logout,
    updateGP,
    purchaseItem
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
