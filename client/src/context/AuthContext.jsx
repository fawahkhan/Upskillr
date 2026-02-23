import { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../api/apiClient';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing user on mount
    const currentUser = authAPI.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
    setLoading(false);
  }, []);

  const signin = async (credentials) => {
    const data = await authAPI.signin(credentials);
    setUser(data.user);
    return data;
  };

  const signup = async (userData) => {
    const data = await authAPI.signup(userData);
    setUser(data.user);
    return data;
  };

  const logout = () => {
    authAPI.logout();
    setUser(null);
  };

  const value = {
    user,
    loading,
    signin,
    signup,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
