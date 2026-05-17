import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Restaurar token y usuario al montar
  useEffect(() => {
    const savedToken = localStorage.getItem('authToken');
    const savedUser = localStorage.getItem('user');

    if (savedToken) {
      setToken(savedToken);
    }
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error('Error parsing saved user:', e);
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authAPI.login(email, password);

      const authToken = response.data.authToken || response.data.token;
      const userData = response.data.user || response.data;

      // Guardar en localStorage
      localStorage.setItem('authToken', authToken);
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('userType', userData.type || 'luchador');
      localStorage.setItem('userId', userData.id);
      localStorage.setItem('authenticated', 'true');

      // Actualizar estado
      setToken(authToken);
      setUser(userData);

      return { success: true, data: response.data };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const signup = async (name, email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authAPI.signup(name, email, password);

      const authToken = response.data.authToken || response.data.token;
      const userData = response.data.user || response.data;

      // Guardar en localStorage
      localStorage.setItem('authToken', authToken);
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('userType', userData.type || 'luchador');
      localStorage.setItem('userId', userData.id);
      localStorage.setItem('authenticated', 'true');

      // Actualizar estado
      setToken(authToken);
      setUser(userData);

      return { success: true, data: response.data };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await authAPI.logout();
    } catch (err) {
      console.error('Error during logout:', err);
    } finally {
      // Limpiar localStorage
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      localStorage.removeItem('authenticated');
      localStorage.removeItem('userType');
      localStorage.removeItem('userId');

      // Limpiar estado
      setToken(null);
      setUser(null);
      setError(null);
      setLoading(false);
    }
  };

  const isAuthenticated = !!token && !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        error,
        isAuthenticated,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de AuthProvider');
  }
  return context;
};

export default AuthContext;
