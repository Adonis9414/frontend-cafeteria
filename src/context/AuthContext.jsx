// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from 'react';
import axios from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    try {
      const res = await axios.get('/auth/me');
      setUser(res.data);
    } catch {
      setUser(null);
    }
  };

  const login = async (credentials) => {
    const res = await axios.post('/auth/login', credentials);
    setUser(res.data.user);
  };


  const logout = async () => {
    await axios.post('/auth/logout');
    setUser(null);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
