import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if session token exists
    const sessionToken = sessionStorage.getItem('shipnow_session');
    if (sessionToken) {
      setIsAuthenticated(true);
      setUser({
        name: "John Doe",
        email: "john.doe@shipnow.com",
        role: "Admin"
      });
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // Simulate login verification
    // Write token to sessionStorage
    sessionStorage.setItem('shipnow_session', 'simulated_token_123');
    setIsAuthenticated(true);
    setUser({
      name: "John Doe",
      email: email,
      role: "Admin"
    });
    return true;
  };

  const logout = () => {
    sessionStorage.removeItem('shipnow_session');
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
