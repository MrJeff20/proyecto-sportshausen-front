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
    const savedUserType = localStorage.getItem('userType');

    if (savedToken) {
      setToken(savedToken);
    }
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        // Asegurar que el user tenga el role
        if (!parsedUser.role && savedUserType) {
          parsedUser.role = savedUserType;
        }
        setUser(parsedUser);
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
      let userData = response.data.user || response.data;

      // Log para debuggear
      console.log('🔐 LOGIN RESPONSE DATA:', JSON.stringify(response.data, null, 2));
      console.log('👤 USER DATA:', JSON.stringify(userData, null, 2));

      // Asegurar que userData tenga el role - probar múltiples campos posibles
      let userRole = userData.role || userData.tipo_usuario || userData.type || 'luchador';
      
      // Normalizar nombres de roles por si vienen diferente
      if (userRole === 'booker') userRole = 'booker';
      else if (userRole === 'agrupacion' || userRole === 'agrupación') userRole = 'agrupacion';
      else if (userRole === 'luchador') userRole = 'luchador';
      else userRole = 'luchador'; // default

      // Asegurar que userData tenga el role normalizado
      userData.role = userRole;

      console.log('✅ LOGIN PROCESSED - Role:', userRole);

      // Guardar en localStorage
      localStorage.setItem('authToken', authToken);
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('userType', userRole);
      localStorage.setItem('userId', userData.id || userData.user_id);
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

  const signup = async (name, email, password, role = 'luchador') => {
    setLoading(true);
    setError(null);
    try {
      const response = await authAPI.signup(name, email, password, role);

      const authToken = response.data.authToken || response.data.token;
      let userData = response.data.user || response.data;

      // Log para debuggear
      console.log('📝 SIGNUP RESPONSE DATA:', JSON.stringify(response.data, null, 2));
      console.log('👤 USER DATA:', JSON.stringify(userData, null, 2));

      // Asegurar que userData tenga el role - probar múltiples campos posibles
      let userRole = userData.role || userData.tipo_usuario || userData.type || role || 'luchador';
      
      // Normalizar nombres de roles
      if (userRole === 'booker') userRole = 'booker';
      else if (userRole === 'agrupacion' || userRole === 'agrupación') userRole = 'agrupacion';
      else if (userRole === 'luchador') userRole = 'luchador';
      else userRole = 'luchador'; // default

      // Asegurar que userData tenga el role normalizado
      userData.role = userRole;

      console.log('✅ SIGNUP PROCESSED - Role:', userRole);

      // Guardar en localStorage
      localStorage.setItem('authToken', authToken);
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('userType', userRole);
      localStorage.setItem('userId', userData.id || userData.user_id);
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
